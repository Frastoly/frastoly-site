let kelimeler = [];
let mevcutHarfler = [];
let bulunanKelimeler = [];
let mevcutZorluk = 'orta';
let puan = 0;
let zincirModu = false;
let sonKelime = '';
let zincirUzunlugu = 0;

// --- Yarışma Modu Soru Havuzu (artık dışarıdan yüklenecek) ---
let quizPool = [];

// --- Yarışma Modu Değişkenleri ---
let quizCurrent = 0;
let quizOrder = [];
let quizRevealed = [];
let quizScore = 0;
let quizTimer = null;
let quizTimeLeft = 180; // 3 dakika
let quizTotalQuestions = 10; // Her yarışmada 10 soru
let quizUsedQuestions = [];
let quizHighScores = [];
let quizPlayerName = '';

const zorlukSeviyeleri = {
    'kolay': {
        harfSayisi: 4,
        puanCarpani: 1
    },
    'orta': {
        harfSayisi: 6,
        puanCarpani: 1.5
    },
    'zor': {
        harfSayisi: 8,
        puanCarpani: 2
    }
};

function oyunModuSec(mod) {
    zincirModu = mod === 'zincir';
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    oyunBaslat();
    const submitBtn = document.getElementById('submitBtn');
    const wordInput = document.getElementById('wordInput');
    submitBtn.onclick = kelimeGonder;
    wordInput.onkeydown = function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            kelimeGonder();
        }
    };
    zincirBilgisiGuncelle();
}

function anaMenuyeDon() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
    oyunBaslat();
}

function oyunBaslat() {
    mevcutHarfler = rastgeleHarfler();
    harfleriGoster();
    if (!zincirModu) {
        puan = 0;
        puanGuncelle();
    }
    mesajGoster('');
    bulunanKelimeler = [];
    document.getElementById('wordInput').value = '';
    kelimeSayisiGoster();
    zincirBilgisiGuncelle();
    const submitBtn = document.getElementById('submitBtn');
    const wordInput = document.getElementById('wordInput');
    submitBtn.onclick = kelimeGonder;
    wordInput.onkeydown = function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            kelimeGonder();
        }
    };
    const hintBtn = document.getElementById('hintBtn');
    if (zincirModu) {
        hintBtn.disabled = true;
        hintBtn.style.opacity = 0.5;
        hintBtn.title = 'Zincir modunda ipucu kullanılamaz';
    } else {
        hintBtn.disabled = false;
        hintBtn.style.opacity = 1;
        hintBtn.title = '';
    }
}

function rastgeleHarfler() {
    let harfler = [];
    if (kelimeler.length === 0) return harfler;
    let uygunKelimeler = kelimeler;
    if (zincirModu && sonKelime) {
        const sonHarf = sonKelime[sonKelime.length - 1].toLowerCase();
        uygunKelimeler = kelimeler.filter(k => 
            k.toLowerCase().startsWith(sonHarf) && 
            k.length === zorlukSeviyeleri[mevcutZorluk].harfSayisi
        );
    } else {
        uygunKelimeler = kelimeler.filter(k => k.length === zorlukSeviyeleri[mevcutZorluk].harfSayisi);
    }
    if (uygunKelimeler.length === 0) {
        uygunKelimeler = kelimeler;
    }
    const secilenKelime = uygunKelimeler[Math.floor(Math.random() * uygunKelimeler.length)];
    harfler = secilenKelime.split('');
    const alfabe = "abcçdefgğhıijklmnoöprsştuüvyz";
    while (harfler.length < zorlukSeviyeleri[mevcutZorluk].harfSayisi) {
        const harf = alfabe[Math.floor(Math.random() * alfabe.length)];
        harfler.push(harf);
    }
    for (let i = harfler.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [harfler[i], harfler[j]] = [harfler[j], harfler[i]];
    }
    return harfler;
}

function harfleriGoster() {
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = '';
    if (!mevcutHarfler || mevcutHarfler.length === 0) {
        lettersDiv.innerHTML = '<span style="color:#d7263d">Harfler yüklenemedi!</span>';
        return;
    }
    mevcutHarfler.forEach(harf => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = harf;
        span.onclick = () => {
            document.getElementById('wordInput').value += harf;
        };
        lettersDiv.appendChild(span);
    });
}

