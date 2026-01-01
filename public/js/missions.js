// missions.js - Ghost Protocol: Kırılma Noktası - Derin Hikaye Sistemi

class Missions {
    constructor() {
        // Oyuncu başlangıç durumu takibi
        this.playerPath = {
            prologueChoice: null,  // 'hero', 'silent', 'thief'
            faction: null,         // 'ghost_protocol', 'shadow_network', 'lone_wolf'
            familyStatus: 'safe',  // 'safe', 'captured', 'rescued', 'lost'
            reputation: 'neutral'  // 'hero', 'neutral', 'villain'
        };

        // Bölüm tabanlı görev sistemi
        this.chapters = [
            // ==================== PROLOGUE ====================
            {
                id: 'prologue',
                title: 'PROLOGUE: Başlangıç',
                briefing: `SİSTEM BAŞLATILIYOR... HOŞGELDİN, OPERATÖR.`,
                story: `Karanlık bir bodrum. Üç monitör, sigara dumanı. Gündüzleri görünmez, geceleri efsanesin. 
Forumlarda "Operatör" diyorlar. Küçük işler yapıyorsun. Ama bu gece her şey değişecek.

BAKİYE: $12 (Kritik Düşük)
YENİ MESAJ: Anonim Kullanıcı - ACİL

TORUN: "Abi, dedem KrediX tuzağına düştü. $5.000 aldı, $15.000 borç yazdılar. Sahte senet. 
Şimdi eve el koyacaklar. Mahallede 150 aile daha aynı durumda. Lütfen yardım et."

"Cebimdeki son $200'ı vereyim. Dedemi bu listeden sil. Başka kimsemiz yok."

$200... Ama bu sadece bir tefeci veritabanı değil. Arkasında daha büyük bir şey var.`,
                target: 'kredix.local',
                targetDescription: 'KrediX tefeci ağının veritabanı. İçeride 12.847 borç kaydı var.',
                steps: [
                    'nmap kredix.local komutunu kullan',
                    'bruteforce --target kredix komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 1,
                reward: { xp: 50, money: 200, reputation: 5 },
                debriefing: `SQL INJECTION BAŞARILI! VERİTABANI ERİŞİMİ SAĞLANDI.

Dede'nin kaydı bulundu: $15.000 (SAHTE). Mahallede 147 aile daha aynı durumda.
KRİTİK: Tefecinin kripto cüzdanı: $78.000

Sistemin kalbindesin. Şimdi kritik bir karar vermelisin...`,
                hasDecision: true,
                decisionId: 'D_PROLOGUE'
            },
            // ==================== CHAPTER 2 ====================
            {
                id: 'chapter_2',
                title: 'BÖLÜM 2: İki Teklif',
                briefing: `6 AY SONRA...

O geceden sonra hiçbir şey eskisi gibi olmadı. Adın yeraltında dolaşıyor: "Operatör". 
İki büyük güç seni fark etti. İkisi de seni istiyor.`,
                story: `İKİ YENİ MESAJ ALINDI:

[ŞİFRELİ] - Devlet İmzası: Ghost Protocol
[ANONİM] - Karanlık Ağ: Gölge Ağı

İki farklı dünyadan iki teklif. Hayatını değiştirecek karar.`,
                target: 'secure-channel.local',
                targetDescription: 'Şifreli iletişim kanalları. Her iki tarafın tekliflerini incele.',
                steps: [
                    'decrypt ghost_protocol komutunu kullan',
                    'decrypt shadow_network komutunu kullan',
                    'analyze --both komutunu kullan'
                ],
                difficulty: 2,
                reward: { xp: 100, money: 3000, reputation: 10 },
                debriefing: `RHEA (Ghost Protocol): "Merhaba Operatör. Ben Rhea. Ghost Protocol adına konuşuyorum. 
Seni 6 aydır izliyoruz. O mahallede yaptığını gördük. Yasadışı mıydı? Evet. Ama adaletli miydi? Kesinlikle.
Yeteneğin var. Bize katıl. Düzeni korumak için çalış. Yasal koruma, gelişmiş ekipman, düzenli maaş."

ADMİN (Gölge Ağı): "Operatör... Ben Gölge Ağı'nın Admini. Biz bu dünyanın görünmeyen yöneticileriyiz. 
Rhea sana kurallar ve tasma vaat ediyordur. Bize katıl. Kuralları birlikte yıkalım. 
Sınırsız kaynak, en iyi silahlar, dünya çapında ağ. Para mı? Sınırsız. Güç mü? Sınırsız."

Kararını ver. Ya da ikisini de reddet.`,
                hasDecision: true,
                decisionId: 'D_FACTION'
            },
            // ==================== CHAPTER 3 ====================
            {
                id: 'chapter_3',
                title: 'BÖLÜM 3: NetShield Tehdidi',
                briefing: `2 HAFTA SONRA...

UYARI: NetShield aktivitesi tespit edildi!
NetShield... Devletin en acımasız siber birimi. Senin izini sürdükleri anlaşılıyor.`,
                story: `NetShield seni tespit etti. 6 ay önceki mahalle olayından izler bulmuşlar.

Durumun kritik. Seçtiğin tarafa göre farklı bir görev alacaksın:

GHOST PROTOCOL: Ajan ECHO'yu kurtar (NetShield içindeki köstebek)
GÖLGE AĞI: PHANTOM.exe ransomware'i NetShield'a yükle
YALNIZ KURT: Kendi başına NetShield veritabanından kaydını sil`,
                target: 'netshield.gov',
                targetDescription: 'Devletin gölge siber birimi. Ultra güvenli sistemler.',
                steps: [
                    'nmap -sS -Pn netshield.gov komutunu kullan',
                    'analyze --security komutunu kullan',
                    'exploit --entry komutunu kullan',
                    'logs --clear komutunu kullan'
                ],
                difficulty: 4,
                reward: { xp: 150, money: 6000, reputation: 20 },
                debriefing: `OPERASYON TAMAMLANDI!

İzini kaybettirdin. Ama artık "Kırmızı Bülten" ile aranıyorsun. Oyun ciddileşti.`,
                hasDecision: true,
                decisionId: 'D_APPROACH'
            },
            // ==================== CHAPTER 4 ====================
            {
                id: 'chapter_4',
                title: 'BÖLÜM 4: Aile Tehdidi',
                briefing: `1 HAFTA SONRA...

ACİL MESAJ ALINDI!
Bir hafta oldu. Rahatladığını düşünüyordun. Ama fırtına yeni başlıyor.`,
                story: `[ANONİM VIDEO AÇILIYOR...]

Ekranda: Bağlı bir kadın.

"Operatör. Rhea'nın arkasına saklanabileceğini sandın. Büyük hata. 
Bu kadını tanıyor musun? Annen. 24 saat sonra ölü.
Polise gidersen, ölür. Ghost Protocol'e söylersen, ölür. 
Tek başına gel. Koordinatlar ekte."

Ya da VİKTOR (Mafya Patronu):
"Prolog'da sildiğin o borçlar vardı ya... Onların gerçek sahibi benim. 
KrediX benim alt kuruluşumdu. Şimdi faiziyle ödeme zamanı.
Yarın gece, liman deposu. Gel ve hesabını temizle."

Ailen tehlikede. Ne yapacaksın?`,
                target: 'rescue-operation',
                targetDescription: 'Aile kurtarma operasyonu. Yüksek risk.',
                steps: [
                    'analyze --location komutunu kullan',
                    'plan --entry komutunu kullan',
                    'execute --rescue komutunu kullan'
                ],
                difficulty: 5,
                reward: { xp: 180, money: 0, reputation: 25 },
                debriefing: `AİLE DURUMU GÜNCELLENDİ.

Anneni kurtardın. Ama düşmanların seni bulmak için her şeyi yapacak.

ANNE: "Oğlum... Bu insanlar kim? Ne yaptın sen?"

Ona gerçeği söyledin mi yoksa yalan mı?`,
                hasDecision: true,
                decisionId: 'D_FAMILY'
            },
            // ==================== CHAPTER 5 ====================
            {
                id: 'chapter_5',
                title: 'BÖLÜM 5: NEXUS Sızma',
                briefing: `2 HAFTA SONRA...

KRİTİK SEVİYE OPERASYON!`,
                story: `HEDEF: NEXUS VERİ MERKEZİ
ÖNEMİ: KÜRESEL İNTERNETİN KALBİ
GÜVENLİK: ULTRA YÜKSEK

NEXUS... Dünyanın en büyük veri merkezi. Hükümet sırları, şirket verileri, kişisel bilgiler - her şey burada. 
Hem Ghost Protocol hem Gölge Ağı bu verileri istiyor. Ve sen, "Truva Atı" olacaksın.

Geçmişteki kararların burada etkili olacak:
- KAHRAMAN: Mahalle sana yardım edecek (Kolay giriş)
- SESSİZ: Orta zorluk
- HIRSIZ: Kötü itibar yüzünden çok zor giriş`,
                target: 'nexus.datacenter',
                targetDescription: 'Dünyanın en büyük veri merkezi. Tüm sırlar burada.',
                steps: [
                    'nmap -A nexus.datacenter komutunu kullan',
                    'exploit --quantum komutunu kullan',
                    'download --all komutunu kullan',
                    'exfiltrate --secure komutunu kullan'
                ],
                difficulty: 6,
                reward: { xp: 200, money: 10000, reputation: 30 },
                debriefing: `NEXUS OPERASYONU TAMAMLANDI.

VERİ TABANLARI:
- gov_secrets.db (Devlet sırları)
- shadow_network.db (Gölge Ağı üye listesi)
- financial_records.db (Finansal kayıtlar)
- personal_data.db (Kişisel veriler)

Her şey elinin altında. Dünyayı değiştirebilecek bilgiler.
Kime vereceksin? Ya da kendine mi saklayacaksın?`,
                hasDecision: true,
                decisionId: 'D_TREASON'
            },
            // ==================== CHAPTER 6 (FINAL) ====================
            {
                id: 'chapter_6',
                title: 'BÖLÜM 6: ATLAS ile Yüzleşme',
                briefing: `3 GÜN SONRA...

TÜM SİSTEMLER KARANLIK
BİLİNMEYEN KAYNAK: "ATLAS"`,
                story: `[FİZİKSEL NOT - Kapının Altından]

"Ekranların arkasındaki oyun bitti, Operatör. 
Liman. Gece yarısı. Tek başına gel. 
Gelmezsen, seni olduğun yerde bitiririz. Ve aileni de.
- ATLAS"

ATLAS... Yeraltının en tehlikeli figürü. Efsane mi gerçek mi kimse bilmiyor. 
Ama şimdi seni bulan o.

Terkedilmiş konteynerler. Sis. Uzakta tek bir lamba yanıyor. 
Figür ışığa çıktı. Orta yaşlı bir adam. Pahalı takım elbise. Soğuk gözler.`,
                target: 'atlas-confrontation',
                targetDescription: 'ATLAS ile son yüzleşme. Geri dönüşü yok.',
                steps: [
                    'analyze --atlas komutunu kullan',
                    'prepare --final komutunu kullan',
                    'confront --atlas komutunu kullan'
                ],
                difficulty: 8,
                reward: { xp: 300, money: 25000, reputation: 50 },
                debriefing: `ATLAS konuşuyor:

"Operatör. Sonunda yüz yüzeyiz. Sen beni tanımıyorsun ama ben seni 6 aydır izliyorum.
O mahalledeki ilk hackinden beri.

Rhea düzeni koruduğunu sanıyor. Gölge Ağı kaos yarattığını sanıyor. 
Ama gerçek şu ki... İkisini de BEN kurdum. 

Ghost Protocol? Benim oyuncağım. 
Gölge Ağı? Benim deneyi. 
Hepsi bir laboratuvardı. Ve sen... Sen denklemi bozdun."

Şimdi son kararı ver.`,
                hasDecision: true,
                decisionId: 'D_FINAL',
                isFinal: true
            }
        ];

        // Karar Noktaları
        this.decisions = {
            'D_PROLOGUE': {
                id: 'D_PROLOGUE',
                title: 'Kritik Karar: KrediX Veritabanı',
                description: 'Sistemin kalbindesin. Dede\'nin kaydı ve 147 ailenin borcu önünde. Tefecinin $78.000\'lık kripto cüzdanı da erişilebilir. Ne yapacaksın?',
                options: [
                    {
                        id: 'HERO',
                        text: '🦸 Kahraman - TÜM borç kayıtlarını sil, 150 aileyi kurtar',
                        effects: {
                            public_trust: 3,
                            exposure_risk: 2,
                            intel_score: 1,
                            reputation_type: 'hero',
                            flags: ['hero_path', 'mahalle_saved']
                        },
                        consequence: `TÜM BORÇ KAYITLARI SİLİNDİ: 12.847 kayıt. YEDEKLER İMHA EDİLDİ.

"MAHALLEDE MUCİZE! Yüzlerce ailenin borç kayıtları silindi! KrediX iflas etti!"
"ABİ! SEN HARİKASIN! Tüm mahalle senin hakkında konuşuyor. Ama polis de arıyormuş..."

Kahraman oldun. Ama büyük düşmanlar edindin.`
                    },
                    {
                        id: 'SILENT',
                        text: '🤫 Sessiz - Sadece dede\'nin kaydını sil ve çık',
                        effects: {
                            intel_score: 2,
                            exposure_risk: 0,
                            reputation_type: 'neutral',
                            flags: ['silent_path']
                        },
                        consequence: `KAYIT SİLİNDİ. YEDEKLER TEMİZLENDİ.

"Abi! Dedem aradı. Borç kayıtları gitmiş! İşte $200. Teşekkür ederim."

Bir kişiyi kurtardın. Ama monitörde 147 aile daha kalmış.
Küçük bir şöhret kazandın. Temiz ve sessiz.`
                    },
                    {
                        id: 'THIEF',
                        text: '💰 Hırsız - Dede\'nin kaydını sil VE tefecinin $2.000\'ını çal',
                        effects: {
                            money: 2000,
                            exposure_risk: 2,
                            public_trust: -2,
                            reputation_type: 'thief',
                            flags: ['thief_path', 'stole_money']
                        },
                        consequence: `KAYIT SİLİNDİ. KRİPTO CÜZDAN: $2.000 transfer edildi.

Parayı aldın. Dedeyi kurtardın. Ama 147 aile hâlâ borçlu. Tefeci araştıracak.

"Abi, dedem kurtuldu! Ama... başkaları hâlâ sıkıntıda. Sen yardım edemedin mi?"

Yeraltında "Bencil hacker" damgası yedin.`
                    }
                ]
            },
            'D_FACTION': {
                id: 'D_FACTION',
                title: 'Taraf Seçimi: Kim için çalışacaksın?',
                description: 'Ghost Protocol düzeni koruyor, Gölge Ağı kaos yaratıyor. Ya da kimsenin piyonu olmayabilirsin.',
                options: [
                    {
                        id: 'GP',
                        text: '🛡️ Ghost Protocol - Yasadışı ama adaletli. Rhea\'ya katıl.',
                        effects: {
                            public_trust: 2,
                            intel_score: 1,
                            money: 3000,
                            flags: ['faction_gp', 'legal_protection']
                        },
                        consequence: `"Doğru seçimi yaptın. Ghost Protocol ailesine hoş geldin."

TARAF: GHOST PROTOCOL
AVANTAJLAR: Yasal Koruma, Gelişmiş Ekipman, Aylık Maaş (+$3000), Devlet Veritabanı Erişimi

"İlk görevini yakında alacaksın. NetShield diye bir birim var. Bizimle arası iyi değil. Dikkatli ol."`
                    },
                    {
                        id: 'SN',
                        text: '🌑 Gölge Ağı - Kuralları yık. Admin\'e katıl.',
                        effects: {
                            intel_score: 2,
                            exposure_risk: 1,
                            money: 5000,
                            flags: ['faction_sn', 'dark_resources']
                        },
                        consequence: `"Akıllıca. Gölge Ağı'na hoş geldin."

TARAF: GÖLGE AĞI
AVANTAJLAR: Sınırsız Kaynak, Karanlık Ağ Erişimi, Zero-Day Exploit Kütüphanesi, Küresel Hacker Ağı

"İlk görevin yakında. Bize sadık kal. Ama unutma: İhanet affedilmez."`
                    },
                    {
                        id: 'YK',
                        text: '🐺 Yalnız Kurt - İkisini de reddet. Özgür kal.',
                        effects: {
                            exposure_risk: 2,
                            intel_score: 1,
                            public_trust: -1,
                            flags: ['faction_yk', 'lone_wolf']
                        },
                        consequence: `İki mesajı da sildin. Kimsenin piyonu olmayacaksın.

3 gün geçti...
"Sessizliğini cevap olarak aldık. Taraf seçmiyorsun, o zaman herkesin düşmanısın."

TARAF: YALNIZ KURT
DURUM: Düşman: Ghost Protocol, Gölge Ağı
AVANTAJ: Tam özgürlük, hiçbir kural yok. Ama kaynakların sınırlı.`
                    }
                ]
            },
            'D_APPROACH': {
                id: 'D_APPROACH',
                title: 'NetShield Operasyonu: Yaklaşım Stratejisi',
                description: 'NetShield sistemine nasıl yaklaşacaksın? Her yolun riskleri ve ödülleri farklı.',
                options: [
                    {
                        id: 'STEALTH',
                        text: '👤 Gizli Sızma - Sessiz ve görünmez. İz bırakma.',
                        effects: {
                            intel_score: 2,
                            exposure_risk: -1,
                            flags: ['stealth_approach']
                        },
                        consequence: `GİZLİ MOD AKTİF...
Güvenlik kameralarına erişiliyor... Tespit edilmeden ilerliyorsun...

Başarılı! Hiçbir alarm çalmadı. Profesyonel bir iş.`
                    },
                    {
                        id: 'LOUD',
                        text: '💥 Gürültülü Saldırı - DDoS ile kaos yarat, odunu dağıt.',
                        effects: {
                            timing_pressure: 2,
                            exposure_risk: 2,
                            public_trust: -1,
                            flags: ['loud_approach']
                        },
                        consequence: `SALDIRI MODU AKTİF...
DDoS saldırısı başlatılıyor... Güvenlik sistemleri bunalıyor...

Kaos ortamı oluşturuldu. İçeri giriş penceresi: 3 dakika!
Ama iz bıraktın. Seni arayacaklar.`
                    },
                    {
                        id: 'SOCIAL',
                        text: '🎭 Sosyal Mühendislik - İçeriden birini satın al.',
                        effects: {
                            money: -5000,
                            intel_score: 1,
                            flags: ['social_approach', 'has_inside_contact']
                        },
                        consequence: `HEDEF: David Chen
BORÇ: $45.000 (Kumar)
ZAFİYET: Maddi sıkıntı

$5.000 teklif ettin. "Tamam. Yarın gece senin kaydını sileceğim. Ama sakın beni satma."

Pahalıya patladı ama işe yaradı. Şimdilik güvendesin.`
                    }
                ]
            },
            'D_FAMILY': {
                id: 'D_FAMILY',
                title: 'Aile Kararı: Annenle Yüzleşme',
                description: 'Anneni kurtardın. Şimdi soru soruyor: "Bu insanlar kim? Ne yaptın sen?"',
                options: [
                    {
                        id: 'TRUTH',
                        text: '💔 Gerçeği Söyle - Her şeyi anlat. Hacker olduğunu.',
                        effects: {
                            public_trust: 1,
                            exposure_risk: 1,
                            flags: ['told_truth']
                        },
                        consequence: `"Hacker mı? Suçlu musun sen?! Ben seni doktor, mühendis olsun diye büyütmedim mi?"

Annenin hayal kırıklığı gözlerinden okunuyor. Ama en azından gerçeği biliyor.
Güven zedelendi ama yalan yok.`
                    },
                    {
                        id: 'LIE',
                        text: '🎭 Yalan Söyle - "Yanlış anlaşılma, düzelteceğim."',
                        effects: {
                            public_trust: -1,
                            intel_score: 1,
                            flags: ['told_lie']
                        },
                        consequence: `"Tamam oğlum... Sana güveniyorum."

Annene yalan söyledin. Onu korumak için. Ya da kendini?
Bir gün gerçek ortaya çıkarsa, daha da acı olacak.`
                    },
                    {
                        id: 'DISTANCE',
                        text: '🚶 Uzak Dur - Aileni güvenli bir yere gönder ve uzaklaş.',
                        effects: {
                            exposure_risk: -1,
                            public_trust: 0,
                            flags: ['family_distanced']
                        },
                        consequence: `Aileni şehir dışında bir akrabaya gönderin.

[AİLE - MESAJ] "Bir süre burada kalacağız. Dikkatli ol, oğlum."

Onları koruyorsun ama yalnızlaşıyorsun. Bu savaş artık sadece senin.`
                    }
                ]
            },
            'D_TREASON': {
                id: 'D_TREASON',
                title: 'İhanet Kararı: Verileri Kime Vereceksin?',
                description: 'NEXUS verileri elinde. Devlet sırları, Gölge Ağı üye listesi, finansal kayıtlar... Dünyayı değiştirebilirsin.',
                options: [
                    {
                        id: 'LOYAL',
                        text: '✅ Sadık Kal - Verileri kendi tarafına ver.',
                        effects: {
                            intel_score: 2,
                            public_trust: 2,
                            flags: ['stayed_loyal']
                        },
                        consequence: `Verileri kendi tarafına transfer ettin.

GHOST PROTOCOL: "Mükemmel iş! Gölge Ağı'nın sonu geldi. Sen tarih yazdın."
GÖLGE AĞI: "Bu verilerle devleti yıllarca rehin tutarız."
YALNIZ KURT: "Artık güç sende. Kimseye bağlı değilsin."

Sadakatini kanıtladın.`
                    },
                    {
                        id: 'BETRAY',
                        text: '🗡️ İhanet Et - Verileri karşı tarafa ver.',
                        effects: {
                            money: 20000,
                            public_trust: -3,
                            exposure_risk: 2,
                            flags: ['betrayed_faction']
                        },
                        consequence: `Verileri düşmana transfer ettin.

"Operatör? Sen bize bu bilgiyi mi veriyorsun? İnanamıyorum!"

$20.000 kazandın. Ama eski tarafın seni asla affetmeyecek.
İhanetçi damgası yedin.`
                    },
                    {
                        id: 'KEEP',
                        text: '👑 Kendine Sakla - Tüm verileri al. Güç sende olsun.',
                        effects: {
                            intel_score: 3,
                            exposure_risk: 3,
                            flags: ['kept_data', 'power_hungry']
                        },
                        consequence: `TÜM VERİLER KOPYALANIYOR... 4.7 TB veri indirildi.

Dünyanın en tehlikeli bilgileri şimdi senin elinde. 
Hükümetleri devir, şirketleri çökert, insanları rehin tut...

DİKKAT: Bu hareket ATLAS'ın dikkatini çekti!`
                    }
                ]
            },
            'D_FINAL': {
                id: 'D_FINAL',
                title: 'Final Kararı: ATLAS ile Yüzleşme',
                description: `ATLAS konuşuyor: "Ben 'Yeni Düzen' kuruyorum. Hükümetler, şirketler... hepsi yeniden yapılandırılacak. 
Sağ kolum ol. Karşılığında: Sınırsız güç, para, koruma. Aileni sonsuza kadar güvende tutarım."`,
                options: [
                    {
                        id: 'REFUSE',
                        text: '⚔️ Reddet ve Savaş - ATLAS\'ı durdur, ne pahasına olursa olsun.',
                        effects: {
                            public_trust: 3,
                            exposure_risk: 2,
                            flags: ['fought_atlas', 'hero_ending']
                        },
                        consequence: `"Hayır. Ben senin gibi olmayacağım."

Savaş başladı. Silahlar, yumruklar, kan. 
Sonunda ATLAS yerde. Yenilmiş.

"Seni... yanlış okumuşum. Sen gerçek bir kahramansın."

Dünya kurtarıldı. Ama bedeli ağır oldu.`
                    },
                    {
                        id: 'ACCEPT',
                        text: '🤝 Kabul Et - ATLAS\'a katıl. Güç sende olsun.',
                        effects: {
                            intel_score: 3,
                            public_trust: -4,
                            flags: ['joined_atlas', 'dark_ending']
                        },
                        consequence: `ATLAS'ın elini sıktın.

"Akıllı seçim. Birlikte dünyayı yeniden şekillendireceğiz."

Sınırsız güç, sınırsız para. Ama ruhunu mu sattın?
Artık gölgelerin efendisisin.`
                    },
                    {
                        id: 'TRICK',
                        text: '🎭 Kandır ve Yok Et - Kabul ediyormuş gibi yap, içeriden çökert.',
                        effects: {
                            intel_score: 2,
                            public_trust: 1,
                            timing_pressure: 2,
                            flags: ['tricked_atlas', 'double_agent']
                        },
                        consequence: `ATLAS'ın elini sıktın. Gülümsedin. "Seninle çalışmak onur olur."

1 HAFTA SONRA - ATLAS'IN KARARGAHI

İçeriden bilgi topladın. Tüm ağını öğrendin.
Ve sonra... arkana sakladığın silahı çektin.

"Seni... yanlış okumuşum. Sen benden de betersin."

ATLAS düştü. Ama sen mi kahraman oldun, yoksa canavarın yerine mi geçtin?`
                    },
                    {
                        id: 'SACRIFICE',
                        text: '💀 Kendini Feda Et - Her şeyi ifşa et, sonuçlarına katlan.',
                        effects: {
                            public_trust: 4,
                            exposure_risk: 4,
                            flags: ['sacrificed', 'whistleblower_ending']
                        },
                        consequence: `Tüm verileri kamuya açtın. ATLAS, Ghost Protocol, Gölge Ağı... her şey.

Dünya sarsıldı. Reformlar hızlandı. Adaletsizlik gün yüzüne çıktı.

Ama sen? Yeni bir isim, yeni bir uydu hattı. 
Rhea son mesajını gönderdi: "Yolun doğruydu. Keşke bedeli daha küçük olsaydı."

Sürgündeki kahramansın.`
                    }
                ]
            }
        };

        // Çoklu Sonlar
        this.endings = {
            'E_HERO': {
                id: 'E_HERO',
                title: '🦸 Kahraman Sonu: Sistem Kurtarıldı',
                description: `ATLAS yenildi. Organize suç ağları çökertildi.

TechNova yamaları, NetShield kuralları, finansal kayıtlar - hepsi güvenli ellerde.
Basın, "görünmez kayıp operasyonu"nu manşet yapar ama senin kimliğin sızmadı.

Rhea son kez bağlanır: "Bunu asla yazmayacağız, ama doğru şey yapıldı."

Masum insanlar güvende. Aileni tekrar görebiliyorsun.
Ve sen? Ghost Protocol'un efsanesi oldun.`,
                epilogue: 'Sessiz kahramansın. Kimliğin gizli, ama etkisi sonsuza kadar yaşayacak.',
                type: 'hero'
            },
            'E_POWER': {
                id: 'E_POWER',
                title: '👑 Karanlık Kral Sonu: Kontrolü Ele Geçirdin',
                description: `ATLAS'ın yerine geçtin. Tüm sistemler şimdi senin kontrolünde.

Ghost Protocol, Gölge Ağı, NEXUS verileri... hepsi senin oyuncağın.
Mikro akışları yönlendiriyorsun. Kararlar sen veriyorsun.

Bu güç bir karar: Dünyayı görünmez bir panelden iyileştirmek mi, 
yoksa zamanla panelin kendisi mi olmak?

Rhea sessizce bağlantıyı kesti. Artık tek başınasın.`,
                epilogue: 'Görünmez kralsın. Gücün var ama yalnızsın. Ve güç... yozlaştırır.',
                type: 'power'
            },
            'E_SACRIFICE': {
                id: 'E_SACRIFICE',
                title: '💀 Sürgündeki Muhbir Sonu',
                description: `Sızdırdığın belgeler sistemi sarstı; reformlar hızlandı, kamu nefes aldı.

ATLAS yakalandı. Ghost Protocol yeniden yapılandırıldı. 
Gölge Ağı tamamen çökertildi.

Ama sen? Yeni bir isim, yeni bir kimlik. Uzak bir kıyıda dalga sesleri.

Rhea şifreli bir paket yollar: 
"Yolun doğruydu. Keşke bedeli daha küçük olsaydı."`,
                epilogue: 'Dünyayı kurtardın ama kendini kaybettin. Gerçek fedakarlık buydu.',
                type: 'sacrifice'
            },
            'E_CHAOS': {
                id: 'E_CHAOS',
                title: '🔥 Kaos Sonu: Zincir Tepki',
                description: `Hataların domino etkisi yaptı.

ATLAS kazandı. Sistemler çöktü. Masum kullanıcılar zarar gördü.
Piyasalar çalkalandı. Aileler dağıldı.

Ve sen? Ya hapsinde, ya kaçak, ya da daha kötüsü...

ATLAS'ın son mesajı: "Seni uyarmıştım. Kaos her zaman birine bedel yazar."`,
                epilogue: 'Yanlış zamanda doğru hamle, yine yanlıştır. Kaos yarattın.',
                type: 'chaos'
            },
            'E_BALANCE': {
                id: 'E_BALANCE',
                title: '⚖️ Kırılgan Denge Sonu: Gizli Mutabakat',
                description: `Kurumlar ile yeraltı kanalları arasında görünmez bir denge kuruldu.

Kimse tam kazanmadı ama kimse tam kaybetmedi.
ATLAS geri çekildi - şimdilik. Ghost Protocol sessizleşti. Gölge Ağı yeniden organize oldu.

Senin adın dosyalara hiç yazılmadı.

Rhea fısıldar: "Savaş bitmedi; sadece sessizleşti."`,
                epilogue: 'Belirsiz bir barış. Herkes bekliyor. Ve sen ortada, dengede...',
                type: 'balance'
            },
            'E_BETRAYER': {
                id: 'E_BETRAYER',
                title: '🗡️ Hain Sonu: Günahların Bedeli',
                description: `Herkese ihanet ettin. Ve sonunda yalnız kaldın.

Ghost Protocol seni düşman ilan etti. 
Gölge Ağı intikam peşinde.
ATLAS'ı kandırdın ama artık herkes seni arıyor.

Para mı? Var. Güç mü? Belki. Ama güvenebileceğin kimse yok.

Medya seni "tekil fail"e indirger. Günah keçisi oldun.`,
                epilogue: 'İhanet eden, ihanete uğrar. Yalnızlık senin sonun oldu.',
                type: 'betrayer'
            },
            'E_LONE_WOLF': {
                id: 'E_LONE_WOLF',
                title: '🐺 Yalnız Kurt Sonu: Kendi Yolun',
                description: `Kimsenin piyonu olmadın. Her iki tarafı da reddettin.

Ghost Protocol ve Gölge Ağı birbirleriyle savaşırken, sen gölgelerde kaldın.
ATLAS'ı deşifre ettin ama kimseyle paylaşmadın - sadece izledin.

Şimdi özgürsün. Gerçek anlamda özgür. 
Ama bu özgürlüğün bedeli yalnızlık.

Rhea'nın son mesajı: "Bazıları kurtarır, bazıları yıkar. Sen sadece gözlemledin."`,
                epilogue: 'Özgürlük mü yalnızlık mı? Belki ikisi de aynı şey.',
                type: 'lone_wolf'
            },
            'E_REDEEMED': {
                id: 'E_REDEEMED',
                title: '🌅 Kefaret Sonu: İkinci Şans',
                description: `Hırsız olarak başladın. Kahraman olarak bitirdin.

O mahallede parayı çaldığında bencildin. Ama her adımda değiştin.
ATLAS'a karşı savaşırken, eski günahlarını temizledin.

Torun sana yazıyor: "Abi, dedem öldü geçen hafta. Ama son nefesine kadar 
seni anlattı. 'O çocuk bizi kurtardı' dedi. Teşekkür ederim."

Geçmişini değiştiremezsin. Ama geleceği yazabilirsin.`,
                epilogue: 'Herkes ikinci bir şansı hak eder. Sen de.',
                type: 'redeemed'
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

    // Final hesaplama - 8 farklı sonu dinamik hesaplar
    calculateEnding(playerState) {
        const {
            intel_score = 0,
            public_trust = 0,
            exposure_risk = 0,
            timing_pressure = 0,
            flags = [],
            decisionHistory = []
        } = playerState;

        // Kararları bul
        const finalDecision = decisionHistory.find(d => d.decisionId === 'D_FINAL');
        const treasonDecision = decisionHistory.find(d => d.decisionId === 'D_TREASON');
        const prologueDecision = decisionHistory.find(d => d.decisionId === 'D_PROLOGUE');
        const factionDecision = decisionHistory.find(d => d.decisionId === 'D_FACTION');

        // E_SACRIFICE: Sürgün Sonu (öncelikli kontrol)
        if (finalDecision && finalDecision.selectedOption === 'SACRIFICE') {
            return this.endings.E_SACRIFICE;
        }

        // E_POWER: Karanlık Kral (ATLAS'a katıldıysan)
        if (finalDecision && finalDecision.selectedOption === 'ACCEPT') {
            return this.endings.E_POWER;
        }

        // E_REDEEMED: Kefaret Sonu (Hırsız başlayıp, kahraman bitirdiysen)
        if (prologueDecision && prologueDecision.selectedOption === 'THIEF') {
            if (finalDecision && (finalDecision.selectedOption === 'REFUSE' || finalDecision.selectedOption === 'TRICK')) {
                if (public_trust >= 0) {
                    return this.endings.E_REDEEMED;
                }
            }
        }

        // E_HERO: Kahraman Sonu (ATLAS'ı yendiysen ve güvenilirsen)
        if (finalDecision && (finalDecision.selectedOption === 'REFUSE' || finalDecision.selectedOption === 'TRICK')) {
            if (public_trust >= 2 && !flags.includes('betrayed_faction')) {
                return this.endings.E_HERO;
            }
        }

        // E_LONE_WOLF: Yalnız Kurt Sonu (Hiçbir tarafa katılmadıysan)
        if (factionDecision && factionDecision.selectedOption === 'YK') {
            if (!flags.includes('betrayed_faction') && intel_score >= 3) {
                return this.endings.E_LONE_WOLF;
            }
        }

        // E_BETRAYER: Hain Sonu (İhanet ettiysen)
        if (flags.includes('betrayed_faction') || public_trust <= -3) {
            return this.endings.E_BETRAYER;
        }

        // E_CHAOS: Kaos Sonu (Çok fazla risk aldıysan)
        if (exposure_risk >= 4 || timing_pressure >= 3) {
            if (public_trust <= 0) {
                return this.endings.E_CHAOS;
            }
        }

        // E_BALANCE: Denge Sonu (Varsayılan - orta yol)
        return this.endings.E_BALANCE;
    }
}

// Global instance
const missions = new Missions();
