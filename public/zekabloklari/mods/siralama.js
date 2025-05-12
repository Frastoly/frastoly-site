export function startSiralama() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = `
        <h2>Sıralama Blokları</h2>
        <p>Blokları doğru sıraya sürükleyip bırak!</p>
        <div id="block-container" style="display:flex;justify-content:center;gap:12px;margin:32px 0;"></div>
        <button id="checkOrderBtn">Sıralamayı Kontrol Et</button>
        <div id="result" style="margin-top:20px;font-size:1.2em;"></div>
    `;

    // Karışık bloklar (örnek: 1-5)
    let blocks = [1,2,3,4,5];
    blocks = shuffle(blocks);

    const container = document.getElementById('block-container');
    blocks.forEach(num => {
        const div = document.createElement('div');
        div.className = 'block';
        div.draggable = true;
        div.textContent = num;
        div.style.cssText = `
            width: 48px; height: 48px; background: #6c47e6; color: #fff; display: flex;
            align-items: center; justify-content: center; border-radius: 8px; font-size: 1.3em;
            cursor: grab; user-select: none; box-shadow: 0 2px 8px #0003;
        `;
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        container.appendChild(div);
    });

    let dragSrc = null;
    function dragStart(e) {
        dragSrc = this;
        e.dataTransfer.effectAllowed = 'move';
    }
    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    function drop(e) {
        e.preventDefault();
        if (dragSrc !== this) {
            // Swap the text content
            const tmp = this.textContent;
            this.textContent = dragSrc.textContent;
            dragSrc.textContent = tmp;
        }
    }

    document.getElementById('checkOrderBtn').onclick = () => {
        const current = Array.from(container.children).map(div => Number(div.textContent));
        const correct = [1,2,3,4,5];
        const resultDiv = document.getElementById('result');
        if (JSON.stringify(current) === JSON.stringify(correct)) {
            resultDiv.textContent = 'Tebrikler! Doğru sıraladın 🎉';
            resultDiv.style.color = '#4be04b';
        } else {
            resultDiv.textContent = 'Yanlış sıralama, tekrar dene.';
            resultDiv.style.color = '#ff5e5e';
        }
    };
}

function shuffle(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
} 