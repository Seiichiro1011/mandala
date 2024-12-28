/************************************************************
 *  1. 9×9=81個のマスを、行・列がずれないよう「固定配置」する
 ************************************************************/
const gridSize = 9;
const totalCells = gridSize * gridSize; // 81

const grid = document.getElementById("grid");

// まずは通常の順番で .cell を生成
for (let row = 0; row < gridSize; row++) {
  for (let col = 0; col < gridSize; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // このマスが担当する背景画像の位置を計算
    const xPercent = (col * 100) / (gridSize - 1);
    const yPercent = (row * 100) / (gridSize - 1);
    cell.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

    // gridに追加 (HTML上は順番どおり)
    grid.appendChild(cell);
  }
}

/************************************************************
 *  2. 表示(アニメーション開始)の順番だけをランダムにする
 ************************************************************/
// すべての .cell 要素を配列化
const cells = Array.from(document.querySelectorAll('.cell'));

// インデックス 0~80 の配列を作ってシャッフル (Fisher-Yates)
const indices = cells.map((_, i) => i);
for (let i = indices.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [indices[i], indices[j]] = [indices[j], indices[i]];
}

// ランダムに並んだ indices の順で、animation-delay を設定
indices.forEach((cellIndex, order) => {
  const delaySec = order * 0.25; // 遅延を0.25秒ずつずらす
  cells[cellIndex].style.animationDelay = `${delaySec}s`;
});
