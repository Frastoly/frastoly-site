// Global değişkenler
let terminal;
let game;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    terminal = new Terminal();
    window.terminal = terminal; // Terminal nesnesini global scope'a ekle
    game = new Game(terminal);
    terminal.game = game;
});

class Game {
    constructor(terminalInstance) {
        this.player = {
            level: 1,
            xp: 0,
            money: 1000,
            reputation: 0,
            skills: {
                hacking: 1,
                networking: 1,
                cryptography: 1,
                socialEngineering: 1
            },
            tools: [],
            completedSteps: [],
            currentMission: null,
            decisionHistory: [],
            worldState: {
                globalChaosLevel: 0,
                corporateTrust: 50,
                cyberThreatLevel: 1
            }
        };

        this.missions = new Missions();
        this.terminal = terminalInstance;
        this.system = {
            security: 1,
            stealth: 1,
            speed: 1
        };
        
        // İlk görevi başlat
        this.startMission('ghost_protocol_intro');
    }

    startMission(missionId) {
        const mission = this.missions.getMission(missionId);
        if (!mission) return;

        // Eğer aynı görev zaten aktifse, tekrar başlatma
        if (this.player.currentMission && this.player.currentMission.id === missionId) {
            return;
        }

        this.player.currentMission = mission;
        this.player.completedSteps = [];
        
        // Görev başlangıç mesajını göster
        this.terminal.write('\n🎯 Yeni Görev Başladı!', 'success');
        this.terminal.write('-------------------', 'info');
        this.terminal.write(`Görev: ${mission.title}`, 'info');
        this.terminal.write(mission.description, 'info');
        this.terminal.write(`\nHedef: ${mission.target}`, 'info');
        this.terminal.write(`Açıklama: ${mission.targetDescription}`, 'info');
        
        // Briefing mesajını göster
        if (mission.briefing) {
            this.terminal.write('\n📋 Görev Brifingi:', 'info');
            this.terminal.write(mission.briefing, 'info');
        }
        
        this.terminal.write('\nGörev Adımları:', 'info');
        mission.steps.forEach(step => {
            this.terminal.write(`[ ] ${step}`, 'info');
        });
    }

    completeMission(missionId) {
        const mission = this.missions.getMission(missionId);
        if (!mission) return;

        // Eğer görev zaten tamamlandıysa, tekrar tamamlama
        if (!this.player.currentMission || this.player.currentMission.id !== missionId) {
            return;
        }

        // Ödülleri ver
        if (mission.reward) {
            this.player.xp += mission.reward.xp || 0;
            this.player.money += mission.reward.money || 0;
            this.player.reputation += mission.reward.reputation || 0;
        } else {
            // Alternatif ödül anahtarları
            this.player.xp += mission.experience || 0;
            if (mission.skillRewards) {
                Object.entries(mission.skillRewards).forEach(([skill, value]) => {
                    if (this.player.skills[skill] !== undefined) {
                        this.player.skills[skill] += value;
                    }
                });
            }
        }

        // Tamamlanma mesajını göster
        this.terminal.write('\n🎉 Görev Tamamlandı!', 'success');
        this.terminal.write('-------------------', 'info');
        this.terminal.write(`Görev: ${mission.title}`, 'info');
        this.terminal.write(`Kazanılan XP: ${mission.reward ? mission.reward.xp : mission.experience || 0}`, 'info');
        this.terminal.write(`Kazanılan Para: $${mission.reward ? mission.reward.money : 0}`, 'info');
        this.terminal.write(`Kazanılan İtibar: ${mission.reward ? mission.reward.reputation : 0}`, 'info');

        // Debriefing mesajını göster
        if (mission.debriefing) {
            this.terminal.write('\n📋 Görev Değerlendirmesi:', 'info');
            this.terminal.write(mission.debriefing, 'info');
        }

        // Görevi tamamlandı olarak işaretle
        this.player.currentMission = null;

        // Bir sonraki görevi başlat
        const nextMission = this.missions.getNextMission(missionId);
        if (nextMission) {
            this.terminal.write('\nSistem yükseltme seçeneklerini görmek için: system', 'info');
            setTimeout(() => this.startMission(nextMission.id), 3000);
        }
    }

