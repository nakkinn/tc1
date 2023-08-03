const p1x = 70;
const p1y = 70;
const p2x = 520;
const p2y = 20;
const p3x = 130;
const p3y = 510;
const p4x = 20;
const p4y = 410;

//画像
let imgElement = document.getElementById('imageSrc');
//ファイルボックス
let inputElement = document.getElementById('fileInput');

//ファイルを入れた時の処理
inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    console.log('ファイルが入力されたよ！');
}, false);

imgElement.onload = function() {
    let original = cv.imread(imgElement);
    let mat = new cv.Mat();

    original.copyTo(mat);

    const thickness = 2;

    cv.line(mat, new cv.Point(p1x, p1y), new cv.Point(p2x, p2y), new cv.Scalar(255, 0, 0, 255), thickness);
    cv.line(mat, new cv.Point(p2x, p2y), new cv.Point(p3x, p3y), new cv.Scalar(255, 0, 0, 255), thickness);
    cv.line(mat, new cv.Point(p3x, p3y), new cv.Point(p4x, p4y), new cv.Scalar(255, 0, 0, 255), thickness);
    cv.line(mat, new cv.Point(p4x, p4y), new cv.Point(p1x, p1y), new cv.Scalar(255, 0, 0, 255), thickness);

    cv.circle(mat, new cv.Point(p1x,p1y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);
    cv.circle(mat, new cv.Point(p2x,p2y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);
    cv.circle(mat, new cv.Point(p3x,p3y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);
    cv.circle(mat, new cv.Point(p4x,p4y), 4, new cv.Scalar(255, 0, 0, 255), cv.FILLED);

    const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y]);
    const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [100, 100, 300, 100, 300, 300, 100, 300]);
    const perspectiveMatrix = cv.getPerspectiveTransform(srcPoints, dstPoints);

    let dst = new cv.Mat();
    cv.warpPerspective(original, dst, perspectiveMatrix, new cv.Size(400, 400));

    let rectregion = new cv.Mat();
    let rect = new cv.Rect(100, 100, 200, 200);
    rectregion = dst.roi(rect);

    cv.imshow('canvasOutput1', mat);
    cv.imshow('canvasOutput2', rectregion);

    mat.delete();

};

var Module = {
 // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
    onRuntimeInitialized() {
        document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    }
};

//ページ上をクリック（マウスプレス）したとき座標を出力
document.addEventListener('mousedown',function(event){
    console.log('x ' + event.offsetX + ' y ' + event.offsetY);
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
