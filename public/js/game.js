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
            },
            // Yeni Hikaye Metrikleri
            metrics: {
                intel_score: 0,
                public_trust: 0,
                exposure_risk: 0,
                timing_pressure: 0
            },
            // Bayrak Sistemi (Oyun içi anahtarlar)
            flags: [],
            // Karar Geçmişi (D0-D4)
            storyDecisions: []
        };

        this.missions = new Missions();
        this.terminal = terminalInstance;
        this.system = {
            security: 1,
            stealth: 1,
            speed: 1
        };
        
        // İlk bölümü başlat
        this.startMission('chapter_1');
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
        this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        this.terminal.write('🎯 YENİ BÖLÜM BAŞLADI!', 'success');
        this.terminal.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        this.terminal.write(`\n${mission.title}`, 'mission');
        
        // Hikaye metnini göster
        if (mission.story) {
            this.terminal.write(`\n📖 Hikaye:`, 'info');
            this.terminal.write(mission.story, 'info');
        }
        
        // Briefing mesajını göster
        if (mission.briefing) {
            this.terminal.write('\n📋 Görev Brifingi:', 'warning');
            this.terminal.write(mission.briefing, 'info');
        }
        
        this.terminal.write(`\n🎯 Hedef: ${mission.target}`, 'info');
        this.terminal.write(`📄 Açıklama: ${mission.targetDescription}`, 'info');
        
        this.terminal.write('\n✅ Görev Adımları:', 'info');
        mission.steps.forEach((step, index) => {
            this.terminal.write(`  ${index + 1}. [ ] ${step}`, 'info');
        });
        
        this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'info');
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
        }

        // Tamamlanma mesajını göster
        this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        this.terminal.write('🎉 BÖLÜM TAMAMLANDI!', 'success');
        this.terminal.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        this.terminal.write(`\n${mission.title}`, 'mission');
        this.terminal.write(`\n💫 Kazanılan XP: ${mission.reward ? mission.reward.xp : 0}`, 'success');
        this.terminal.write(`💰 Kazanılan Para: $${mission.reward ? mission.reward.money : 0}`, 'success');
        this.terminal.write(`⭐ Kazanılan İtibar: ${mission.reward ? mission.reward.reputation : 0}`, 'success');

        // Debriefing mesajını göster
        if (mission.debriefing) {
            this.terminal.write('\n📋 Görev Değerlendirmesi:', 'warning');
            this.terminal.write(mission.debriefing, 'info');
        }

        // Mevcut metrikleri göster
        this.terminal.write('\n📊 Mevcut Metrikler:', 'info');
        this.terminal.write(`🧠 İstihbarat Skoru: ${this.player.metrics.intel_score}`, 'info');
        this.terminal.write(`🤝 Kamu Güveni: ${this.player.metrics.public_trust}`, 'info');
        this.terminal.write(`⚠️ İfşa Riski: ${this.player.metrics.exposure_risk}`, 'info');
        this.terminal.write(`⏱️ Zaman Baskısı: ${this.player.metrics.timing_pressure}`, 'info');

        // Görevi tamamlandı olarak işaretle
        this.player.currentMission = null;

        // Karar noktası varsa göster
        if (mission.hasDecision && mission.decisionId) {
            this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'warning');
            setTimeout(() => {
                this.showDecision(mission.decisionId);
            }, 2000);
        } else {
            // Final bölüm mü kontrol et
            if (mission.isFinal) {
                setTimeout(() => {
                    this.showEnding();
                }, 2000);
            } else {
                // Bir sonraki bölümü başlat
                const nextMission = this.missions.getNextMission(missionId);
                if (nextMission) {
                    setTimeout(() => this.startMission(nextMission.id), 3000);
                }
            }
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

    // Karar noktası gösterimi
    showDecision(decisionId) {
        const decision = this.missions.getDecision(decisionId);
        if (!decision) return;

        this.terminal.write('\n🤔 KARAR NOKTASI!', 'warning');
        this.terminal.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'warning');
        this.terminal.write(`\n${decision.title}`, 'mission');
        this.terminal.write(`\n${decision.description}\n`, 'info');

        decision.options.forEach((option, index) => {
            this.terminal.write(`\n${index + 1}. ${option.text}`, 'info');
            
            // Etkileri göster
            const effects = option.effects;
            if (effects) {
                const effectTexts = [];
                if (effects.intel_score) effectTexts.push(`🧠 İstihbarat: ${effects.intel_score > 0 ? '+' : ''}${effects.intel_score}`);
                if (effects.public_trust) effectTexts.push(`🤝 Güven: ${effects.public_trust > 0 ? '+' : ''}${effects.public_trust}`);
                if (effects.exposure_risk) effectTexts.push(`⚠️ Risk: ${effects.exposure_risk > 0 ? '+' : ''}${effects.exposure_risk}`);
                if (effects.timing_pressure) effectTexts.push(`⏱️ Baskı: ${effects.timing_pressure > 0 ? '+' : ''}${effects.timing_pressure}`);
                if (effects.money) effectTexts.push(`💰 Para: ${effects.money > 0 ? '+' : ''}${effects.money}`);
                
                if (effectTexts.length > 0) {
                    this.terminal.write(`   Etkiler: ${effectTexts.join(', ')}`, 'system');
                }
            }
        });

        this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'warning');
        this.terminal.write('\nSeçiminizi yapmak için "decide <numara>" yazın. Örnek: decide 1', 'prompt');
        
        // Karar bekleme modu aktif
        this.awaitingDecision = {
            decisionId: decisionId,
            decision: decision
        };
    }

    // Karar seçimi
    makeDecisionChoice(optionIndex) {
        if (!this.awaitingDecision) {
            this.terminal.write('❌ Bekleyen bir karar yok!', 'error');
            return;
        }

        const { decisionId, decision } = this.awaitingDecision;
        const option = decision.options[optionIndex - 1];
        
        if (!option) {
            this.terminal.write('❌ Geçersiz seçim!', 'error');
            return;
        }

        // Seçimi kaydet
        this.player.storyDecisions.push({
            decisionId: decisionId,
            selectedOption: option.id,
            timestamp: Date.now()
        });

        // Etkileri uygula
        if (option.effects) {
            const effects = option.effects;
            
            if (effects.intel_score) this.player.metrics.intel_score += effects.intel_score;
            if (effects.public_trust) this.player.metrics.public_trust += effects.public_trust;
            if (effects.exposure_risk) this.player.metrics.exposure_risk += effects.exposure_risk;
            if (effects.timing_pressure) this.player.metrics.timing_pressure += effects.timing_pressure;
            if (effects.money) this.player.money += effects.money;
            
            // Bayraklar ekle
            if (effects.flags && Array.isArray(effects.flags)) {
                effects.flags.forEach(flag => {
                    if (!this.player.flags.includes(flag)) {
                        this.player.flags.push(flag);
                    }
                });
            }
        }

        // Sonuç mesajını göster
        this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        this.terminal.write('✅ KARAR VERİLDİ!', 'success');
        this.terminal.write('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        this.terminal.write(`\nSeçiminiz: ${option.text}`, 'info');
        this.terminal.write(`\n${option.consequence}`, 'warning');

        // Güncel metrikleri göster
        this.terminal.write('\n📊 Güncel Metrikler:', 'info');
        this.terminal.write(`🧠 İstihbarat Skoru: ${this.player.metrics.intel_score}`, 'info');
        this.terminal.write(`🤝 Kamu Güveni: ${this.player.metrics.public_trust}`, 'info');
        this.terminal.write(`⚠️ İfşa Riski: ${this.player.metrics.exposure_risk}`, 'info');
        this.terminal.write(`⏱️ Zaman Baskısı: ${this.player.metrics.timing_pressure}`, 'info');
        
        if (this.player.flags.length > 0) {
            this.terminal.write(`\n🔑 Kazanılan Anahtarlar: ${this.player.flags.join(', ')}`, 'system');
        }

        // Karar modunu kapat
        this.awaitingDecision = null;

        // Bir sonraki bölümü başlat
        const nextMission = this.missions.getNextMission(this.player.currentMission?.id || `chapter_${decisionId.replace('D', '')}`);
        if (nextMission) {
            this.terminal.write('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'info');
            setTimeout(() => this.startMission(nextMission.id), 2000);
        }
    }

    // Final gösterimi
    showEnding() {
        const playerState = {
            intel_score: this.player.metrics.intel_score,
            public_trust: this.player.metrics.public_trust,
            exposure_risk: this.player.metrics.exposure_risk,
            timing_pressure: this.player.metrics.timing_pressure,
            flags: this.player.flags,
            decisionHistory: this.player.storyDecisions
        };

        const ending = this.missions.calculateEnding(playerState);

        // Final ekranı
        this.terminal.write('\n\n');
        this.terminal.write('═════════════════════════════════════════', 'mission');
        this.terminal.write('          🎬 GHOST PROTOCOL 🎬          ', 'mission');
        this.terminal.write('═════════════════════════════════════════', 'mission');
        this.terminal.write('\n', 'info');
        this.terminal.write(`📜 ${ending.title}`, 'warning');
        this.terminal.write('\n', 'info');
        this.terminal.write(ending.description, 'info');
        this.terminal.write('\n', 'info');
        this.terminal.write('─────────────────────────────────────────', 'info');
        this.terminal.write(`💭 ${ending.epilogue}`, 'system');
        this.terminal.write('─────────────────────────────────────────', 'info');

        // Oyuncu istatistikleri
        this.terminal.write('\n📊 FİNAL İSTATİSTİKLER:', 'warning');
        this.terminal.write(`🧠 İstihbarat Skoru: ${this.player.metrics.intel_score}`, 'info');
        this.terminal.write(`🤝 Kamu Güveni: ${this.player.metrics.public_trust}`, 'info');
        this.terminal.write(`⚠️ İfşa Riski: ${this.player.metrics.exposure_risk}`, 'info');
        this.terminal.write(`⏱️ Zaman Baskısı: ${this.player.metrics.timing_pressure}`, 'info');
        this.terminal.write(`💰 Toplam Para: $${this.player.money}`, 'info');
        this.terminal.write(`⭐ İtibar: ${this.player.reputation}`, 'info');

        // Kararlar
        this.terminal.write('\n🎯 VERDİĞİNİZ KARARLAR:', 'warning');
        this.player.storyDecisions.forEach((dec, index) => {
            this.terminal.write(`${index + 1}. ${dec.decisionId}: Seçenek ${dec.selectedOption}`, 'info');
        });

        this.terminal.write('\n═════════════════════════════════════════', 'mission');
        this.terminal.write('     Oyun Tamamlandı! Teşekkürler!     ', 'success');
        this.terminal.write('═════════════════════════════════════════', 'mission');
        this.terminal.write('\nYeni oyun başlatmak için sayfayı yenileyin.', 'prompt');
    }

    checkGameEnding() {
        // Eski sistem - artık kullanılmıyor, yeni sistem missions.calculateEnding kullanıyor
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