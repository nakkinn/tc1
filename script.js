let img1, img2;

let p = [];
let recw = 480, rech = 320;
let select = -1;

let col;

function preload(){
    img1 = loadImage('S__39886850.jpg');
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    img1.resize(480, 320);
    img2 = createImage(480, 320);

    col = new Array(img1.width);
    for(let i=0; i<img1.width; i++)    col[i] = new Array(img1.height);

    p[0] = new p5.Vector(30, 30);
    p[1] = new p5.Vector(450, 30);
    p[2] = new p5.Vector(450, 290);
    p[3] = new p5.Vector(30, 290);

    henkan();

}

function draw(){
    background(230);

    image(img1, 0, 0);

    fill(255, 0, 0);
    noStroke();

    circle(p[0].x, p[0].y, 10);
    circle(p[1].x, p[1].y, 10);
    circle(p[2].x, p[2].y, 10);
    circle(p[3].x, p[3].y, 10);

    stroke(255, 0, 0);
    line(p[0].x, p[0].y, p[1].x, p[1].y);
    line(p[1].x, p[1].y, p[2].x, p[2].y);
    line(p[2].x, p[2].y, p[3].x, p[3].y);
    line(p[3].x, p[3].y, p[0].x, p[0].y);

    translate(500, 0);

    image(img2, 0, 0);

    if(select>=0){
        p[select].x = constrain(mouseX, 0, recw);
        p[select].y = constrain(mouseY, 0, rech);
    }
}


function mousePressed(){
    for(let i=0; i<4; i++){
        if(dist(mouseX, mouseY, p[i].x, p[i].y)<20){
            select = i;
            break;
        }
    }
}

function mouseReleased(){
    select = -1;
    henkan();
}

function henkan(){
    let x0, x1;
    for(let i=0; i<recw; i++)   for(let j=0; j<rech; j++){
        if(j/i < rech/recw){
            x0 = (rech*i-recw*j)/(recw*rech);
            x1 = (recw*j)/(recw*rech);
            col[i][j] = img1.get(p[0].x+(p[1].x-p[0].x)*x0+(p[2].x-p[0].x)*x1, p[0].y+(p[1].y-p[0].y)*x0+(p[2].y-p[0].y)*x1);
        }else{
            x0 = (rech*i-recw*j)/(-rech*recw);
            x1 = (-rech*i)/(-rech*recw);
            col[i][j] = img1.get(p[0].x+(p[3].x-p[0].x)*x0+(p[2].x-p[0].x)*x1, p[0].y+(p[3].y-p[0].y)*x0+(p[2].y-p[0].y)*x1);
        }
    }

    img2.loadPixels();
    for(let i=0; i<img2.width; i++) for(let j=0; j<img2.height; j++){
        img2.pixels [i*4+j*4*img2.width] = col[i][j][0];       
        img2.pixels [i*4+j*4*img2.width+1] = col[i][j][1];
        img2.pixels [i*4+j*4*img2.width+2] = col[i][j][2]; 
        img2.pixels [i*4+j*4*img2.width+3] = 255;
    }
    img2.updatePixels();
}