function kelimeGecerliMi(kelime) {
    kelime = kelime.toLowerCase();
    if (!kelimeler.map(k => k.toLowerCase()).includes(kelime)) return false;
    let harflerKopya = [...mevcutHarfler.map(h => h.toLowerCase())];
    for (let harf of kelime) {
        const idx = harflerKopya.indexOf(harf);
        if (idx === -1) return false;
        harflerKopya.splice(idx, 1);
    }
    return true;
}

function mesajGoster(mesaj, basarili = true) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = mesaj;
    msgDiv.style.color = basarili ? '#2d545e' : '#d7263d';
}

function puanGuncelle() {
    document.getElementById('score').textContent = `Puan: ${puan}`;
}

function cicekBuyut() {
    const flower = document.getElementById('flower');
    flower.style.transform = 'scale(1.15)';
    setTimeout(() => {
        flower.style.transform = 'scale(1)';
    }, 400);
}

function mevcutHarflerleUygunKelimeler() {
    return kelimeler.filter(kelime => {
        let harflerKopya = [...mevcutHarfler.map(h => h.toLowerCase())];
        for (let harf of kelime.toLowerCase()) {
            const idx = harflerKopya.indexOf(harf);
            if (idx === -1) return false;
            harflerKopya.splice(idx, 1);
        }
        return true;
    });
}

function kelimeSayisiGoster() {
    const toplam = mevcutHarflerleUygunKelimeler().length;
    const kalan = mevcutHarflerleUygunKelimeler().filter(k => !bulunanKelimeler.includes(k.toLowerCase())).length;
    let info = '';
    if (toplam > 0) {
        info = `Bulabileceğin kelime: ${kalan} / ${toplam}`;
    } else {
        info = 'Bu harflerle kelime yok!';
    }
    let infoDiv = document.getElementById('kelimeInfo');
    if (!infoDiv) {
        infoDiv = document.createElement('div');
        infoDiv.id = 'kelimeInfo';
        infoDiv.style.margin = '10px 0';
        infoDiv.style.color = '#2d545e';
        infoDiv.style.fontWeight = 'bold';
        const wordInput = document.getElementById('wordInput');
        const container = wordInput && wordInput.parentNode;
        if (container && wordInput && Array.from(container.children).includes(wordInput)) {
            container.insertBefore(infoDiv, wordInput);
        }
    }
    if (infoDiv) infoDiv.textContent = info;
}

function zincirModuDegistir() {
    zincirModu = !zincirModu;
    sonKelime = '';
    zincirUzunlugu = 0;
    document.getElementById('zincirModuBtn').textContent = zincirModu ? 'Zincir Modu: AÇIK' : 'Zincir Modu: KAPALI';
    document.getElementById('zincirModuBtn').classList.toggle('active', zincirModu);
    document.getElementById('zincirBilgisi').textContent = zincirModu ? 'Zincir: Başlangıç' : '';
    oyunBaslat();
}

function zorlukDegistir(yeniZorluk) {
    mevcutZorluk = yeniZorluk;
    document.getElementById('zorlukBilgisi').textContent = `Zorluk: ${mevcutZorluk.toUpperCase()}`;
    oyunBaslat();
}

function kelimeKontrol(kelime) {
    if (kelime.length < 3) {
        return { gecerli: false, mesaj: 'Kelime en az 3 harf olmalıdır!' };
    }
    
    if (bulunanKelimeler.includes(kelime)) {
        return { gecerli: false, mesaj: 'Bu kelimeyi zaten buldun!' };
    }
    
    if (!kelimeler.includes(kelime)) {
        return { gecerli: false, mesaj: 'Bu kelime sözlükte yok!' };
    }
    
    if (zincirModu && sonKelime) {
        const sonHarf = sonKelime[sonKelime.length - 1];
        if (!kelime.startsWith(sonHarf)) {
            return { gecerli: false, mesaj: `Kelime "${sonHarf}" harfi ile başlamalı!` };
        }
    }
    
    return { gecerli: true };
}

