# 🎮 Ghost Protocol: Gölge Ağı - Oyun Hikayesi

## 📖 Hikaye Özeti

**Ghost Protocol**, dünyanın en tehlikeli siber tehditlerine karşı savaşan elit bir ekiptir. Sen de artık bu ekibin bir parçasısın. 

Bir dizi finans kuruluşunda görünmez bir kanama var: **Gölge Ağı**, parayı mikro kesintilerle Frastoly adlı sahte bir kabuk şirkete akıtıyor. Limanlardaki konteyner hareketleri ve derin forum trafiği aynı frekansta kıpırdıyor.

## 🎭 Ana Karakterler

- **Sen (Operatör)**: Soğukkanlı, analitik. "Sessiz ve görünmez" ilken.
- **Rhea (Mentor)**: Sistem içi bağlayıcı; istihbaratı toparlar, seni yönlendirir.
- **Kade (Saha Ajanı)**: Liman/lojistik hattında çalışır; risk almayı sever.
- **"Kürsör" (Gölge Ağı Temsilcisi)**: Derin forumlarda görünür; ağın yüzü değil, maskesidir.
- **NetShield Ekibi**: Meşru kurum tarafında savunma cephesi.
- **TechNova & FinTrust**: İkisi de istemeden Gölge Ağı'na veri/para açılımı sağlayan kırılma noktaları.

## 📊 Oyun Metrikleri

Kararların şu metrikleri etkiler:

- 🧠 **İstihbarat Skoru** (`intel_score`): Topladığın bilgi ve anlayış seviyesi
- 🤝 **Kamu Güveni** (`public_trust`): Kamuoyunun ve kurumların sana olan güveni
- ⚠️ **İfşa Riski** (`exposure_risk`): Kimliğinin ifşa olma riski
- ⏱️ **Zaman Baskısı** (`timing_pressure`): Operasyonun aciliyeti

## 🗺️ Bölümler

### Bölüm 1: Kıvılcım - Ghost Protocol'a Giriş
**Hedef**: frastoly.com  
**Karar**: D0 - Başlangıç Stratejisi
- Sızma/Taarruz Ekseni
- Savunma Ekseni  
- İfşa Ekseni

### Bölüm 2: İz Sürme - Gölge Ağı
**Hedef**: shadow-network.io  
Gölge Ağı'nın komuta kontrol sunucusuna sızma

### Bölüm 3: Koridor - Derin Ağ
**Hedef**: deep-forum.onion  
**Karar**: D1 - Derin Forum mu, C2 mi?
- Derin Forum Personası (deep_forum_key)
- C2'ye Sızma (c2_backdoor)

### Bölüm 4: Savunma Cephesi - NetShield
**Hedef**: netshield.local  
**Karar**: D2 - NetShield Kararı
- Güncel Yama ve İzolasyon (netshield_rule_dump)
- Yanlış Alarmı Tırmandır
- Arka Kanal Mutabakat (back_channel)

### Bölüm 5: İkincil Hatlar - TechNova & FinTrust
**Hedefler**: technova.com, fintrust.com  
İki kritik sistemin analizi

### Bölüm 6: Lojistik Kesişim - SunHarbor
**Hedef**: sunharbor.port  
**Karar**: D3 - İfşa/Anlaşma/Manipülasyon
- Tam İfşa
- Kısmi İfşa + Pazarlık
- Veriyi Sat/Manipüle Et

### Bölüm 7: Eşik - Muhbirlik mi, Kontrol mü?
**Hedef**: operation-finale  
**Karar**: D4 - Son Hamle
- Eşgüdümlü Kapatma
- Ertele ve Derinleş

### Bölüm 8: Final Operasyonu - Eşgüdüm
**Hedef**: ghost-protocol-finale  
Tüm kararlarının sonucu ortaya çıkar

## 🎬 6 Farklı Son

### E1: Sistem Kurtarıldı (Kahraman Sonu)
**Koşul**: Yüksek istihbarat + Yüksek güven + Düşük risk + Eşgüdümlü kapatma  
Eşgüdümlü baskınla C2 kapatılır. Kimliğin gizli kalır. "Doğru şey yapıldı."

### E2: Gölge Kralı (Kontrolü Ele Geçirdin)
**Koşul**: Çok yüksek istihbarat + c2_backdoor + Ertele/Derinleş  
C2'nin ritmini öğrendin. Görünmez panelden yönetiyorsun. Ama tek başınasın.

