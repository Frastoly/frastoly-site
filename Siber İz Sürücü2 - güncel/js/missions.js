// missions.js - Hikaye odaklı görev tanımları
class Missions {
    constructor() {
        this.missions = [
            {
                id: 'ghost_protocol_intro',
                title: 'Ghost Protocol\'a Giriş',
                description: 'Ghost Protocol\'a yeni katılan bir ajan olarak, yeteneklerini göstermen gerekiyor. İlk görevinde, temel siber güvenlik yeteneklerini test edeceğiz.',
                target: 'frastoly.com',
                targetDescription: 'Şüpheli finansal işlemler tespit edilen bir şirket. Sistemlerini inceleyip güvenlik açıklarını tespit etmemiz gerekiyor.',
                steps: [
                    'skills komutunu kullan',
                    'nmap frastoly.com komutunu kullan',
                    'netstat komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 1,
                reward: {
                    xp: 50,
                    money: 2000,
                    reputation: 10
                },
                briefing: 'Ghost Protocol, dünyanın en tehlikeli siber tehditlerine karşı savaşan elit bir ekiptir. Sen de artık bu ekibin bir parçasısın.',
                debriefing: 'Temel siber güvenlik yeteneklerini gösterdin. Ancak bu sadece başlangıç. Daha büyük tehditler bizi bekliyor.'
            },
            {
                id: 'shadow_network',
                title: 'Gölge Ağı',
                description: 'Frastoly.com\'daki araştırmamız sırasında, daha büyük bir tehdidin izlerine rastladık. "Gölge Ağı" adlı bir hacker grubu, finansal kurumları hedef alıyor.',
                target: 'shadow-network.io',
                targetDescription: 'Gölge Ağı\'nın komuta kontrol sunucusu. Bu sunucuya sızıp, planlarını öğrenmeliyiz.',
                steps: [
                    'nmap shadow-network.io komutunu kullan',
                    'encrypt "Gölge Ağı Analiz Raporu" komutunu kullan',
                    'mailspoof shadow-network.io komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 2,
                reward: {
                    xp: 100,
                    money: 5000,
                    reputation: 20
                },
                briefing: 'Gölge Ağı, son 6 ayda 3 büyük banka saldırısından sorumlu. Hedefleri sadece para değil, finansal sistemin kendisi.',
                debriefing: 'Gölge Ağı\'nın planları daha büyük. Bu sadece bir başlangıç. Daha fazla araştırma yapmalıyız.'
            },
            {
                id: 'deep_web_investigation',
                title: 'Derin Ağ Araştırması',
                description: 'Gölge Ağı\'nın izlerini takip ederken, derin ağda şüpheli bir forum keşfettik. Burada daha fazla bilgi olabilir.',
                target: 'deep-forum.onion',
                targetDescription: 'Şüpheli hacker forumu. Gölge Ağı üyeleri burada iletişim kuruyor olabilir.',
                steps: [
                    'nmap deep-forum.onion komutunu kullan',
                    'encrypt "Forum Analiz Raporu" komutunu kullan',
                    'mailspoof deep-forum.onion komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 3,
                reward: {
                    xp: 150,
                    money: 8000,
                    reputation: 30
                },
                briefing: 'Derin ağ, tehlikeli bir yer. Dikkatli olmalısın. Her adımında izini temizlemeyi unutma.',
                debriefing: 'Forumdaki mesajlar, Gölge Ağı\'nın çok daha büyük bir planı olduğunu gösteriyor. Zaman daralıyor.'
            },
            // Orta Seviye - Ağ Keşfi
            {
                id: 'mission4',
                title: 'NetShield Şüpheli Ağ Keşfi',
                description: `NetShield şirketi şüpheli aktiviteler bildiriyor. Bir rakip firmanın isteği üzerine açık portları tespit edip gizlice raporlamalısın. Gizlilik kritik!`,
                difficulty: 'Orta',
                experience: 120,
                skillRewards: { hacking: 1, networking: 1 },
                requirements: { level: 4 },
                steps: [
                    'nmap -sS -Pn netshield.local komutunu kullan',
                    'netstat -tulpn komutunu kullan',
                    'report create --target netshield.local komutunu kullan'
                ],
                summary: 'Sunucu portları keşfedildi ve gizli rapor oluşturuldu.'
            },
            // Sosyal Mühendislik
            {
                id: 'mission5',
                title: 'TechNova Sahte Mail Operasyonu',
                description: `TechNova'nun finans raporunu ele geçirmek için hedef çalışan amatör bir golfçü. Ona profesyonel bir davetiye maili gönder ve sisteme sız.`,
                difficulty: 'Orta',
                experience: 130,
                skillRewards: { socialEngineering: 1 },
                requirements: { level: 5 },
                steps: [
                    'mailspoof --from ceo@technova.com --to employee@technova.com --subject "Özel Golf Turnuvası Daveti" komutunu kullan',
                    'listener --start komutunu kullan'
                ],
                summary: 'Çalışan bağlantıya tıkladı ve sisteme başarıyla sızdın.'
            },
            // Parola Kırma
            {
                id: 'mission6',
                title: 'FinTrust Parola Kırma',
                description: `FinTrust çalışanının parolasını brute force yöntemiyle kırmalısın. Çok fazla yanlış deneme yapılırsa seni izlemeye başlarlar. Dikkatli ol!`,
                difficulty: 'Orta',
                experience: 140,
                skillRewards: { hacking: 1 },
                requirements: { level: 6 },
                steps: [
                    'bruteforce --target fintrust --user "jsmith" komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                summary: 'Parola kırıldı ve izlerini başarıyla temizledin.'
            },
            // İleri Seviye - Yanlış Alarm
            {
                id: 'mission7',
                title: 'Yanlış Alarm Operasyonu',
                description: `Rakip şirket, NetShield'in güvenlik ekibini oyalamanı istiyor. Yanlış bir alarm gönder, ekip hatayı anlayana kadar zaman kazan!`,
                difficulty: 'İleri',
                experience: 150,
                skillRewards: { socialEngineering: 1 },
                requirements: { level: 7 },
                steps: [
                    'falsealarm --send --target netshield --alert "Yanlış alarm, sistem stabil" komutunu kullan',
                    'monitor --response komutunu kullan'
                ],
                summary: 'Yanlış alarm gönderildi, ekip oyalandı.'
            },
            // İleri Seviye - Güvenlik Duvarı Atlatma
            {
                id: 'mission8',
                title: 'Firewall Bypass',
                description: `NetShield'in gelişmiş güvenlik duvarını atlat ve iç ağa sız. Otomatik IDS sensörlerine yakalanmamalısın.`,
                difficulty: 'İleri',
                experience: 170,
                skillRewards: { hacking: 1, networking: 1 },
                requirements: { level: 8 },
                steps: [
                    'bypass_firewall --target netshield komutunu kullan',
                    'analyze_rules komutunu kullan'
                ],
                summary: 'Güvenlik duvarı başarıyla atlatıldı.'
            },
            // Uzman Seviye - Zararlı Yazılım Analizi
            {
                id: 'mission9',
                title: 'Zararlı Yazılım Analizi',
                description: `Şüpheli bir zararlı yazılımı analiz et. Dosyayı sandbox ortamında çalıştırıp raporlamalısın. Yüksek risk var.`,
                difficulty: 'İleri',
                experience: 180,
                skillRewards: { cryptography: 1 },
                requirements: { level: 9 },
                steps: [
                    'malware_scan --file suspicious.exe komutunu kullan',
                    'sandbox_run --file suspicious.exe komutunu kullan'
                ],
                summary: 'Zararlı yazılım analiz edildi ve rapor sunuldu.'
            },
            // Uzman Seviye - Çeşitli Operasyonlar
            {
                id: 'mission10',
                title: 'Çoklu Hedef Operasyonu',
                description: `Birden fazla hedefi aynı anda tarayıp koordineli saldırı planı oluşturmalısın. Eşzamanlı operasyon riskli ama büyük ödül var.`,
                difficulty: 'Uzman',
                experience: 190,
                skillRewards: { hacking: 1, networking: 1 },
                requirements: { level: 10 },
                steps: [
                    'multi_target --scan komutunu kullan',
                    'coordinate --attack komutunu kullan'
                ],
                summary: 'Operasyon tamamlandı, tüm hedefler tarandı.'
            },
            {
                id: 'mission11',
                title: 'Sıfır Gün Açığı Keşfi',
                description: `Gizli bir yazılımda henüz yamalanmamış sıfır gün açığı ara. Hata tespit edilince raporla. Kritik bir görev.`,
                difficulty: 'Uzman',
                experience: 200,
                skillRewards: { hacking: 1, cryptography: 1 },
                requirements: { level: 11 },
                steps: [
                    'zero_day --scan komutunu kullan',
                    'exploit --develop komutunu kullan'
                ],
                summary: 'Sıfır gün açığı tespit edildi ve istismar prototipi oluşturuldu.'
            },
            {
                id: 'mission12',
                title: 'Gelişmiş Sosyal Mühendislik',
                description: `Üst düzey yöneticiye yönelik karmaşık sosyal mühendislik saldırısı gerçekleştir. Profil bilgisi topla ve kimlik bilgilerini ele geçir.`,
                difficulty: 'Uzman',
                experience: 220,
                skillRewards: { socialEngineering: 1 },
                requirements: { level: 12 },
                steps: [
                    'social_attack --target ceo komutunu kullan',
                    'brute_social --profile executive komutunu kullan'
                ],
                summary: 'Yönetici profili ele geçirildi, kimlik doğrulama atlatıldı.'
            },
            {
                id: 'mission13',
                title: 'Kripto Para Operasyonu',
                description: `Kripto para transferlerini takip et ve şüpheli işlemleri raporla. Müşteri kara para aklama kontrolleri yapıyor.`,
                difficulty: 'Uzman',
                experience: 230,
                skillRewards: { cryptography: 1 },
                requirements: { level: 13 },
                steps: [
                    'crypto_track --wallet komutunu kullan',
                    'analyze_transaction komutunu kullan'
                ],
                summary: 'Şüpheli işlemler tespit edildi ve raporlandı.'
            },
            {
                id: 'mission14',
                title: 'Uluslararası Tarama',
                description: `Farklı ülkelerdeki hedefleri tarayıp bilgi topla. Uluslararası veri koruma yasalarına dikkat et.`,
                difficulty: 'Uzman',
                experience: 250,
                skillRewards: { hacking: 1, networking: 1 },
                requirements: { level: 14 },
                steps: [
                    'global_scan --targets komutunu kullan',
                    'coordinate --international komutunu kullan'
                ],
                summary: 'Uluslararası tarama tamamlandı, tüm veriler toplandı.'
            },
            {
                id: 'mission15',
                title: 'Final Operasyonu',
                description: `Ghost Protocol'un en kritik operasyonu: tüm ekipmanları koordine et, çalıştır ve izlerini temizle. Efsane ajan olma zamanı!`,
                difficulty: 'Uzman',
                experience: 300,
                skillRewards: { hacking: 1, networking: 1, cryptography: 1, socialEngineering: 1 },
                requirements: { level: 15 },
                steps: [
                    'final_operation --start komutunu kullan',
                    'coordinate --all komutunu kullan',
                    'cleanup --all komutunu kullan'
                ],
                summary: 'Tüm sistemler temizlendi, operasyon tamamlandı. Efsane oldun!'
            }
        ];
    }

    getFirstMission() { return this.missions[0]; }
    getMission(id) { return this.missions.find(m => m.id === id); }
    getNextMission(id) {
        const idx = this.missions.findIndex(m => m.id === id);
        return idx < this.missions.length - 1 ? this.missions[idx + 1] : null;
    }
    getAvailableMissions(level) {
        return this.missions.filter(m => m.requirements.level <= level);
    }
    isMissionComplete(id, completedSteps) {
        const mission = this.getMission(id);
        if (!mission) return false;
        
        return mission.steps.every(step => completedSteps.includes(step));
    }
}

const missions = new Missions();