function zincirBilgisiGuncelle() {
    const zincirBilgisi = document.getElementById('zincirBilgisi');
    if (zincirModu) {
        let text = `Zincir Uzunluğu: ${zincirUzunlugu}`;
        if (sonKelime) {
            const sonHarf = sonKelime[sonKelime.length - 1].toUpperCase();
            text = `Yeni kelime "${sonHarf}" harfiyle başlamalı | Zincir Uzunluğu: ${zincirUzunlugu} | Son Kelime: ${sonKelime}`;
        }
        zincirBilgisi.textContent = text;
        zincirBilgisi.style.textAlign = 'center';
        zincirBilgisi.style.fontWeight = 'bold';
    } else {
        zincirBilgisi.textContent = '';
    }
}

function zincirIlerleVeyaBitir() {
    if (zincirModu && sonKelime) {
        const sonHarf = sonKelime[sonKelime.length - 1].toLowerCase();
        const uygunKelimeler = kelimeler.filter(kelime => {
            if (bulunanKelimeler.includes(kelime.toLowerCase())) return false;
            if (!kelime.toLowerCase().startsWith(sonHarf)) return false;
            let harflerKopya = [...mevcutHarfler.map(h => h.toLowerCase())];
            for (let harf of kelime.toLowerCase()) {
                const idx = harflerKopya.indexOf(harf);
                if (idx === -1) return false;
                harflerKopya.splice(idx, 1);
            }
            return true;
        });
        if (uygunKelimeler.length === 0) {
            mesajGoster('Türetilecek kelime kalmadı!', false);
            return false;
        }
    }
    return true;
}

function kelimeGonder() {
    const kelime = document.getElementById('wordInput').value.trim();
    if (kelime.length < 2) {
        mesajGoster('En az 2 harfli bir kelime girin.', false);
        return;
    }
    if (bulunanKelimeler.includes(kelime.toLowerCase())) {
        mesajGoster('Bu kelimeyi zaten buldunuz!', false);
        document.getElementById('wordInput').value = '';
        return;
    }
    if (kelimeGecerliMi(kelime)) {
        let kazanilanPuan = kelime.length * 10 * zorlukSeviyeleri[mevcutZorluk].puanCarpani;
        if (zincirModu) {
            if (sonKelime && kelime[0].toLowerCase() !== sonKelime[sonKelime.length - 1].toLowerCase()) {
                mesajGoster('Zincir modunda kelime son harfle başlamalı!', false);
                document.getElementById('wordInput').value = '';
                return;
            }
            zincirUzunlugu++;
            kazanilanPuan *= (1 + (zincirUzunlugu * 0.1)); // Her kelime için %10 bonus
            sonKelime = kelime;
            zincirBilgisiGuncelle();
        }
        puan += Math.floor(kazanilanPuan);
        puanGuncelle();
        mesajGoster(`Tebrikler! ${Math.floor(kazanilanPuan)} puan kazandınız!`);
        cicekBuyut();
        bulunanKelimeler.push(kelime.toLowerCase());
        kelimeSayisiGoster();
        if (!zincirIlerleVeyaBitir()) return;
        const kalanKelimeler = mevcutHarflerleUygunKelimeler().filter(k => !bulunanKelimeler.includes(k.toLowerCase()));
        if (kalanKelimeler.length === 0) {
            setTimeout(() => {
                if (zincirModu) {
                    mesajGoster(`Zincir tamamlandı! ${zincirUzunlugu} kelime buldunuz!`);
                } else {
                    mesajGoster('Tüm kelimeleri buldunuz! Yeni harfler geliyor...');
                }
                oyunBaslat();
            }, 1000);
        }
    } else {
        mesajGoster('Geçersiz kelime!', false);
    }
    document.getElementById('wordInput').value = '';
}

fetch('kelimeler.json')
    .then(response => {
        if (!response.ok) throw new Error('Kelimeler dosyası yüklenemedi!');
        return response.json();
    })
    .then(data => {
        kelimeler = data;
        oyunBaslat();
    })
    .catch(err => {
        mevcutHarfler = [];
        harfleriGoster();
        mesajGoster('Kelimeler yüklenemedi!', false);
    });

