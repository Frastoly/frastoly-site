export function startMantik() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = `
        <h2>Mantık Blokları</h2>
        <p>Her satır ve sütunda 1-4 arası sayılar bir kez olmalı. Hücrelere tıklayarak sayı seç!</p>
        <div id="logic-grid" style="display:grid;grid-template-columns:repeat(4,48px);gap:8px;justify-content:center;margin:32px 0;"></div>
        <button id="checkLogicBtn">Kontrol Et</button>
        <div id="logicResult" style="margin-top:20px;font-size:1.2em;"></div>
    `;

    // 4x4 boş tablo
    const grid = document.getElementById('logic-grid');
    const size = 4;
    let cells = [];
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'logic-cell';
        cell.textContent = '';
        cell.style.cssText = `
            width: 48px; height: 48px; background: #3a3f5a; color: #fff; display: flex;
            align-items: center; justify-content: center; border-radius: 6px; font-size: 1.2em;
            cursor: pointer; user-select: none; border: 2px solid #232b3e;
        `;
        cell.onclick = () => {
            let val = Number(cell.textContent) || 0;
            val = (val % 4) + 1;
            cell.textContent = val;
        };
        grid.appendChild(cell);
        cells.push(cell);
    }

    document.getElementById('checkLogicBtn').onclick = () => {
        const resultDiv = document.getElementById('logicResult');
        let valid = true;
        // Satır ve sütun kontrolü
        for (let i = 0; i < size; i++) {
            let row = new Set();
            let col = new Set();
            for (let j = 0; j < size; j++) {
                let rowVal = Number(cells[i * size + j].textContent);
                let colVal = Number(cells[j * size + i].textContent);
                if (!rowVal || row.has(rowVal)) valid = false;
                if (!colVal || col.has(colVal)) valid = false;
                row.add(rowVal);
                col.add(colVal);
            }
        }
        if (valid) {
            resultDiv.textContent = 'Tebrikler! Doğru doldurdun 🎉';
            resultDiv.style.color = '#4be04b';
        } else {
            resultDiv.textContent = 'Yanlış veya eksik doldurdun, tekrar dene.';
            resultDiv.style.color = '#ff5e5e';
        }
    };
} 