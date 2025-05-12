export function startBirlestir() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = `
        <h2>Blokları Birleştir</h2>
        <p>Aynı sayıları birleştir, en yüksek skoru yap!</p>
        <div id="merge-grid" style="display:grid;grid-template-columns:repeat(4,48px);gap:8px;justify-content:center;margin:32px 0;"></div>
        <div style="margin-bottom:12px;">Yön tuşlarıyla veya aşağıdaki butonlarla oynayabilirsin.</div>
        <div id="merge-controls" style="display:flex;justify-content:center;gap:8px;margin-bottom:16px;">
            <button data-dir="up">⬆️</button>
            <button data-dir="left">⬅️</button>
            <button data-dir="down">⬇️</button>
            <button data-dir="right">➡️</button>
        </div>
        <div id="merge-score" style="font-size:1.1em;margin-bottom:8px;">Skor: 0</div>
        <div id="mergeResult" style="margin-top:12px;font-size:1.1em;"></div>
    `;

    const size = 4;
    let grid = Array(size * size).fill(0);
    let score = 0;

    function addRandomTile() {
        const empty = grid.map((v, i) => v === 0 ? i : -1).filter(i => i !== -1);
        if (empty.length === 0) return;
        const idx = empty[Math.floor(Math.random() * empty.length)];
        grid[idx] = Math.random() < 0.9 ? 2 : 4;
    }

    function renderGrid() {
        const gridDiv = document.getElementById('merge-grid');
        gridDiv.innerHTML = '';
        grid.forEach(val => {
            const div = document.createElement('div');
            div.className = 'merge-cell';
            div.textContent = val === 0 ? '' : val;
            div.style.cssText = `
                width: 48px; height: 48px; background: ${val ? '#6c47e6' : '#3a3f5a'}; color: #fff; display: flex;
                align-items: center; justify-content: center; border-radius: 8px; font-size: 1.2em;
                user-select: none; box-shadow: 0 2px 8px #0003;
                font-weight: bold;
            `;
            gridDiv.appendChild(div);
        });
        document.getElementById('merge-score').textContent = `Skor: ${score}`;
    }

    function move(dir) {
        let moved = false;
        let merged = Array(size * size).fill(false);
        function index(r, c) { return r * size + c; }
        function slideRow(row) {
            let arr = row.filter(x => x);
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] === arr[i+1]) {
                    arr[i] *= 2;
                    score += arr[i];
                    arr[i+1] = 0;
                }
            }
            arr = arr.filter(x => x);
            while (arr.length < size) arr.push(0);
            return arr;
        }
        if (dir === 'left') {
            for (let r = 0; r < size; r++) {
                const row = grid.slice(r*size, (r+1)*size);
                const newRow = slideRow(row);
                for (let c = 0; c < size; c++) {
                    if (grid[index(r,c)] !== newRow[c]) moved = true;
                    grid[index(r,c)] = newRow[c];
                }
            }
        } else if (dir === 'right') {
            for (let r = 0; r < size; r++) {
                const row = grid.slice(r*size, (r+1)*size).reverse();
                const newRow = slideRow(row).reverse();
                for (let c = 0; c < size; c++) {
                    if (grid[index(r,c)] !== newRow[c]) moved = true;
                    grid[index(r,c)] = newRow[c];
                }
            }
        } else if (dir === 'up') {
            for (let c = 0; c < size; c++) {
                const col = [];
                for (let r = 0; r < size; r++) col.push(grid[index(r,c)]);
                const newCol = slideRow(col);
                for (let r = 0; r < size; r++) {
                    if (grid[index(r,c)] !== newCol[r]) moved = true;
                    grid[index(r,c)] = newCol[r];
                }
            }
        } else if (dir === 'down') {
            for (let c = 0; c < size; c++) {
                const col = [];
                for (let r = 0; r < size; r++) col.push(grid[index(r,c)]);
                const newCol = slideRow(col.reverse()).reverse();
                for (let r = 0; r < size; r++) {
                    if (grid[index(r,c)] !== newCol[r]) moved = true;
                    grid[index(r,c)] = newCol[r];
                }
            }
        }
        if (moved) addRandomTile();
        renderGrid();
        checkGameOver();
    }

    function checkGameOver() {
        const resultDiv = document.getElementById('mergeResult');
        if (grid.some(v => v === 2048)) {
            resultDiv.textContent = 'Tebrikler! 2048 yaptın 🎉';
            resultDiv.style.color = '#4be04b';
        } else if (!grid.includes(0)) {
            // Hamle var mı kontrolü
            let canMove = false;
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    let v = grid[r*size+c];
                    if ((c < size-1 && v === grid[r*size+c+1]) || (r < size-1 && v === grid[(r+1)*size+c])) {
                        canMove = true;
                    }
                }
            }
            if (!canMove) {
                resultDiv.textContent = 'Oyun bitti! Skorun: ' + score;
                resultDiv.style.color = '#ff5e5e';
            }
        } else {
            resultDiv.textContent = '';
        }
    }

    // Başlangıçta iki blok
    addRandomTile();
    addRandomTile();
    renderGrid();

    // Butonlar
    document.querySelectorAll('#merge-controls button').forEach(btn => {
        btn.onclick = () => move(btn.dataset.dir);
    });

    // Klavye ile oynama
    window.onkeydown = (e) => {
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
            const dir = {ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}[e.key];
            move(dir);
        }
    };
} 