var cvs = document.getElementById("breakout");
var ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "1px solid #0ff";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

function drawRect(posX, posY) {
    ctx.fillStyle = "blue";
    ctx.fillRect(posX, posY, 50, 50);
}

function loop(y){
    //clear the canvas
    ctx.drawImage(BG_IMG, 0, 0);
    //draw();
    //update();
    requestAnimationFrame(loop);

}

loop(100);