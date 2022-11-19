const canvas = document.getElementById("myCanvas");
//getElementで、idとなるmyCanvasを取ってくる。
const ctx = canvas.getContext("2d");
//2Dで描く時のコード（内容は理解できていない）

let ballColor = "green";
let paddleColor = "green";
let brickColor = "green";

const ballRadius = 10;
//円の半径が10px
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;
//パドルの高さと幅を定義しているところ　※constで後々大丈夫か確認
//キャンバスの幅から、パドルの幅を引いて割る２する。

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
//ブロックの定義をするところ

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

//カーソルが左右に動く処理
function keyDownHandler(e) {
    if(e.key  == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key ==  'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key  == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

   //［ ボールを定義している部分 ］
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2,);
    //円の中心のx座標、y座標、円の半径、開始角度、終了角度、時計回りはfalse
    ctx.fillStyle = ballColor;
    //色を決めているところ
    ctx.fill();
    ctx.closePath();
}

    //［ バーを定義している部分 ］
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight,paddleWidth,paddleHeight);
    //
    ctx.fillStyle = paddleColor;
    //色を決めているところ
    ctx.fill();
    ctx.closePath();
}

　//ブロックの定義をするところ
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //［ 円の動きを定義しているところ ］
    drawBall();
    drawPaddle();

    if(x + dx > canvas.width-ballRadius || x+dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy  = -dy;
    }
   //上端（=0）より小さかったから、dy反転させる。
　//下端（キャンバス480px）より小さかったから、dy反転させる。
　//ballRadius以下とすることで、衝突判定を円の半径にする
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
//ボールの中心が下についたらアウトの判定
    
    if (rightPressed && paddleX <canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX >0) {
        paddleX -= 7;
   }
　//⇒カーソルを押すと7px移動する。増やすと早くなる。

    x += dx;
    //+=はxにdxを足した値をxに代入する意味
    y += dy;
    //+=はyにdyを足した値をxに代入する意味
}
const interval = setInterval(draw, 10);
//10ミリ秒ごとに描く


function ChangeNatural(){
    document.bgColor = '#DFD3C2';
    ballColor = '#C69468';
    paddleColor = '#CCB28B';
    brickColor = '#CCB28B';
}
//ボタンを押して背景色を変える処理
function ChangeRed(){
    document.bgColor = '#E36255';
    ballColor = '#E36255';
    paddleColor = '#F1E0CE';
    brickColor = '#F1E0CE';
}
//ボタンを押して色を変える処理
function ChangeBlue(){
    document.bgColor = '#9AC1F0';
    ballColor = '#9AC1F0';
    paddleColor = '#45496A';
    brickColor = '#45496A';
}
//ボタンを押して色を変える処理



























//［最初の練習用］
// //［四角形］
// ctx.beginPath();
// ctx.rect(20,40,50,50);
// //画面の左端から20px、上段から40px、幅50px、高さ50px
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// //図形の内側の色を決める
// ctx.closePath();

// //［ 円 ］
// ctx.beginPath();
// ctx.arc(20,160,20,0,Math.PI*2,false);
// //円の中心のx座標、y座標、円の半径、開始角度、終了角度、時計回りはfalse
// ctx.fillStyle="green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