### E3: Günah Keçisi (Yakalandın/İfşa Oldun)
**Koşul**: Yüksek risk + Düşük güven + Yanlış alarm + Kirli anlaşma  
Medya seni tekil fail olarak gösteriyor. Gölge Ağı maskesini değiştirdi.

### E4: Sürgündeki Muhbir
**Koşul**: Çok yüksek güven + Çok yüksek risk + Tam ifşa + Eşgüdüm  
Belgeler sistemi sarstı, reformlar hızlandı. Sen? Yeni kimlik, uzak bir kıyı.

### E5: Zincir Tepki (Kaos Sonu)
**Koşul**: Yüksek zaman baskısı + Yanlış alarm + Kötü zamanlama  
Domino etkisi: Piyasalar çalkalandı, masum kullanıcılar zarar gördü. "Yanlış zamanda doğru hamle, yine yanlıştır."

### E6: Kırılgan Denge (Gizli Mutabakat)
**Koşul**: Orta güven + Düşük risk + back_channel + Kısmi ifşa + Eşgüdüm  
Görünmez bir denge kuruldu. Kimse tam kazanmadı, kimse tam kaybetmedi. "Savaş bitmedi; sadece sessizleşti."

## 🎮 Oynanış

### Komutlar
```bash
# Temel komutlar
skills          # Yeteneklerini göster
missions        # Aktif görevi görüntüle
metrics         # Metrikleri kontrol et
decide <numara> # Karar noktalarında seçim yap

# Operasyon komutları
nmap <hedef>    # Ağ taraması
netstat         # Port durumu
encrypt <metin> # Veri şifreleme
mailspoof       # Sahte mail
bruteforce      # Parola kırma
logs --clear    # İz temizleme
```

### Karar Verme
Her kritik bölümde bir karar noktası var. Örnek:

```
🤔 KARAR NOKTASI!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Başlangıç Stratejisi

Operasyona nasıl başlayacaksın? Seçimin, tüm hikayeyi şekillendirecek.

1. Sızma/Taarruz Ekseni - Gölge Ağı'na doğrudan sızmayı hedefle
   Etkiler: 🧠 İstihbarat: +2, ⚠️ Risk: +1

2. Savunma Ekseni - NetShield ile kurum tarafını güçlendir
   Etkiler: 🤝 Güven: +1, 🧠 İstihbarat: +1

3. İfşa Ekseni - Delilleri toplayıp kamuya sızdırma rotasına gir
   Etkiler: 🤝 Güven: +2, ⚠️ Risk: +2

Seçiminizi yapmak için "decide <numara>" yazın.
```

## 🔑 Bayraklar (Anahtarlar)

Kararların sana özel anahtarlar kazandırır:

- `deep_forum_key`: Derin forum erişimi
- `c2_backdoor`: C2 sunucusuna arka kapı
- `netshield_rule_dump`: NetShield kuralları
- `back_channel`: Gizli kanal anlaşması
- `technova_proto`: TechNova prototip günlükleri
- `fintrust_chain`: FinTrust zincir haritası
- `sunharbor_manifest`: Liman manifestoları

## 📈 İpuçları

1. **Metriklerinizi takip edin**: `metrics` komutuyla düzenli kontrol edin
2. **Kararlar geri alınamaz**: Her seçim hikayeyi şekillendirir
3. **Denge kurun**: Aşırı risk veya aşırı temkinlilik kötü sonlara götürür
4. **Bayrakları toplayın**: Bazı sonlar özel anahtarlar gerektirir
5. **Yeniden oynayın**: 6 farklı son var, hepsini keşfedin!

## 🎯 Geliştirici Notları

### Dosya Yapısı
```
public/js/
├── missions.js   # 8 bölüm, 5 karar noktası, 6 final
├── game.js       # Oyun motoru, metrik sistemi, karar yönetimi
├── terminal.js   # Terminal arayüzü, komut işleme
└── player.js     # Oyuncu sınıfı (eski sistem)
```

### Teknik Detaylar
- **Metrik Sistemi**: Her karar metrikleri etkiler
- **Bayrak Sistemi**: Oyuncu durumunu takip eder
- **Final Hesaplama**: `missions.calculateEnding()` 6 sonu dinamik hesaplar
- **Karar Geçmişi**: Tüm kararlar kaydedilir ve final hesaplamasında kullanılır

### Test Komutu
Oyunu hızlıca test etmek için:
```javascript
admin complete  // Bölümü tamamla
admin money     // Para ekle
decide 1        // Karar ver
```

---

**Versiyon**: 2.0 - Derin Hikaye Sistemi  
**Son Güncelleme**: 1 Ekim 2025  
**Geliştirici**: Ghost Protocol Ekibi


