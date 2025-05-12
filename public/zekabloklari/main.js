function selectMode(mode) {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '<p>Yükleniyor...</p>';
    
    // Modül dosyasını dinamik olarak yükle
    switch(mode) {
        case 'siralama':
            importModule('./mods/siralama.js', 'Sıralama Blokları', 'startSiralama');
            break;
        case 'mantik':
            importModule('./mods/mantik.js', 'Mantık Blokları', 'startMantik');
            break;
        case 'desen':
            importModule('./mods/desen.js', 'Desen Takip', 'startDesen');
            break;
        case 'birlestir':
            importModule('./mods/birlestir.js', 'Blokları Birleştir', 'startBirlestir');
            break;
        default:
            gameDiv.innerHTML = '<p>Mod bulunamadı.</p>';
    }
}

function importModule(path, title, funcName) {
    import(path)
        .then(mod => {
            if (mod[funcName]) {
                mod[funcName]();
            } else {
                document.getElementById('game').innerHTML = `<h2>${title}</h2><p>Mod fonksiyonu bulunamadı!</p>`;
            }
        })
        .catch(() => {
            document.getElementById('game').innerHTML = `<h2>${title}</h2><p>Mod yüklenemedi!</p>`;
        });
} 