// JSの書き方が全然分からん

// 状態変数をグローバルで定義
let modeStatus = "clock", fontStatus = "font-GrechenFuemen";
const mode = document.getElementById("mode");
const font = document.getElementById("font");
const now = document.getElementById("now");
const settings = document.getElementById("settings");
const footer = document.getElementById("footer");
let mainSwitch = true;
let intervalTimer = setInterval("update()", 1000); // mainSwitchがONの間，1000ms毎に関数をcallする


// ページ読み込み時に初期化．ちなみに，
// window.onload = function init() {...}
// としても同じ動作
// また，無名関数：function() {} にしても良い
window.addEventListener("load", function init() {
    if (window.innerWidth < 700) {
        alert(`少し横幅が狭いですね\nPCなら全画面 / スマホなら横向きにすることをお勧めします`);
    }

    settings.style.visibility = "hidden";

    // 現在のmode/font設定を表示
    mode.textContent = `mode:${modeStatus}`;
    font.textContent = fontStatus;

    // 日付を更新
    const DateInfo = new Date();
    const year = DateInfo.getFullYear();
    const month = alignTwoDigits(DateInfo.getMonth() + 1);
    const date = alignTwoDigits(DateInfo.getDate());
    const int2day = [
        ['日', '月', '火', '水', '木', '金', '土'],
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    ];
    const day = int2day[0][DateInfo.getDay()];
    now.textContent = `${year}/${month}/${date}(${day})`;
});
function alignTwoDigits(number) {
    if (number < 10) return "0" + number;
    else return number;
}


// modeに応じて表示する値を更新
function update() {
    const mainContent = document.getElementById(fontStatus);
    if (modeStatus === "clock") {
        const DateInfo = new Date();
        mainContent.innerText = DateInfo.toLocaleTimeString();
    } else if (modeStatus === "stopwatch") {
        mainContent.innerText = "comming soon..."
        // } else if (modeStatus === "timer") {
        //     mainContent.innerText = "comming soon..."
    } else {
        mainContent.innerHTML = "<font color='red'>unsupported feature</font>";
    }
}


// ボタンクリック時にhtml側からonclickで以下の関数を呼び出す
// 1. 設定項目の表示/非表示を切り替え
function switchSettingsVisibility() {
    if (settings.style.visibility === "visible") settings.style.visibility = "hidden";
    else settings.style.visibility = "visible";
}
// 2. mode切り替え
function updateMode(nextMode) {
    settings.style.visibility = "hidden";
    if (typeof nextMode !== "string") {
        console.log(typeof nextMode, nextMode);
        return;
    }
    modeStatus = nextMode;
    mode.textContent = `mode:${modeStatus}`;
    console.log(`next mode: ${nextMode}`);
}
// 3. fontを切り替え
function updateFont(nextFont) {
    settings.style.visibility = "hidden";
    if (typeof nextFont !== "string") {
        console.log(typeof nextFont, nextFont);
        return;
    }
    document.getElementById(fontStatus).innerText = "";
    fontStatus = nextFont;
    font.textContent = nextFont;
    console.log(`next font: ${nextFont}`);
}


// 現在時刻をクリックで一時停止 / 一時停止中のみfooterを表示
document.getElementById("mainSwitch").addEventListener("click", function () {
    if (mainSwitch) {
        clearInterval(intervalTimer);
        footer.style.visibility = "visible";
        console.log("switch off");
    } else {
        intervalTimer = setInterval("update()", 1000);
        footer.style.visibility = "hidden";
        console.log("switch on");
    }
    mainSwitch = !mainSwitch;
})
