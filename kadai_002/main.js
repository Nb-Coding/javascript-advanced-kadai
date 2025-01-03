// 変数の初期化
let untyped = '';
let typed ='';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typefield = document.getElementById('typed');
const wrap =document.getElementById('wrap');
const start = document.getElementById('start');
const successScore = document.getElementById('success-score');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'I am Japanese','Let it be','Samurai',  
    'Just keep going','Believe in yourself','And still I rise','Better late than never',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming','moon prism power makeup!'
];

// ランダムなテキストを表示
const createText = () => {
    typed = '';
    typefield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let randomNumber = Math.floor(Math.random() * textLists.length);
    untyped = textLists[randomNumber];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    //誤タイプの場合
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        setTimeout(()=>{
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }

    // 正タイプの場合
    score++;
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typefield.textContent = typed;
    untypedfield.textContent = untyped;
    successScore.textContent = score;

    // テキストがなくなったら新しいテキストを表示
    if (untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';

    if (score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200){
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    }else if (score < 300){
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    }else if (score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//ゲームを終了
const gameOver = id => {
    untypedfield.textContent= 'タイムアップ！';
    clearInterval(id);

    setTimeout(() => {
        const result =confirm(rankCheck(score))
        // OKボタンをクリックされたらリロードする
        if (result == true) {
        window.location.reload();
        }
    },10);
};

//カウントダウンタイマー
const timer = () => {
    let time = count.textContent;

    const id = setInterval(() => {
        time-=60;
        count.textContent= time;

        // カウントが0になったらタイマーを停止する
        if (time <= 0) {
            gameOver(id);
        }
    }, 1000); 
};

// ゲームスタート時の処理
start.addEventListener('click',() =>{
    //  カウントダウンタイマーを開始する
    timer();
    // ランダムなテキストを表示
    createText();
    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';
    // キーボードのイベント処理
    document.addEventListener('keypress',keyPress);
});

untypedfield.textContent ='スタートボタンで開始';
