export function startDesen() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = `
        <h2>Desen Takip</h2>
        <p>Deseni dikkatlice izle, sonra aynısını oluştur!</p>
        <div id="pattern-area" style="display:flex;justify-content:center;gap:12px;margin:24px 0;"></div>
        <button id="showPatternBtn">Deseni Göster</button>
        <div id="user-area" style="display:flex;justify-content:center;gap:12px;margin:24px 0;"></div>
        <button id="checkPatternBtn" disabled>Kontrol Et</button>
        <div id="patternResult" style="margin-top:20px;font-size:1.2em;"></div>
    `;

    // 4 bloklu rastgele desen (1-4 arası sayılar)
    let pattern = Array.from({length: 4}, () => Math.floor(Math.random() * 4) + 1);
    let userInput = [];

    const patternArea = document.getElementById('pattern-area');
    const userArea = document.getElementById('user-area');
    const showBtn = document.getElementById('showPatternBtn');
    const checkBtn = document.getElementById('checkPatternBtn');
    const resultDiv = document.getElementById('patternResult');

    function renderPattern(show) {
        patternArea.innerHTML = '';
        pattern.forEach(num => {
            const div = document.createElement('div');
            div.className = 'pattern-block';
            div.textContent = show ? num : '?';
            div.style.cssText = `
                width: 48px; height: 48px; background: #6c47e6; color: #fff; display: flex;
                align-items: center; justify-content: center; border-radius: 8px; font-size: 1.3em;
                user-select: none; box-shadow: 0 2px 8px #0003;
            `;
            patternArea.appendChild(div);
        });
    }

    function renderUserInput() {
        userArea.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const div = document.createElement('div');
            div.className = 'user-block';
            div.textContent = userInput[i] || '';
            div.style.cssText = `
                width: 48px; height: 48px; background: #3a3f5a; color: #fff; display: flex;
                align-items: center; justify-content: center; border-radius: 8px; font-size: 1.3em;
                cursor: pointer; user-select: none; border: 2px solid #232b3e;
            `;
            div.onclick = () => {
                let val = Number(div.textContent) || 0;
                val = (val % 4) + 1;
                div.textContent = val;
                userInput[i] = val;
            };
            userArea.appendChild(div);
        }
    }

    showBtn.onclick = () => {
        renderPattern(true);
        showBtn.disabled = true;
        setTimeout(() => {
            renderPattern(false);
            renderUserInput();
            checkBtn.disabled = false;
        }, 1500);
    };

    checkBtn.onclick = () => {
        if (userInput.length < 4 || userInput.some(v => !v)) {
            resultDiv.textContent = 'Tüm blokları doldurmalısın!';
            resultDiv.style.color = '#ff5e5e';
            return;
        }
        if (JSON.stringify(userInput) === JSON.stringify(pattern)) {
            resultDiv.textContent = 'Tebrikler! Deseni doğru oluşturdun 🎉';
            resultDiv.style.color = '#4be04b';
        } else {
            resultDiv.textContent = 'Yanlış desen, tekrar dene.';
            resultDiv.style.color = '#ff5e5e';
        }
    };

    // İlk başta sadece desen göster butonu aktif
    renderPattern(false);
    renderUserInput();
    checkBtn.disabled = true;
} 