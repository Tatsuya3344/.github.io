// --- 1. サービス診断の機能 ---
function nextStep(currentId, nextId) {
    document.getElementById(currentId).style.display = 'none';
    document.getElementById(nextId).style.display = 'block';
}

function showResult(type) {
    document.querySelectorAll('.q-box').forEach(el => el.style.display = 'none');
    const resultBox = document.getElementById('diagnosis-result');
    const resultText = document.getElementById('result-text');
    
    // 1. 診断結果のテキストを設定
    let planName = "";
    if (type === 'result-bodyguard') {
        planName = "身辺警護プラン";
        resultText.innerText = `あなたには【${planName}】が最適です。熟練のエージェントが24時間体制で守ります。`;
    } else if (type === 'result-driver') {
        planName = "専属ドライバープラン";
        resultText.innerText = `あなたには【${planName}】が最適です。最高級の車両と正確な運行を提供します。`;
    } else {
        planName = "コンシェルジュ執事";
        resultText.innerText = `あなたには【${planName}】が最適です。あらゆる手配とサポートを代行します。`;
    }

    // 2. お問い合わせページへのリンクボタンを動的に作成（または表示）
    // すでにボタンがある場合は削除して作り直す（重複防止）
    const oldBtn = document.getElementById('contact-link-btn');
    if (oldBtn) oldBtn.remove();

    const contactBtn = document.createElement('a');
    contactBtn.id = 'contact-link-btn';
    contactBtn.href = `contact.html?plan=${encodeURIComponent(planName)}`; // ★プラン名をURLにのせる
    contactBtn.innerText = `お見積やご相談はこちら`;
    contactBtn.className = 'contact-button'; // CSSでデザインするためのクラス
    
    resultBox.appendChild(contactBtn); // 結果表示エリアにボタンを追加
    resultBox.style.display = 'block';
}

function resetDiagnosis() {
    document.getElementById('diagnosis-result').style.display = 'none';
    document.getElementById('q1').style.display = 'block';
}

// --- 2. アコーディオンを滑らかに動かす機能 ---
document.querySelectorAll('.accordion').forEach(el => {
    const summary = el.querySelector('summary');
    const answer = el.querySelector('.answer');

    summary.addEventListener('click', (e) => {
        // 標準の「パッ」と開く動きを一旦キャンセル
        e.preventDefault();

        if (!el.open) {
            // 【開くとき】
            el.open = true; // detailsタグを開く
            const height = answer.scrollHeight; // 中身の実際の高さを計算
            answer.style.height = height + 40 + 'px'; // 高さ＋余白分を指定
            answer.classList.add('is-open');
        } else {
            // 【閉じるとき】
            answer.style.height = '0px'; // 高さを0に戻す
            answer.classList.remove('is-open');
            // アニメーションが終わるのを待ってから（0.4秒後）、detailsタグを閉じる
            setTimeout(() => { el.open = false; }, 400);
        }
    });
});