    checkStep(step) {
        if (!this.player.currentMission) return false;

        const mission = this.player.currentMission;
        const normalize = str => str
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/â/g, 'a')
            .replace(/[^a-z0-9 ]/g, '');

        const stepMatch = mission.steps.find(s => {
            const trimmedStep = normalize(step.trim());
            const stepFirstWord = normalize(s.trim().split(' ')[0]);
            return stepFirstWord === trimmedStep && !this.player.completedSteps.includes(s);
        });

        if (stepMatch) {
            this.player.completedSteps.push(stepMatch);
            this.terminal.write(`\n✅ Adım tamamlandı: ${stepMatch}`, 'success');
            if (this.missions.isMissionComplete(mission.id, this.player.completedSteps)) {
                this.completeMission(mission.id);
            } else {
                this.terminal.write(`\nİlerleme: ${this.player.completedSteps.length}/${mission.steps.length}`, 'info');
            }
            return true;
        }
        return false;
    }

    updatePlayerInfo() {
        // Oyuncu seviyesi ve deneyim
        document.getElementById('player-level').textContent = this.player.level;
        document.getElementById('player-xp').textContent = this.player.xp;

        // Para
        let moneyElem = document.getElementById('player-money');
        if (!moneyElem) {
            const infoDiv = document.getElementById('player-info');
            moneyElem = document.createElement('p');
            moneyElem.innerHTML = 'Para: <span id="player-money">0</span>';
            infoDiv.appendChild(moneyElem);
        }
        document.getElementById('player-money').textContent = this.player.money;

        // Yetenekler
        document.getElementById('hacking-skill').textContent = this.player.skills.hacking;
        document.getElementById('networking-skill').textContent = this.player.skills.networking;
        document.getElementById('cryptography-skill').textContent = this.player.skills.cryptography;
    }

    buyTool(toolName, cost) {
        if (this.player.money >= cost) {
            this.player.money -= cost;
            this.player.tools.push(toolName);
            this.updatePlayerInfo();
            return true;
        }
        return false;
    }

    getAvailableTools() {
        return [
            { name: 'Gelişmiş Port Tarayıcı', cost: 1000, description: 'Daha hızlı ve detaylı port taraması yapar' },
            { name: 'Güçlü Parola Kırıcı', cost: 2000, description: 'Brute-force saldırılarını hızlandırır' },
            { name: 'Gelişmiş İz Gizleme', cost: 3000, description: 'İzlerini daha iyi gizler' },
            { name: 'Sosyal Mühendislik Paketi', cost: 4000, description: 'Sosyal mühendislik başarı şansını artırır' }
        ];
    }

    getDirtyJobs() {
        return [
            {
                name: "Rakip şirketten veri sızdırma",
                description: "Hassas verileri çal ve sat",
                cost: 500,
                reward: 3000,
                reputationPenalty: 5,
                risk: 'high',
                requiredSkills: { hacking: 2, networking: 1 }
            },
            {
                name: "Sahte sosyal medya kampanyası",
                description: "Hedef şirketin itibarını zedele",
                cost: 300,
                reward: 1500,
                reputationPenalty: 3,
                risk: 'medium',
                requiredSkills: { socialEngineering: 2 }
            },
            {
                name: "Kripto para manipülasyonu",
                description: "Piyasayı manipüle et ve kâr et",
                cost: 1000,
                reward: 5000,
                reputationPenalty: 8,
                risk: 'high',
                requiredSkills: { cryptography: 3 }
            }
        ];
    }

    performDirtyJob(jobId) {
        const job = this.getDirtyJobs().find(j => j.name === jobId);
        if (!job) {
            this.terminal.write('❌ Geçersiz iş!', 'error');
            return false;
        }

        // Yetenek kontrolü
        const hasRequiredSkills = Object.entries(job.requiredSkills).every(
            ([skill, level]) => this.player.skills[skill] >= level
        );

        if (!hasRequiredSkills) {
            this.terminal.write('❌ Bu iş için yeterli yeteneğin yok!', 'error');
            return false;
        }

        // Para kontrolü
        if (this.player.money < job.cost) {
            this.terminal.write('❌ Yeterli paran yok!', 'error');
            return false;
        }

        // İşi gerçekleştir
        this.player.money -= job.cost;
        this.player.money += job.reward;
        this.player.reputation -= job.reputationPenalty;
        this.player.worldState.globalChaosLevel += job.risk === 'high' ? 5 : 2;

        // Sonuçları göster
        this.terminal.write(`\n💰 Kirli iş tamamlandı!`, 'warning');
        this.terminal.write(`Kazanılan para: $${job.reward}`, 'success');
        this.terminal.write(`İtibar kaybı: ${job.reputationPenalty}`, 'error');
        this.terminal.write(`Dünya kaos seviyesi: +${job.risk === 'high' ? 5 : 2}`, 'warning');

        // Karar geçmişine ekle
        this.player.decisionHistory.push({
            type: 'dirty_job',
            job: job.name,
            outcome: {
                money: job.reward,
                reputation: -job.reputationPenalty,
                risk: job.risk
            },
            timestamp: new Date().toISOString()
        });

        this.updatePlayerInfo();
        return true;
    }

    makeDecision(decisionData) {
        const { description, options } = decisionData;
        
        // Karar menüsünü göster
        this.terminal.write('\n🤔 Karar Zamanı!', 'info');
        this.terminal.write('-------------------', 'info');
        this.terminal.write(description, 'info');
        this.terminal.write('\nSeçenekler:', 'info');
        
        options.forEach((option, index) => {
            this.terminal.write(`${index + 1}. ${option.text}`, 'info');
        });

        // Kararı kaydet
        this.player.decisionHistory.push({
            description,
            timestamp: new Date().toISOString(),
            pending: true
        });

        // Kararın sonuçlarını uygula
        return new Promise((resolve) => {
            const handleDecision = (choice) => {
                const selectedOption = options[choice - 1];
                if (selectedOption) {
                    this.applyDecisionConsequences(selectedOption);
                    this.player.decisionHistory[this.player.decisionHistory.length - 1].outcome = selectedOption;
                    this.player.decisionHistory[this.player.decisionHistory.length - 1].pending = false;
                    resolve(selectedOption);
                }
            };

            // Karar seçimini dinle
            this.terminal.onDecisionSelect(handleDecision);
        });
    }

    applyDecisionConsequences(option) {
        const { consequences } = option;
        
        // Para değişimi
        if (consequences.money) {
            this.player.money += consequences.money;
            this.terminal.write(`💰 Para: ${consequences.money > 0 ? '+' : ''}${consequences.money}`, 
                consequences.money > 0 ? 'success' : 'error');
        }

        // İtibar değişimi
        if (consequences.reputation) {
            this.player.reputation += consequences.reputation;
            this.terminal.write(`🌟 İtibar: ${consequences.reputation > 0 ? '+' : ''}${consequences.reputation}`,
                consequences.reputation > 0 ? 'success' : 'error');
        }

        // Risk durumu
        if (consequences.risk === 'high') {
            this.player.worldState.globalChaosLevel += 5;
            this.terminal.write('⚠️ Yüksek riskli karar! Dünya kaos seviyesi arttı.', 'warning');
        }

        this.updatePlayerInfo();
    }

    checkGameEnding() {
        const { reputation, worldState } = this.player;
        
        if (reputation > 50 && worldState.globalChaosLevel < 10) {
            return {
                type: 'good',
                message: 'İyi Son: Dünyayı kurtardın ve Ghost Protocol efsanesi oldun!'
            };
        } else if (reputation > 20) {
            return {
                type: 'neutral',
                message: 'Nötr Son: Dünya belirsizlik içinde, ancak hayatta kalmayı başardın.'
            };
        } else {
            return {
                type: 'bad',
                message: 'Kötü Son: Kaos yarattın ve sonunda Ghost Protocol seni dışladı!'
            };
        }
    }
} 