let p1x = 500;
let p1y = 100;
let p2x = 900;
let p2y = 100;
let p3x = 900;
let p3y = 500;
let p4x = 560;
let p4y = 500;

//画像
let imgElement = document.getElementById('imageSrc');
//ファイルボックス
let inputElement = document.getElementById('fileInput');

//ファイルを入れた時の処理
inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

//ファイルを読み込んだ時
imgElement.onload = function() {
    update();
};

function update(){

    let img1 = cv.imread(imgElement);
    let img2 = new cv.Mat();

    img1.copyTo(img2);

    const thickness = 2;

    cv.line(img2, new cv.Point(p1x, p1y), new cv.Point(p2x, p2y), new cv.Scalar(255, 0, 0, 255), thickness);
    cv.line(img2, new cv.Point(p2x, p2y), new cv.Point(p3x, p3y), new cv.Scalar(255, 0, 0, 255), thickness);
    cv.line(img2, new cv.Point(p3x, p3y), new cv.Point(p4x, p4y), new cv.Scalar(255, 0, 0, 255), thickness);
    cv.line(img2, new cv.Point(p4x, p4y), new cv.Point(p1x, p1y), new cv.Scalar(255, 0, 0, 255), thickness);

    cv.circle(img2, new cv.Point(p1x,p1y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);
    cv.circle(img2, new cv.Point(p2x,p2y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);
    cv.circle(img2, new cv.Point(p3x,p3y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);
    cv.circle(img2, new cv.Point(p4x,p4y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);

    const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y]);
    const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 200, 0, 200, 200, 0, 200]);
    const perspectiveMatrix = cv.getPerspectiveTransform(srcPoints, dstPoints);
    const inverseMatrix = cv.getPerspectiveTransform(dstPoints, srcPoints);

    let m11, m12, m13, m21, m22, m23, m31, m32, m33;
    m11 = perspectiveMatrix.data64F[0];
    m12 = perspectiveMatrix.data64F[1];
    m13 = perspectiveMatrix.data64F[2];
    m21 = perspectiveMatrix.data64F[3];
    m22 = perspectiveMatrix.data64F[4];
    m23 = perspectiveMatrix.data64F[5];
    m31 = perspectiveMatrix.data64F[6];
    m32 = perspectiveMatrix.data64F[7];
    m33 = perspectiveMatrix.data64F[8];

    let x0=830, y0=345, x1, y1, z1;
    x1 = m11*x0 + m12*y0 + m13;
    y1 = m21*x0 + m22*y0 + m23;
    z1 = m31*x0 + m32*y0 + m33;

    console.log(x1/z1, y1/z1);

    m11 = inverseMatrix.data64F[0];
    m12 = inverseMatrix.data64F[1];
    m13 = inverseMatrix.data64F[2];
    m21 = inverseMatrix.data64F[3];
    m22 = inverseMatrix.data64F[4];
    m23 = inverseMatrix.data64F[5];
    m31 = inverseMatrix.data64F[6];
    m32 = inverseMatrix.data64F[7];
    m33 = inverseMatrix.data64F[8];

    x0=155, y0=115, x1, y1, z1;
    x1 = m11*x0 + m12*y0 + m13;
    y1 = m21*x0 + m22*y0 + m23;
    z1 = m31*x0 + m32*y0 + m33;

    console.log(x1/z1, y1/z1);

    let tmp = new cv.Mat();
    cv.warpPerspective(img1, tmp, perspectiveMatrix, new cv.Size(400, 400));

    let img3 = new cv.Mat();
    let rect = new cv.Rect(0, 0, 200, 200);
    img3 = tmp.roi(rect);

    cv.circle(img2, new cv.Point(830,345), 10, new cv.Scalar(255, 100, 0, 255), cv.FILLED);
    cv.circle(img3, new cv.Point(155,115), 4, new cv.Scalar(255, 100, 0, 255), cv.FILLED);

    cv.imshow('canvas1', img1);
    cv.imshow('canvas2', img2);
    cv.imshow('canvas3', img3);
    cv.imshow('canvas4', img3);

    img1.delete();
    img2.delete();
    tmp.delete();
    img3.delete();

    
}

var Module = {
 // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
    onRuntimeInitialized() {
        
    }
};

//ページ上をクリック（マウスプレス）したとき座標を出力
document.addEventListener('mousedown',function(event){
    
},false);



let canvas1 = document.getElementById('canvas1');
let canvas2 = document.getElementById('canvas2');

canvas2.addEventListener('mousedown',function(event){
    console.log(event.offsetX, event.offsetY);
    p3x = event.offsetX * canvas1.clientWidth / canvas2.clientWidth;
    p3y = event.offsetY * canvas1.clientWidth / canvas2.clientWidth;
    update();
},false);

/*
//ボタン１イベント
function button1_event(){
    console.log("ボタン１が押された！");
}

//ボタン２イベント
function button2_event(){
    console.log("ボタン２が押された！");
}
*/
