// missions.js - Ghost Protocol: Gölge Ağı - Derin Hikaye Sistemi

class Missions {
    constructor() {
        // Bölüm tabanlı görev sistemi
        this.chapters = [
            {
                id: 'chapter_1',
                title: 'Bölüm 1: Kıvılcım - Ghost Protocol\'a Giriş',
                briefing: `Rhea, tek kanallı bir hatta bağlanır:
"Gözlerini, kulaklarını açık tut. Üç yolun var ve hepsi yanıyor: Sız, savun veya ifşa et. Ama ne yaparsan yap, iz bırakma."`,
                story: `Ghost Protocol, dünyanın en tehlikeli siber tehditlerine karşı savaşan elit bir ekiptir. Sen de artık bu ekibin bir parçasısın. Bir dizi finans kuruluşunda görünmez bir kanama var: Gölge Ağı, parayı mikro kesintilerle Frastoly adlı sahte bir kabuk şirkete akıtıyor.`,
                target: 'frastoly.com',
                targetDescription: 'Şüpheli finansal işlemler tespit edilen bir kabuk şirket. Sistemlerini inceleyip güvenlik açıklarını tespit etmemiz gerekiyor.',
                steps: [
                    'skills komutunu kullan',
                    'nmap frastoly.com komutunu kullan',
                    'netstat komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 1,
                reward: { xp: 50, money: 2000, reputation: 10 },
                debriefing: 'Temel siber güvenlik yeteneklerini gösterdin. Frastoly\'deki mikro kesintiler daha büyük bir operasyonun parçası gibi görünüyor.',
                hasDecision: true,
                decisionId: 'D0'
            },
            {
                id: 'chapter_2',
                title: 'Bölüm 2: İz Sürme - Gölge Ağı',
                briefing: `Frastoly'deki mikro kesintiler aynı alt ağdan tetikleniyor. SunHarbor Limanı'nda geceleri "boş" görünen bir vinç hattı, konteynerleri aynı anda göçertiyor. Kürsör'ün forumda bıraktığı imza, seni davet eder gibi.`,
                story: `Araştırmalarımız sırasında, daha büyük bir tehdidin izlerine rastladık. "Gölge Ağı" adlı bir hacker grubu, finansal kurumları hedef alıyor. Son 6 ayda 3 büyük banka saldırısından sorumlu görünüyorlar.`,
                target: 'shadow-network.io',
                targetDescription: 'Gölge Ağı\'nın komuta kontrol sunucusu. Bu sunucuya sızıp, planlarını öğrenmeliyiz.',
                steps: [
                    'nmap shadow-network.io komutunu kullan',
                    'encrypt "Gölge Ağı Analiz Raporu" komutunu kullan',
                    'mailspoof shadow-network.io komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 2,
                reward: { xp: 100, money: 5000, reputation: 20 },
                debriefing: 'Gölge Ağı\'nın planları daha büyük. Liman trafiği ve finansal kesintiler aynı frekansta kıpırdıyor. Daha derine inmemiz gerekiyor.',
                hasDecision: false
            },
            {
                id: 'chapter_3',
                title: 'Bölüm 3: Koridor - Derin Ağ',
                briefing: `Derin forumlara bir persona ile sızarsan, Kürsör sana "Sıfır kayıp, sıfır iz" diyen bir manifesto okutuyor. Ayrı bir ses, sana gizli bir C2 (komuta-kontrol) kapısı fısıldıyor.`,
                story: `Gölge Ağı\'nın izlerini takip ederken, derin ağda şüpheli bir forum keşfettik. Burada daha fazla bilgi olabilir. Ama dikkatli olmalısın - her adımında izini temizlemeyi unutma.`,
                target: 'deep-forum.onion',
                targetDescription: 'Şüpheli hacker forumu. Gölge Ağı üyeleri burada iletişim kuruyor olabilir.',
                steps: [
                    'nmap deep-forum.onion komutunu kullan',
                    'encrypt "Forum Analiz Raporu" komutunu kullan',
                    'mailspoof deep-forum.onion komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 3,
                reward: { xp: 150, money: 8000, reputation: 30 },
                debriefing: 'Forumdaki mesajlar, Gölge Ağı\'nın çok daha büyük bir planı olduğunu gösteriyor. Şimdi bir karar vermemiz gerekiyor.',
                hasDecision: true,
                decisionId: 'D1'
            },
            {
                id: 'chapter_4',
                title: 'Bölüm 4: Savunma Cephesi - NetShield',
                briefing: `NetShield, güncelleme bekleyen bir kural seti ile kırılgan. Panik yaratmadan yamaları geçmek mi, yoksa paniği bilinçli olarak tırmandırıp Gölge Ağı\'nı dağıtmak mı?`,
                story: `NetShield şirketi şüpheli aktiviteler bildiriyor. Sistemleri kırılgan ve bir saldırıya açık. Nasıl ilerleyeceğimiz kritik önemde.`,
                target: 'netshield.local',
                targetDescription: 'NetShield güvenlik sistemleri. Yamaları uygulayıp sistemi güçlendirmemiz veya başka bir yaklaşım benimsememiz gerekiyor.',
                steps: [
                    'nmap -sS -Pn netshield.local komutunu kullan',
                    'netstat -tulpn komutunu kullan',
                    'report create --target netshield.local komutunu kullan'
                ],
                difficulty: 4,
                reward: { xp: 120, money: 6000, reputation: 25 },
                debriefing: 'NetShield operasyonu tamamlandı. Ancak başka hatlar da var - TechNova ve FinTrust.',
                hasDecision: true,
                decisionId: 'D2'
            },
            {
                id: 'chapter_5',
                title: 'Bölüm 5: İkincil Hatlar - TechNova & FinTrust',
                briefing: `TechNova'nın prototip günlükleri, bir IoT sensör dizisinin belirli saatlerde "ölü-uyanık" döngüye geçtiğini göstermekte. FinTrust'ın zincir haritasında mikro kesintilerin liman vardiyalarıyla korele olduğu netleşiyor.`,
                story: `İki kritik hedef: TechNova'nın AR-GE sistemleri ve FinTrust'ın finans zinciri. Her ikisi de Gölge Ağı'na istemeden açılım sağlıyor.`,
                targets: ['technova.com', 'fintrust.com'],
                targetDescription: 'TechNova prototip günlükleri ve FinTrust zincir haritası. İkisini de analiz etmemiz gerekiyor.',
                steps: [
                    'nmap technova.com komutunu kullan',
                    'nmap fintrust.com komutunu kullan',
                    'encrypt "TechNova-FinTrust Analiz" komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 5,
                reward: { xp: 130, money: 7000, reputation: 30 },
                debriefing: 'TechNova ve FinTrust verileri toplandı. Lojistik kesişim noktasını bulduk - SunHarbor Limanı.',
                hasDecision: false
            },
            {
                id: 'chapter_6',
                title: 'Bölüm 6: Lojistik Kesişim - SunHarbor',
                briefing: `Kade, vinç operatörlerinin değişimli nöbetinde "boş sefer" maskesi altında konteyner kaydırma yapıldığını doğruluyor. Gölge Ağı, finans ve lojistiği aynı anahtarla döndürüyor.`,
                story: `Liman manifestolarında tutarsızlıklar var. "Boş" konteynerler sahada yok görünüyor. Bu, Gölge Ağı'nın fiziksel ayağı olabilir.`,
                target: 'sunharbor.port',
                targetDescription: 'SunHarbor Limanı konteyner yönetim sistemi. Manifest kayıtlarını inceleyip tutarsızlıkları bulmamız gerekiyor.',
                steps: [
                    'nmap sunharbor.port komutunu kullan',
                    'encrypt "SunHarbor Manifest Analizi" komutunu kullan',
                    'bruteforce --target sunharbor --user operator komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 6,
                reward: { xp: 140, money: 8500, reputation: 35 },
                debriefing: 'Liman verileri ele geçirildi. Artık tam resmi görüyoruz. Şimdi nasıl kapatacağımıza karar verme zamanı.',
                hasDecision: true,
                decisionId: 'D3'
            },
            {
                id: 'chapter_7',
                title: 'Bölüm 7: Eşik - Muhbirlik mi, Kontrol mü?',
                briefing: `Yeterli delil birikti. Ama nasıl kapatacağın asıl kararı belirleyecek: Tam ifşa mı, kısmi sızdırma mı, yoksa ağı içeriden kontrol mü?`,
                story: `Elimizde tüm deliller var: Frastoly, Gölge Ağı C2, forum kayıtları, NetShield açıkları, TechNova-FinTrust bağlantıları ve SunHarbor manifestoları. Şimdi son hamleyi yapma zamanı.`,
                target: 'operation-finale',
                targetDescription: 'Final operasyonu planlaması. Stratejini belirle ve uygula.',
                steps: [
                    'multi_target --scan komutunu kullan',
                    'coordinate --attack komutunu kullan',
                    'encrypt "Final Operasyon Raporu" komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 7,
                reward: { xp: 200, money: 15000, reputation: 50 },
                debriefing: 'Operasyon hazırlıkları tamamlandı. Rhea son kez bağlanıyor...',
                hasDecision: true,
                decisionId: 'D4'
            },
            {
                id: 'chapter_8',
                title: 'Bölüm 8: Final Operasyonu - Eşgüdüm',
                briefing: `Rhea son kez bağlanır: "Şu an planı kilitlemezsek, döngü yine başa saracak. Seçim senin."`,
                story: `Son adım. Tüm sistemler hazır, tüm ekipler yerinde. Kararın, dünyanın geleceğini şekillendirecek.`,
                target: 'ghost-protocol-finale',
                targetDescription: 'Ghost Protocol Final Operasyonu. Tüm kararlarının sonucu şimdi ortaya çıkacak.',
                steps: [
                    'final_operation --start komutunu kullan',
                    'coordinate --all komutunu kullan',
                    'cleanup --all komutunu kullan'
                ],
                difficulty: 8,
                reward: { xp: 300, money: 25000, reputation: 100 },
                debriefing: 'Operasyon tamamlandı. Hikayenin sonu, kararlarınla şekillenecek...',
                hasDecision: false,
                isFinal: true
            }
        ];

        // Karar Noktaları (D0-D4)
        this.decisions = {
            'D0': {
                id: 'D0',
                title: 'Başlangıç Stratejisi',
                description: 'Operasyona nasıl başlayacaksın? Seçimin, tüm hikayeyi şekillendirecek.',
                options: [
                    {
                        id: 'S',
                        text: 'Sızma/Taarruz Ekseni - Gölge Ağı\'na doğrudan sızmayı hedefle',
                        effects: {
                            intel_score: 2,
                            exposure_risk: 1,
                            strategy: 'offensive'
                        },
                        consequence: 'Saldırgan bir yaklaşım seçtin. Bu, hızlı sonuçlar getirebilir ama riskler de yüksek.'
                    },
                    {
                        id: 'V',
                        text: 'Savunma Ekseni - NetShield ile kurum tarafını güçlendir',
                        effects: {
                            public_trust: 1,
                            intel_score: 1,
                            strategy: 'defensive'
                        },
                        consequence: 'Savunma odaklı bir yaklaşım seçtin. Daha güvenli ama yavaş ilerleyeceksin.'
                    },
                    {
                        id: 'İ',
                        text: 'İfşa Ekseni - Delilleri toplayıp kamuya sızdırma rotasına gir',
                        effects: {
                            public_trust: 2,
                            exposure_risk: 2,
                            strategy: 'whistleblower'
                        },
                        consequence: 'Muhbirlik yolunu seçtin. Kamu güvenini kazanacaksın ama kendini de riske atacaksın.'
                    }
                ]
            },
            'D1': {
                id: 'D1',
                title: 'Derin Forum mu, C2 mi?',
                description: 'Derin ağda iki yol var. Hangisini seçeceksin?',
                options: [
                    {
                        id: 'F',
                        text: 'Derin Forum Personası - Güven inşa et, deep_forum_key kazan',
                        effects: {
                            intel_score: 2,
                            exposure_risk: 1,
                            flags: ['deep_forum_key']
                        },
                        consequence: 'Forum personası oluşturdun. Kürsör\'ün güvenini kazanmaya başladın.'
                    },
                    {
                        id: 'C',
                        text: 'C2\'ye Sızma - Yönetim katmanına gizli kapı (c2_backdoor) dene',
                        effects: {
                            intel_score: 1,
                            exposure_risk: 2,
                            flags: ['c2_backdoor']
                        },
                        consequence: 'C2\'ye sızdın. Tehlikeli ama güçlü bir pozisyon kazandın.'
                    }
                ]
            },
            'D2': {
                id: 'D2',
                title: 'NetShield Kararı',
                description: 'NetShield\'in güvenliğini nasıl ele alacaksın?',
                options: [
                    {
                        id: 'Y',
                        text: 'Güncel Yama ve İzolasyon - netshield_rule_dump elde et, sistemleri güçlendir',
                        effects: {
                            public_trust: 2,
                            exposure_risk: -1,
                            flags: ['netshield_rule_dump']
                        },
                        consequence: 'Sistemleri yamaladın. Güvenilir ve temkinli bir yaklaşım.'
                    },
                    {
                        id: 'A',
                        text: 'Yanlış Alarmı Tırmandır - Düşmanı dağıtmayı dene ama kaosu göze al',
                        effects: {
                            public_trust: -2,
                            exposure_risk: 2,
                            timing_pressure: 1
                        },
                        consequence: 'Kaos yarattın. Bu, Gölge Ağı\'nı dağıtabilir ama kontrol kaybı riski var.'
                    },
                    {
                        id: 'M',
                        text: 'Arka Kanal Mutabakat - Bazı kurumlarla gizlice anlaş, sessiz denge kur',
                        effects: {
                            intel_score: 1,
                            exposure_risk: -1,
                            flags: ['back_channel']
                        },
                        consequence: 'Gizli anlaşmalar yaptın. Kırılgan ama etkili bir denge kurdun.'
                    }
                ]
            },
            'D3': {
                id: 'D3',
                title: 'İfşa/Anlaşma/Manipülasyon',
                description: 'Elinde tüm deliller var. Şimdi ne yapacaksın?',
                options: [
                    {
                        id: 'T',
                        text: 'Tam İfşa - Kamuya aç, her şeyi',
                        effects: {
                            public_trust: 3,
                            exposure_risk: 3,
                            timing_pressure: 2
                        },
                        consequence: 'Her şeyi ifşa ettin. Kamu kahramanı olabilirsin ama hedef de oldun.'
                    },
                    {
                        id: 'K',
                        text: 'Kısmi İfşa + Pazarlık - Soruşturma birimleriyle kontrollü paylaşım',
                        effects: {
                            public_trust: 1,
                            exposure_risk: 1,
                            intel_score: 1
                        },
                        consequence: 'Kontrollü bir yaklaşım seçtin. Dengeli ve makul.'
                    },
                    {
                        id: 'Vx',
                        text: 'Veriyi Sat/Manipüle Et - Kürsör\'e ya da üçüncü tarafa pazarlık',
                        effects: {
                            intel_score: 1,
                            public_trust: -3,
                            exposure_risk: 2,
                            money: 10000
                        },
                        consequence: 'Karanlık tarafa geçtin. Para kazandın ama itibarını kaybettin.'
                    }
                ]
            },
            'D4': {
                id: 'D4',
                title: 'Son Hamle',
                description: 'Rhea: "Şu an planı kilitlemezsek, döngü yine başa saracak. Seçim senin."',
                options: [
                    {
                        id: 'E',
                        text: 'Eşgüdümlü Kapatma - NetShield yamaları + forum/C2 + liman koordinasyonu',
                        effects: {
                            public_trust: 2,
                            exposure_risk: -1,
                            operation: 'shutdown'
                        },
                        consequence: 'Temiz bir kapatma operasyonu. Profesyonel ve etkili.'
                    },
                    {
                        id: 'R',
                        text: 'Ertele ve Derinleş - İçeriden kontrolü büyüt; büyük ama riskli kumar',
                        effects: {
                            intel_score: 2,
                            exposure_risk: 2,
                            public_trust: -1,
                            operation: 'infiltrate'
                        },
                        consequence: 'Güç oyununa girdin. Kontrol sende ama bedeli ağır olabilir.'
                    }
                ]
            }
        };

        // 6 Farklı Son
        this.endings = {
            'E1': {
                id: 'E1',
                title: 'Sistem Kurtarıldı (Kahraman Sonu)',
                description: `Eşgüdümlü baskınla C2 kapatılır. TechNova yamaları, NetShield kuralları ve FinTrust haritası tek dosyada birleşir. SunHarbor'da "boş" konteynerler bulunur. 

Basın, "görünmez kayıp operasyonu"nu manşet yapar ama senin kimliğin sızmaz. 

Rhea sadece bir cümle bırakır: "Bunu asla yazmayacağız, ama doğru şey yapıldı."`,
                epilogue: 'Ghost Protocol\'un sessiz kahramanı oldun. Kimliğin gizli, ama etkisi sonsuza kadar.',
                type: 'hero'
            },
            'E2': {
                id: 'E2',
                title: 'Gölge Kralı (Kontrolü Ele Geçirdin)',
                description: `C2'nin ritmini öğrendin; Gölge Ağı'nın damarlarına dokunmadan yönlendirmeye başlıyorsun. Mikro kesintiler "istenen" yerlere akıyor, bazıları geri akıyor. 

Bu güç bir karar: Dünyayı görünmez bir panelden iyileştirmek mi, yoksa zamanla panelin kendisi mi olmak?

Rhea sessizce bağlantıyı keser. Artık tek başınasın.`,
                epilogue: 'Görünmez kralsın. Gücün var ama yalnızsın.',
                type: 'power'
            },
            'E3': {
                id: 'E3',
                title: 'Günah Keçisi (Yakalandın/İfşa Oldun)',
                description: `Panik dalgası kurumları kilitlerken bir sızıntı, senin hamlelerini ters yüz eder. Medya seni "tekil fail"e indirger, Gölge Ağı sessizce maskesini değiştirir. 

Kade uzak bir limandan tek cümle gönderir: "Kaos her zaman birine bedel yazar."

Sen o birine döndün.`,
                epilogue: 'Operasyon başarısız. Suçlu olarak anılacaksın.',
                type: 'failure'
            },
            'E4': {
                id: 'E4',
                title: 'Sürgündeki Muhbir',
                description: `Sızdırdığın belgeler sistemi sarsar; reformlar hızlanır, kamu nefes alır. Ama sen? 

Yeni bir isim, yeni bir uydu hattı. Rhea, şifreli bir paket yollar: "Yolun doğruydu. Keşke bedeli daha küçük olsaydı." 

Uzak bir kıyıda, dalga sesleri altında kimliğini kapatırsın.`,
                epilogue: 'Dünyayı kurtardın ama kendini kaybettin.',
                type: 'sacrifice'
            },
            'E5': {
                id: 'E5',
                title: 'Zincir Tepki (Kaos Sonu)',
                description: `Yanlış alarmlar domino etkisi yapar: Piyasalar çalkalanır, masum kullanıcılar zarar görür. NetShield devreleri yorgun düşer; FinTrust geçici olarak askıya alınır. 

Gölge Ağı, sisin ardında bir istasyon daha kurar. 

Kade'nin raporuna tek not düşer: "Yanlış zamanda doğru hamle, yine yanlıştır."`,
                epilogue: 'Kaos yarattın. Sistem çöktü.',
                type: 'chaos'
            },
            'E6': {
                id: 'E6',
                title: 'Kırılgan Denge (Gizli Mutabakat)',
                description: `Kurumlar ile yeraltı kanalları arasında görünmez bir denge kurulur. Kimse tam kazanmadı ama kimse tam kaybetmedi. 

Mikro akışlar kesilir, liman akışı normale döner. Senin adın dosyalara hiç yazılmaz. 

Rhea fısıldar: "Savaş bitmedi; sadece sessizleşti."`,
                epilogue: 'Belirsiz bir barış. Kimse kazanmadı, kimse kaybetmedi.',
                type: 'balance'
            }
        };
    }

    // Bölüm alma
    getChapter(chapterId) {
        return this.chapters.find(c => c.id === chapterId);
    }

    getFirstChapter() {
        return this.chapters[0];
    }

    getNextChapter(currentChapterId) {
        const currentIndex = this.chapters.findIndex(c => c.id === currentChapterId);
        if (currentIndex !== -1 && currentIndex < this.chapters.length - 1) {
            return this.chapters[currentIndex + 1];
        }
        return null;
    }

    // Karar alma
    getDecision(decisionId) {
        return this.decisions[decisionId];
    }

    // Görev tamamlama kontrolü
    isChapterComplete(chapterId, completedSteps) {
        const chapter = this.getChapter(chapterId);
        if (!chapter) return false;
        
        return chapter.steps.every(step => completedSteps.includes(step));
    }

    // Eski API uyumluluğu için
    getFirstMission() { return this.getFirstChapter(); }
    getMission(id) { return this.getChapter(id); }
    getNextMission(id) { return this.getNextChapter(id); }
    getAvailableMissions(level) {
        return this.chapters.filter(c => c.difficulty <= level);
    }
    isMissionComplete(id, completedSteps) {
        return this.isChapterComplete(id, completedSteps);
    }

    // Final hesaplama - 6 farklı sonu belirler
    calculateEnding(playerState) {
        const {
            intel_score = 0,
            public_trust = 0,
            exposure_risk = 0,
            timing_pressure = 0,
            flags = [],
            decisionHistory = []
        } = playerState;

        // E1: Sistem Kurtarıldı (Kahraman)
        if (intel_score >= 5 && public_trust >= 3 && exposure_risk <= 3) {
            const lastDecision = decisionHistory.find(d => d.decisionId === 'D4');
            if (lastDecision && lastDecision.selectedOption === 'E') {
                return this.endings.E1;
            }
        }

        // E2: Gölge Kralı (Kontrol)
        if (intel_score >= 7 && flags.includes('c2_backdoor')) {
            const d4Decision = decisionHistory.find(d => d.decisionId === 'D4');
            if (d4Decision && d4Decision.selectedOption === 'R') {
                return this.endings.E2;
            }
        }

        // E3: Günah Keçisi (Başarısızlık)
        if (exposure_risk >= 4 || public_trust <= 0) {
            const d2Decision = decisionHistory.find(d => d.decisionId === 'D2');
            if (d2Decision && d2Decision.selectedOption === 'A') {
                return this.endings.E3;
            }
        }

        // E4: Sürgündeki Muhbir
        if (public_trust >= 5 && exposure_risk >= 4) {
            const d3Decision = decisionHistory.find(d => d.decisionId === 'D3');
            const d4Decision = decisionHistory.find(d => d.decisionId === 'D4');
            if (d3Decision && d3Decision.selectedOption === 'T' && 
                d4Decision && d4Decision.selectedOption === 'E') {
                return this.endings.E4;
            }
        }

        // E5: Zincir Tepki (Kaos)
        if (timing_pressure >= 2 || public_trust <= 1) {
            const d2Decision = decisionHistory.find(d => d.decisionId === 'D2');
            if (d2Decision && d2Decision.selectedOption === 'A') {
                return this.endings.E5;
            }
        }

        // E6: Kırılgan Denge
        if (public_trust >= 0 && public_trust <= 4 && 
            exposure_risk <= 2 && flags.includes('back_channel')) {
            const d2Decision = decisionHistory.find(d => d.decisionId === 'D2');
            const d3Decision = decisionHistory.find(d => d.decisionId === 'D3');
            const d4Decision = decisionHistory.find(d => d.decisionId === 'D4');
            if (d2Decision && d2Decision.selectedOption === 'M' &&
                d3Decision && d3Decision.selectedOption === 'K' &&
                d4Decision && d4Decision.selectedOption === 'E') {
                return this.endings.E6;
            }
        }

        // Varsayılan son (E6 - Denge)
        return this.endings.E6;
    }
}

const missions = new Missions();