const hintBtn = document.getElementById('hintBtn');
hintBtn.onclick = () => {
    if (zincirModu) return;
    const uygunKelimeler = kelimeler.filter(kelime => {
        if (bulunanKelimeler.includes(kelime.toLowerCase())) return false;
        let harflerKopya = [...mevcutHarfler.map(h => h.toLowerCase())];
        for (let harf of kelime.toLowerCase()) {
            const idx = harflerKopya.indexOf(harf);
            if (idx === -1) return false;
            harflerKopya.splice(idx, 1);
        }
        return true;
    });
    if (uygunKelimeler.length > 0) {
        const secilenKelime = uygunKelimeler[Math.floor(Math.random() * uygunKelimeler.length)];
        const ipucu = secilenKelime[0] + '*'.repeat(secilenKelime.length - 1);
        mesajGoster('İpucu: ' + ipucu);
    } else {
        mesajGoster('İpucu bulunamadı.', false);
    }
};

document.getElementById('restartBtn').onclick = () => {
    oyunBaslat();
};

function yarismaModuBaslat() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    quizScore = 0;
    quizCurrent = 0;
    quizUsedQuestions = [];
    // Soru havuzu yüklendiyse hemen başlat, yoksa fetch et
    if (quizPool.length > 0) {
        yarismaSoruBaslat();
    } else {
        fetch('soru_havuzu_3000.json')
            .then(r => r.json())
            .then(data => {
                quizPool = data;
                yarismaSoruBaslat();
            })
            .catch(() => {
                document.getElementById('quizQuestion').textContent = 'Soru havuzu yüklenemedi!';
                document.getElementById('quizControls').style.display = 'none';
            });
    }
}

