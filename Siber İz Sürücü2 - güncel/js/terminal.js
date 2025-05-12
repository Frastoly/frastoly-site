class Terminal {
    constructor(gameInstance = null) {
        this.output = document.getElementById('output');
        this.input = document.getElementById('command-input');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentMission = null;
        this.completedSteps = [];
        this.money = 1000; // Başlangıç parası artırıldı
        this.tools = [];
        this.reputation = 0;
        this.game = gameInstance;
        this.missionInfo = null;
        this.decisionCallback = null;
        this.isWaitingForDecision = false;
        
        // Sistem özellikleri - Başlangıç değerleri güncellendi
        this.system = {
            cpu: 2,      // nmap için yeterli başlangıç seviyesi
            ram: 1,      // 1-10 arası
            storage: 1,  // 1-10 arası
            network: 2,  // nmap için yeterli başlangıç seviyesi
            security: 2  // logs için yeterli başlangıç seviyesi
        };
        
        // Sistem yükseltme maliyetleri - Daha makul değerler
        this.upgradeCosts = {
            cpu: 300,
            ram: 250,
            storage: 200,
            network: 350,
            security: 400
        };
        
        // İzin verilen hedef siteler
        this.allowedTargets = {
            'frastoly.com': {
                requiredLevel: 1,
                description: 'Ghost Protocol ilk görev hedefi'
            },
            'shadow-network.io': {
                requiredLevel: 2,
                description: 'Gölge Ağı komuta kontrol sunucusu'
            },
            'deep-forum.onion': {
                requiredLevel: 3,
                description: 'Şüpheli hacker forumu'
            },
            'netshield.local': {
                requiredLevel: 4,
                description: 'NetShield şirketi iç ağı'
            }
        };
        
        // Hata sayacı ve ipucu sistemi
        this.errorCount = {};
        this.hints = {
            'nmap': 'Hedef sunucuyu taramak için: nmap [hedef]',
            'netstat': 'Açık portları görmek için: netstat',
            'logs': 'Sistem kayıtlarını temizlemek için: logs --clear',
            'encrypt': 'Metni şifrelemek için: encrypt "şifrelenecek metin"',
            'mailspoof': 'Sahte mail göndermek için: mailspoof --from adres --to hedef --subject konu',
            'bruteforce': 'Parola kırmak için: bruteforce --target hedef --user kullanıcı',
            'skills': 'Yeteneklerini görmek için: skills'
        };
        
        this.setupEventListeners();
        this.welcome();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (this.isWaitingForDecision) {
                this.handleDecisionInput(e);
            } else {
                this.handleCommandInput(e);
            }
        });
    }

    handleDecisionInput(e) {
        if (e.key === 'Enter') {
            const choice = parseInt(this.input.value);
            if (!isNaN(choice) && this.decisionCallback) {
                this.decisionCallback(choice);
                this.isWaitingForDecision = false;
                this.decisionCallback = null;
                this.input.value = '';
                this.write('> ', 'prompt');
            }
        }
    }

    handleCommandInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
            }
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    welcome() {
        const welcomeMessage = `
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║  ██████╗  ██████╗  ██████╗ ███████╗████████╗    ██████╗ ██████╗ ███████╗ ║
║  ██╔════╝ ██╔═══██╗██╔═══██╗██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗██╔════╝ ║
║  ██║  ███╗██║   ██║██║   ██║███████╗   ██║       ██████╔╝██████╔╝█████╗   ║
║  ██║   ██║██║   ██║██║   ██║╚════██║   ██║       ██╔═══╝ ██╔══██╗██╔══╝   ║
║  ╚██████╔╝╚██████╔╝╚██████╔╝███████║   ██║       ██║     ██║  ██║███████╗ ║
║   ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝╚══════╝ ║
║                                                                            ║
║  Ghost Protocol - Gizli Siber Operasyonlar Simülasyonu                     ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

Ghost Protocol'a hoş geldin, ajan. Biz gizli siber operasyonlar gerçekleştiren
elit bir ekibiz. Müşterilerimizden aldığımız görevleri başarıyla tamamlamak
için senin yeteneklerine ihtiyacımız var.

Başlamak için 'help' komutunu kullanabilirsin.
`;
        this.write(welcomeMessage);
    }

    write(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        
        // Mesaj türüne göre renk belirleme
        switch(type) {
            case 'error':
                line.style.color = '#ff5555'; // Kırmızı - Hata mesajları
                break;
            case 'success':
                line.style.color = '#50fa7b'; // Yeşil - Başarı mesajları
                break;
            case 'warning':
                line.style.color = '#ffb86c'; // Turuncu - Uyarı mesajları
                break;
            case 'info':
                line.style.color = '#8be9fd'; // Açık mavi - Bilgi mesajları
                break;
            case 'system':
                line.style.color = '#bd93f9'; // Mor - Sistem mesajları
                break;
            case 'command':
                line.style.color = '#f8f8f2'; // Beyaz - Komut çıktıları
                break;
            case 'mission':
                line.style.color = '#ff79c6'; // Pembe - Görev mesajları
                break;
            case 'prompt':
                line.style.color = '#ffb86c'; // Turuncu - Prompt mesajları
                break;
            default:
                line.style.color = '#f8f8f2'; // Varsayılan beyaz
        }
        
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    executeCommand(command) {
        if (!command.trim()) return;

        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        this.write(`> ${command}`, 'command');

        const [cmd, ...args] = command.toLowerCase().split(' ');

        // Hata sayacını güncelle
        if (this.game && this.game.player.currentMission) {
            const currentStep = this.game.player.currentMission.steps.find(step => 
                step.includes(cmd) && !this.game.player.completedSteps.includes(step)
            );
            
            if (currentStep) {
                this.errorCount[currentStep] = (this.errorCount[currentStep] || 0) + 1;
                
                // 3 hata sonrası ipucu göster
                if (this.errorCount[currentStep] >= 3) {
                    const hint = this.hints[cmd];
                    if (hint) {
                        this.write(`\n💡 İpucu: ${hint}`, 'info');
                        this.errorCount[currentStep] = 0; // Sayacı sıfırla
                    }
                }
            }
        }

        switch (cmd) {
            case 'help':
                this.help();
                break;
            case 'clear':
                this.clear();
                break;
            case 'allclear':
                this.allclear();
                break;
            case 'skills':
                this.showSkills();
                break;
            case 'missions':
                this.showMissions();
                break;
            case 'money':
                this.showMoney();
                break;
            case 'tools':
                this.showTools();
                break;
            case 'reputation':
                this.showReputation();
                break;
            case 'nmap':
                this.nmap(args);
                break;
            case 'netstat':
                this.netstat(args);
                break;
            case 'mailspoof':
                this.mailspoof(args);
                break;
            case 'bruteforce':
                this.bruteforce(args);
                break;
            case 'logs':
                this.logs(args);
                break;
            case 'encrypt':
                this.encrypt(args);
                break;
            case 'falsealarm':
                this.falsealarm(args);
                break;
            case 'bypass_firewall':
                this.bypassFirewall(args);
                break;
            case 'malware_scan':
                this.malwareScan(args);
                break;
            case 'multi_target':
                this.multiTarget(args);
                break;
            case 'zero_day':
                this.zeroDay(args);
                break;
            case 'social_attack':
                this.socialAttack(args);
                break;
            case 'crypto_track':
                this.cryptoTrack(args);
                break;
            case 'global_scan':
                this.globalScan(args);
                break;
            case 'final_operation':
                this.finalOperation(args);
                break;
            case 'upgrade':
                this.upgrade(args);
                break;
            case 'system':
                this.showSystem();
                break;
            case 'mask_ip':
                this.maskIp(args);
                break;
            case 'maskip':
                this.write('maskip komutu bulunamadı. Doğru komut: mask_ip', 'warning');
                break;
            case 'admin':
                this.adminCommand(args);
                break;
            case 'report':
                this.report(args);
                break;
            case 'listener':
                this.listener(args);
                break;
            case 'monitor':
                this.monitor(args);
                break;
            case 'analyze_rules':
                this.analyze_rules(args);
                break;
            case 'sandbox_run':
                this.sandbox_run(args);
                break;
            case 'coordinate':
                this.coordinate(args);
                break;
            case 'exploit':
                this.exploit(args);
                break;
            case 'brute_social':
                this.brute_social(args);
                break;
            case 'analyze_transaction':
                this.analyze_transaction(args);
                break;
            case 'cleanup':
                this.cleanup(args);
                break;
            default:
                this.write('Bilinmeyen komut. Yardım için "help" yazın.', 'error');
        }

        // Her komut sonrası görev ilerlemesini göster
        if (this.game && this.game.player.currentMission) {
            const mission = this.game.player.currentMission;
            const completed = this.game.player.completedSteps.length;
            const total = mission.steps.length;
            this.write(`\nİlerleme: ${completed}/${total}`, 'info');
        }
    }

    help() {
        const helpText = `
Kullanılabilir Komutlar:

Temel Komutlar:
  help              - Bu yardım mesajını gösterir
  clear             - Terminal ekranını temizler (görev bilgilerini korur)
  allclear          - Tüm terminal ekranını temizler
  skills            - Mevcut yeteneklerini gösterir
  missions          - Mevcut görevleri listeler
  money             - Mevcut paranı gösterir
  tools             - Sahip olduğun araçları listeler
  reputation        - Mevcut itibarını gösterir
  system            - Sistem özelliklerini gösterir

Operasyon Komutları:
  nmap              - Ağ taraması yapar
  netstat           - Açık portları listeler
  mailspoof         - Sahte e-posta gönderir
  bruteforce        - Parola kırma işlemi yapar
  logs              - Sistem kayıtlarını yönetir
  falsealarm        - Yanlış güvenlik uyarısı oluşturur
  bypass_firewall   - Güvenlik duvarını atlatır
  malware_scan      - Zararlı yazılım taraması yapar
  multi_target      - Çoklu hedef operasyonu başlatır
  zero_day          - Sıfır gün açığı taraması yapar
  social_attack     - Sosyal mühendislik saldırısı başlatır
  crypto_track      - Kripto para transferlerini takip eder
  global_scan       - Uluslararası hedef taraması yapar
  final_operation   - Final operasyonunu başlatır

Sistem Komutları:
  upgrade           - Sistem bileşenlerini yükseltir

Her komut için detaylı bilgi almak için: komut --help
`;
        this.write(helpText);
    }

    clear() {
        // Sadece komut çıktılarını temizle, görev bilgilerini koru
        const missionInfo = this.missionInfo;
        this.output.innerHTML = '';
        if (missionInfo) {
            this.write(missionInfo);
        }
    }

    allclear() {
        // Tüm terminal çıktısını temizle
        this.output.innerHTML = '';
        this.missionInfo = null;
    }

    showSkills() {
        if (this.game) {
            const skills = this.game.player.skills;
            const skillsText = `
Yeteneklerin:
----------------
Hacking: ${skills.hacking}
Networking: ${skills.networking}
Cryptography: ${skills.cryptography}
Sosyal Mühendislik: ${skills.socialEngineering}
`;
            this.write(skillsText);
            // Görev adımını tamamla
            if (this.game.player.currentMission && this.game.player.currentMission.title.includes("Ghost Protocol'a Giriş")) {
                this.game.checkStep('skills');
                this.showMissions(); // Görev bilgilerini güncelle
            }
        } else {
            this.write('Yetenek bilgisi bulunamadı.');
        }
    }

    showMissions() {
        if (this.game) {
            const mission = this.game.player.currentMission;
            if (mission) {
                const completedSteps = this.game.player.completedSteps || [];
                
                if (completedSteps.length === 4) {
                    this.write(`
🎉 Görev Tamamlandı!
-------------------
Görev: ${mission.title}
Kazanılan XP: ${mission.experience}
Kazanılan Para: $${this.calculateMissionReward(mission)}
Kazanılan İtibar: ${this.calculateReputationGain(mission)}

Sistem yükseltme seçeneklerini görmek için: system
                    `, 'success');
                    this.game.completeMission(mission.id);
                    return;
                }

                if (!this.missionInfo || this.lastCommand === 'missions') {
                    let missionsText = `\nAktif Görev:\n----------------\n${mission.title}\n${mission.description}\nZorluk: ${mission.difficulty}\nÖdül: ${mission.experience} XP\n\n`;
                    
                    if (mission.title.includes("Ghost Protocol'a Giriş")) {
                        missionsText += `
Görev Hikayesi:
----------------
Ghost Protocol'a yeni katılan bir ajan olarak, yeteneklerini göstermen gerekiyor.
İlk görevinde, temel siber güvenlik yeteneklerini test edeceğiz.

Hedef: frastoly.com
Açıklama: Şüpheli finansal işlemler tespit edilen bir şirket. Sistemlerini inceleyip
güvenlik açıklarını tespit etmemiz gerekiyor.

Görev Adımları:
1. [${completedSteps.includes('skills') ? '✓' : ' '}] Yeteneklerini kontrol et
2. [${completedSteps.includes('nmap') ? '✓' : ' '}] Ağ taraması yap (frastoly.com)
3. [${completedSteps.includes('netstat') ? '✓' : ' '}] Port durumlarını kontrol et
4. [${completedSteps.includes('logs') ? '✓' : ' '}] Sistem kayıtlarını temizle

Mevcut Para: $${this.money}

İlerleme: ${completedSteps.length}/4 adım tamamlandı

İpucu: Komutları öğrenmek için 'help' komutunu kullan!
`;
                    }
                    
                    this.missionInfo = missionsText;
                    this.write(missionsText, 'mission');
                } else {
                    this.write(`İlerleme: ${completedSteps.length}/4 adım tamamlandı`, 'info');
                }
            } else {
                this.write('Şu anda aktif bir görevin yok.', 'warning');
            }
        } else {
            this.write('Görev bilgisi bulunamadı.', 'error');
        }
    }

    showMoney() {
        if (this.game) {
            this.write(`Mevcut Para: $${this.game.player.money}`);
        } else {
            this.write('Para bilgisi bulunamadı.');
        }
    }

    showTools() {
        if (this.tools.length === 0) {
            this.write('Henüz hiç aracın yok. Görevleri tamamlayarak araçlar kazanabilirsin.');
        } else {
            const toolsText = this.tools.map(tool => `- ${tool}`).join('\n');
            this.write(`Sahip Olduğun Araçlar:\n${toolsText}`);
        }
    }

    showReputation() {
        this.write(`Mevcut İtibar: ${this.reputation} puan`);
    }

    showSystem() {
        this.write(`
Sistem Özellikleri:
------------------
CPU: ${this.system.cpu}/10
RAM: ${this.system.ram}/10
Depolama: ${this.system.storage}/10
Ağ: ${this.system.network}/10
Güvenlik: ${this.system.security}/10

Yükseltme Maliyetleri:
---------------------
CPU: $${this.upgradeCosts.cpu}
RAM: $${this.upgradeCosts.ram}
Depolama: $${this.upgradeCosts.storage}
Ağ: $${this.upgradeCosts.network}
Güvenlik: $${this.upgradeCosts.security}

Yükseltme yapmak için: upgrade [bileşen_adı]
        `, 'system');
    }

    // Operasyon Komutları
    nmap(args) {
        if (args.length === 0) {
            this.write('Hata: Hedef belirtilmedi. Örnek: nmap -sS -Pn hedef.com', 'error');
            return;
        }

        const target = args[args.length - 1];
        if (!this.allowedTargets[target]) {
            this.write(`Hata: ${target} hedefi için yetkiniz yok.`, 'error');
            return;
        }

        if (this.system.cpu < 2) {
            this.write('Hata: nmap komutu için en az CPU seviye 2 gerekiyor.', 'error');
            return;
        }

        if (this.system.network < 2) {
            this.write('Hata: nmap komutu için en az Ağ seviye 2 gerekiyor.', 'error');
            return;
        }
        
        this.write('Başlatılıyor SYN Taraması...');
        setTimeout(() => {
            this.write(`\nAçık portlar tespit edildi:\n- 22 (SSH) - Güvenlik duvarı korumalı\n- 80 (HTTP) - Web sunucusu aktif\n- 443 (HTTPS) - SSL sertifikası geçerli\n- 3306 (MySQL) - Veritabanı sunucusu\n\nGüvenlik Analizi:\n- Güvenlik duvarı: Aktif\n- IDS/IPS: Tespit edildi\n- SSL/TLS: Aktif\n- WAF: Tespit edilemedi\n            `, 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('nmap');
                this.showMissions();
            }
        }, 2000);
    }

    netstat(args) {
        if (this.system.cpu < 1) {
            this.write('Hata: netstat komutu için en az CPU seviye 1 gerekiyor.', 'error');
            return;
        }

        this.write(`\nPORT      SERVICE   STATUS      DETAY\n22        SSH       Açık        Güvenlik duvarı korumalı\n80        HTTP      Açık        Apache/2.4.41\n443       HTTPS     Açık        Nginx/1.18.0\n3306      MySQL     Açık        MySQL 8.0.26\n        `);
        if (this.game && this.game.player.currentMission) {
            this.game.checkStep('netstat');
            this.showMissions();
        }
    }

    mailspoof(args) {
        this.write('E-posta hazırlanıyor...', 'info');
        setTimeout(() => {
            this.write('SMTP sunucusuna bağlanılıyor...', 'info');
            setTimeout(() => {
                this.write('Kimlik doğrulama başarılı.', 'success');
                setTimeout(() => {
                    this.write('E-posta gönderiliyor...', 'info');
                    setTimeout(() => {
                        this.write('E-posta başarıyla gönderildi. 📧', 'success');
                        if (this.game && this.game.player.currentMission) {
                            this.game.checkStep('mailspoof');
                            this.showMissions();
                        }
                    }, 1000);
                }, 800);
            }, 800);
        }, 800);
    }

    bruteforce(args) {
        if (args.length < 2) {
            this.write('Hata: Hedef ve kullanıcı belirtilmedi.', 'error');
            return;
        }
        
        this.write('Parola kırma işlemi başlatılıyor...');
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            this.write(`Deneme ${attempts}: password${attempts} ❌`);
            
            if (attempts === 10) {
                clearInterval(interval);
                this.write('Parola başarıyla kırıldı: summer2025 ✅');
                if (this.game && this.game.player.currentMission) {
                    this.game.checkStep('bruteforce');
                    this.showMissions();
                }
            }
        }, 500);
    }

    logs(args) {
        this.write('Kayıtlar analiz ediliyor...', 'info');
        setTimeout(() => {
            this.write('Erişim kayıtları siliniyor...', 'warning');
            setTimeout(() => {
                this.write('Komut geçmişi temizleniyor...', 'warning');
                setTimeout(() => {
                    this.write('IP izleri kaldırılıyor...', 'warning');
                    setTimeout(() => {
                        this.write('Zaman damgaları düzenleniyor...', 'warning');
                        setTimeout(() => {
                            this.write('Tüm kayıtlar başarıyla temizlendi! 🧹', 'success');
                            if (this.game && this.game.player.currentMission) {
                                this.game.checkStep('logs');
                                this.showMissions();
                            }
                        }, 700);
                    }, 700);
                }, 700);
            }, 700);
        }, 700);
    }

    falsealarm(args) {
        if (args.length < 2) {
            this.write('Hata: Hedef ve uyarı mesajı belirtilmedi.', 'error');
            return;
        }
        
        this.write('Yanlış alarm oluşturuluyor...');
        setTimeout(() => {
            this.write('CyberCore yetkilileri, uyarının hatalı olduğuna inanıp güvenlik önlemini durdurdu.');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('falsealarm');
                this.showMissions();
            }
        }, 1500);
    }

    bypassFirewall(args) {
        this.write('Güvenlik duvarı kuralları analiz ediliyor...', 'info');
        setTimeout(() => {
            this.write('Kural 1: Geçiş izni yok.', 'error');
            setTimeout(() => {
                this.write('Kural 2: Zayıf nokta tespit edildi!', 'warning');
                setTimeout(() => {
                    this.write('Atlatma denemesi yapılıyor...', 'info');
                    setTimeout(() => {
                        this.write('Güvenlik duvarı başarıyla atlatıldı! 🛡️', 'success');
                        if (this.game && this.game.player.currentMission) {
                            this.game.checkStep('bypass_firewall');
                            this.showMissions();
                        }
                    }, 1200);
                }, 900);
            }, 900);
        }, 900);
    }

    malwareScan(args) {
        this.write('Dosya taraması başlatılıyor...', 'info');
        let percent = 0;
        const interval = setInterval(() => {
            percent += Math.floor(Math.random() * 20) + 10;
            if (percent >= 100) {
                percent = 100;
                clearInterval(interval);
                this.write('Tehdit tespiti: 1 şüpheli dosya bulundu!', 'warning');
                setTimeout(() => {
                    this.write('Analiz tamamlandı. Dosya güvenli ortama alındı. 🦠', 'success');
                    if (this.game && this.game.player.currentMission) {
                        this.game.checkStep('malware_scan');
                        this.showMissions();
                    }
                }, 1200);
            } else {
                this.write(`Taranıyor... %${percent}`, 'info');
            }
        }, 600);
    }

    multiTarget(args) {
        const targets = ['192.168.1.10', '192.168.1.20', '192.168.1.30'];
        let idx = 0;
        const scanNext = () => {
            if (idx < targets.length) {
                this.write(`Hedef taranıyor: ${targets[idx]}...`, 'info');
                setTimeout(() => {
                    this.write(`Açık portlar bulundu: 22, 80, 443`, 'success');
                    idx++;
                    scanNext();
                }, 900);
            } else {
                this.write('Tüm hedefler başarıyla tarandı! 🎯', 'success');
                if (this.game && this.game.player.currentMission) {
                    this.game.checkStep('multi_target');
                    this.showMissions();
                }
            }
        };
        scanNext();
    }

    zeroDay(args) {
        if (args.length === 0) {
            this.write('Hata: İşlem belirtilmedi.', 'error');
            return;
        }
        
        this.write('Sıfır gün açığı taraması başlatılıyor...');
        setTimeout(() => {
            this.write(`
Tarama Sonuçları:
----------------
Tespit Edilen Açıklar: 1
Risk Seviyesi: Kritik
Önerilen Aksiyon: Hemen Raporla
            `);
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('zero_day');
                this.showMissions();
            }
        }, 2000);
    }

    socialAttack(args) {
        if (args.length === 0) {
            this.write('Hata: Hedef belirtilmedi.', 'error');
            return;
        }
        
        this.write('Sosyal mühendislik saldırısı başlatılıyor...');
        setTimeout(() => {
            this.write(`
Saldırı Durumu:
----------------
Hedef: CEO
Yöntem: Profesyonel Ağ
Durum: Başarılı
Erişim: Tam Yetki
            `);
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('social_attack');
                this.showMissions();
            }
        }, 2000);
    }

    cryptoTrack(args) {
        if (args.length === 0) {
            this.write('Hata: Cüzdan adresi belirtilmedi.', 'error');
            return;
        }
        
        this.write('Kripto para transferleri takip ediliyor...');
        setTimeout(() => {
            this.write(`
Transfer Analizi:
----------------
Cüzdan: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
Son İşlemler: 5
Toplam Değer: 2.5 BTC
Şüpheli İşlem: Evet
            `);
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('crypto_track');
                this.showMissions();
            }
        }, 2000);
    }

    globalScan(args) {
        if (args.length === 0) {
            this.write('Hata: Hedefler belirtilmedi.', 'error');
            return;
        }
        
        this.write('Uluslararası hedef taraması başlatılıyor...');
        setTimeout(() => {
            this.write(`
Global Tarama Sonuçları:
----------------
Ülke: ABD
Hedefler: 3
Durum: Aktif

Ülke: Almanya
Hedefler: 2
Durum: Aktif

Ülke: Japonya
Hedefler: 1
Durum: Aktif
            `);
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('global_scan');
                this.showMissions();
            }
        }, 2000);
    }

    finalOperation(args) {
        if (args.length === 0) {
            this.write('Hata: İşlem belirtilmedi.', 'error');
            return;
        }
        
        this.write('Final operasyonu başlatılıyor...');
        setTimeout(() => {
            this.write(`
Ghost Protocol Final Operasyonu
-----------------------------
Durum: Başlatıldı
Tüm sistemler aktif
Tüm ekipler hazır
Operasyon başlıyor...

Operasyon başarıyla tamamlandı!
Ghost Protocol'un en değerli ajanı oldun!
            `);
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('final_operation');
                this.showMissions();
            }
        }, 3000);
    }

    upgrade(args) {
        if (args.length === 0) {
            this.write('Hata: Yükseltilecek bileşen belirtilmedi. Örnek: upgrade cpu', 'error');
            return;
        }

        const component = args[0].toLowerCase();
        if (!this.system.hasOwnProperty(component)) {
            this.write(`Hata: Geçersiz bileşen. Kullanılabilir bileşenler: ${Object.keys(this.system).join(', ')}`, 'error');
            return;
        }

        if (this.system[component] >= 10) {
            this.write(`Hata: ${component.toUpperCase()} zaten maksimum seviyede.`, 'error');
            return;
        }

        const cost = this.upgradeCosts[component];
        if (this.game.player.money < cost) {
            this.write(`Hata: Yeterli paran yok. Gerekli: $${cost}, Mevcut: $${this.game.player.money}`, 'error');
            return;
        }

        this.game.player.money -= cost;
        this.system[component]++;
        this.write(`
✅ ${component.toUpperCase()} başarıyla yükseltildi!
Yeni seviye: ${this.system[component]}/10
Kalan para: $${this.game.player.money}
        `, 'success');
    }

    maskIp(args) {
        this.write('IP adresin maskeleme işlemi başlatıldı...', 'info');
        setTimeout(() => {
            this.write('IP adresin başarıyla maskelendi. Artık izlerin daha güvende!', 'success');
            if (this.game && this.game.player.currentMission && this.game.player.currentMission.title.includes('İz Gizleme Temelleri')) {
                this.game.checkStep('mask_ip');
                this.showMissions();
            }
        }, 1500);
    }

    adminCommand(args) {
        if (args.length === 0) {
            this.write('Admin komutları: complete | money | upgrade all', 'info');
            return;
        }
        const sub = args[0];
        if (sub === 'complete') {
            // Aktif görevin tüm adımlarını tamamla
            if (this.game && this.game.player.currentMission) {
                const mission = this.game.player.currentMission;
                
                // Her adımı tamamlandı olarak işaretle
                mission.steps.forEach(step => {
                    // Adımdan komut adını çıkar
                    const match = step.match(/([a-zA-Z0-9_\-]+)/);
                    const command = match ? match[1].replace('--','') : step;
                    
                    // Adımı tamamlandı olarak işaretle
                    if (!this.game.player.completedSteps.includes(step)) {
                        this.game.player.completedSteps.push(step);
                        // Adımı tamamlandı olarak işaretle
                        this.game.checkStep(command);
                    }
                });

                // Görev tamamlandı mı kontrol et
                if (this.game.missions.isMissionComplete(mission.id, this.game.player.completedSteps)) {
                    this.game.completeMission(mission.id);
                }
                
                this.write('Tüm görev adımları admin tarafından tamamlandı.', 'success');
            } else {
                this.write('Aktif görev yok.', 'warning');
            }
        } else if (sub === 'money') {
            if (this.game) {
                this.game.player.money = 99999;
                this.showMoney();
                this.write('Admin: Para 99999 olarak ayarlandı.', 'success');
            }
        } else if (sub === 'upgrade' && args[1] === 'all') {
            Object.keys(this.system).forEach(key => {
                this.system[key] = 10;
            });
            this.write('Admin: Tüm sistem özellikleri maksimuma çıkarıldı.', 'success');
            this.showSystem();
        } else if (sub === 'level') {
            if (this.game) {
                this.game.player.level = 15;
                this.write('Admin: Seviye 15 olarak ayarlandı.', 'success');
            }
        } else {
            this.write('Bilinmeyen admin komutu.', 'error');
        }
    }

    onDecisionSelect(callback) {
        this.decisionCallback = callback;
        this.isWaitingForDecision = true;
        this.input.value = '';
        this.input.placeholder = 'Seçiminizi girin (1, 2, 3...)';
    }

    encrypt(args) {
        if (args.length === 0) {
            this.write('Hata: Şifrelenecek metin belirtilmedi.', 'error');
            return;
        }

        const text = args.join(' ');
        this.write('Şifreleme işlemi başlatılıyor...', 'info');
        
        setTimeout(() => {
            this.write(`\nŞifreleme Raporu:\n----------------\nOrijinal Metin: ${text}\nŞifreleme Algoritması: AES-256\nŞifreleme Anahtarı: Otomatik oluşturuldu\nDurum: Başarılı\n\nŞifrelenmiş Veri:\n----------------\n${btoa(text)}.enc\n\nGüvenlik Seviyesi: Yüksek\n            `, 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('encrypt');
                this.showMissions();
            }
        }, 2000);
    }

    report(args) {
        if (args.length === 0) {
            this.write('Hata: Rapor oluşturmak için hedef belirtmelisin. Örnek: report create --target netshield.local', 'error');
            return;
        }
        this.write('Rapor oluşturuluyor...');
        setTimeout(() => {
            this.write('Rapor başarıyla oluşturuldu ve gönderildi!', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('report');
                this.showMissions();
            }
        }, 1500);
    }

    listener(args) {
        if (args.length === 0 || args[0] !== '--start') {
            this.write('Hata: Listener başlatmak için: listener --start', 'error');
            return;
        }
        this.write('Listener başlatılıyor...');
        setTimeout(() => {
            this.write('Listener başarıyla başlatıldı ve bağlantı bekleniyor!', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('listener');
                this.showMissions();
            }
        }, 1500);
    }

    monitor(args) {
        if (args.length === 0 || args[0] !== '--response') {
            this.write('Hata: Yanıtı izlemek için: monitor --response', 'error');
            return;
        }
        this.write('Yanıt izleniyor...', 'info');
        setTimeout(() => {
            this.write('Güvenlik ekibinin yanıtı başarıyla izlendi. 👀', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('monitor');
                this.showMissions();
            }
        }, 1500);
    }

    analyze_rules(args) {
        this.write('Güvenlik duvarı kuralları analiz ediliyor...', 'info');
        setTimeout(() => {
            this.write('Kurallar başarıyla analiz edildi! 🔍', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('analyze_rules');
                this.showMissions();
            }
        }, 1200);
    }

    sandbox_run(args) {
        this.write('Dosya sandbox ortamında çalıştırılıyor...', 'info');
        setTimeout(() => {
            this.write('Dosya başarıyla izole edildi ve analiz tamamlandı! 🧪', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('sandbox_run');
                this.showMissions();
            }
        }, 1500);
    }

    coordinate(args) {
        this.write('Operasyon koordinasyonu başlatılıyor...', 'info');
        setTimeout(() => {
            this.write('Tüm ekipler başarıyla koordine edildi! 🤝', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('coordinate');
                this.showMissions();
            }
        }, 1500);
    }

    exploit(args) {
        this.write('Exploit geliştirme başlatılıyor...', 'info');
        setTimeout(() => {
            this.write('Exploit başarıyla geliştirildi ve test edildi! 💥', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('exploit');
                this.showMissions();
            }
        }, 1500);
    }

    brute_social(args) {
        this.write('Sosyal mühendislik saldırısı başlatılıyor...', 'info');
        setTimeout(() => {
            this.write('Yönetici profili başarıyla ele geçirildi! 🕵️‍♂️', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('brute_social');
                this.showMissions();
            }
        }, 1500);
    }

    analyze_transaction(args) {
        this.write('Kripto para işlemleri analiz ediliyor...', 'info');
        setTimeout(() => {
            this.write('Şüpheli işlemler başarıyla tespit edildi! 💸', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('analyze_transaction');
                this.showMissions();
            }
        }, 1500);
    }

    cleanup(args) {
        this.write('Sistem temizliği başlatılıyor...', 'info');
        setTimeout(() => {
            this.write('Tüm izler başarıyla temizlendi! 🧽', 'success');
            if (this.game && this.game.player.currentMission) {
                this.game.checkStep('cleanup');
                this.showMissions();
            }
        }, 1500);
    }
}

// Hızlı komut butonları için global fonksiyon
window.executeCommand = function(cmd) {
    if (window.terminal) {
        window.terminal.input.value = cmd;
        // Enter tuşuna basılmış gibi davran
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        window.terminal.input.dispatchEvent(event);
    }
}; 