function yarismaSoruBaslat() {
    // Her yarışmada rastgele 10 farklı soru seç
    quizOrder = [];
    let indices = Array.from({length: quizPool.length}, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    quizOrder = indices.slice(0, quizTotalQuestions);
    quizCurrent = 0;
    quizTimeLeft = 180;
    yarismaSoruYukle();
    yarismaTimerBaslat();
}

function yarismaSoruYukle() {
    if (quizCurrent >= quizOrder.length) {
        yarismaYarismayiBitir();
        return;
    }
    const q = quizPool[quizOrder[quizCurrent]];
    document.getElementById('quizQuestion').textContent = q.soru;
    quizRevealed = Array(q.cevap.length).fill(false);
    yarismaKutulariGoster();
    document.getElementById('quizControls').style.display = '';
    document.getElementById('quizInfo').textContent = '';
    document.getElementById('quizGuessInput').value = '';
    document.getElementById('quizScore').textContent = `Puan: ${quizScore}`;
    document.getElementById('quizTimer').textContent = `Süre: ${quizTimeLeft} sn`;
}

function yarismaKutulariGoster() {
    const q = quizPool[quizOrder[quizCurrent]];
    let html = '';
    for (let i = 0; i < q.cevap.length; i++) {
        html += `<span class="harf-kutu" style="display:inline-block;width:36px;height:36px;border:2px solid #b8e0d2;border-radius:6px;margin:2px;font-size:1.5em;line-height:36px;background:#f8f9fa;">${quizRevealed[i] ? q.cevap[i].toUpperCase() : ''}</span>`;
    }
    document.getElementById('quizLetters').innerHTML = html;
}

function yarismaHarfAc() {
    const q = quizPool[quizOrder[quizCurrent]];
    // Açılmamış harfleri bul
    const kapali = quizRevealed.map((v, i) => v ? null : i).filter(i => i !== null);
    if (kapali.length === 0) return;
    const acilacak = kapali[Math.floor(Math.random() * kapali.length)];
    quizRevealed[acilacak] = true;
    yarismaKutulariGoster();
    // Eğer tüm harfler açıldıysa ve doğru tahmin yapılmadıysa, 2 sn sonra otomatik geç
    if (quizRevealed.every(x => x)) {
        document.getElementById('quizInfo').textContent = 'Tüm harfler açıldı! Doğru tahmin gelmedi.';
        setTimeout(() => {
            quizCurrent++;
            yarismaSoruYukle();
        }, 2000);
    }
}

function yarismaTahminEt() {
    const q = quizPool[quizOrder[quizCurrent]];
    const tahmin = document.getElementById('quizGuessInput').value.trim().toLowerCase();
    if (tahmin === q.cevap.toLowerCase()) {
        // Puan hesapla: harf sayısı - açılan harf sayısı
        const toplamHarf = q.cevap.length;
        const acilanHarf = quizRevealed.filter(x => x).length;
        const puan = Math.max(1, toplamHarf - acilanHarf);
        quizScore += puan;
        // Tüm harfleri aç
        quizRevealed = Array(q.cevap.length).fill(true);
        yarismaKutulariGoster();
        document.getElementById('quizInfo').textContent = `Doğru! (+${puan} puan)`;
        setTimeout(() => {
            quizCurrent++;
            yarismaSoruYukle();
        }, 900);
    } else {
        document.getElementById('quizInfo').textContent = 'Yanlış tahmin!';
    }
    document.getElementById('quizScore').textContent = `Puan: ${quizScore}`;
}

function yarismaTimerBaslat() {
    clearInterval(quizTimer);
    document.getElementById('quizTimer').textContent = `Süre: ${quizTimeLeft} sn`;
    quizTimer = setInterval(() => {
        quizTimeLeft--;
        document.getElementById('quizTimer').textContent = `Süre: ${quizTimeLeft} sn`;
        if (quizTimeLeft <= 0) {
            clearInterval(quizTimer);
            yarismaYarismayiBitir();
        }
    }, 1000);
}

function yarismaYarismayiBitir() {
    clearInterval(quizTimer);
    document.getElementById('quizControls').style.display = 'none';
    document.getElementById('quizLetters').innerHTML = '';
    document.getElementById('quizQuestion').textContent = 'Yarışma Bitti!';
    document.getElementById('quizTimer').textContent = '';
    document.getElementById('quizInfo').textContent = '';
    document.getElementById('quizScore').textContent = `Toplam Puan: ${quizScore}`;
    // İsim sor ve skor kaydet
    setTimeout(() => {
        let isim = prompt('Yarışma bitti! İsminizi girin (skor tablosuna kaydedilecek):', '');
        if (!isim) isim = 'İsimsiz';
        yarismaSkorKaydet(isim, quizScore);
        yarismaSkorTablosuGoster();
    }, 500);
}

function yarismaSkorKaydet(isim, skor) {
    let skorlar = JSON.parse(localStorage.getItem('quizHighScores') || '[]');
    skorlar.push({ isim, skor, tarih: new Date().toLocaleString() });
    skorlar = skorlar.sort((a, b) => b.skor - a.skor).slice(0, 10); // En iyi 10 skor
    localStorage.setItem('quizHighScores', JSON.stringify(skorlar));
}

function yarismaSkorTablosuGoster() {
    let skorlar = JSON.parse(localStorage.getItem('quizHighScores') || '[]');
    let html = '<h2>Yüksek Skorlar</h2><table style="margin:0 auto; border-collapse:collapse;">';
    html += '<tr><th style="padding:4px 12px;">Sıra</th><th style="padding:4px 12px;">İsim</th><th style="padding:4px 12px;">Puan</th><th style="padding:4px 12px;">Tarih</th></tr>';
    skorlar.forEach((s, i) => {
        html += `<tr><td style="padding:4px 12px;">${i+1}</td><td style="padding:4px 12px;">${s.isim}</td><td style="padding:4px 12px;">${s.skor}</td><td style="padding:4px 12px;">${s.tarih}</td></tr>`;
    });
    html += '</table>';
    document.getElementById('quizInfo').innerHTML = html;
}

document.getElementById('quizRevealBtn').onclick = yarismaHarfAc;
document.getElementById('quizGuessBtn').onclick = yarismaTahminEt;
document.getElementById('quizGuessInput').onkeydown = function(e) {
    if (e.key === 'Enter') yarismaTahminEt();
};
document.getElementById('quizMenuBtn').onclick = function() {
    clearInterval(quizTimer);
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
}; 