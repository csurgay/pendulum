let canvas, ctx, paramsArray, ps=[];

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.translate(0.5,0.5);
    document.addEventListener("keyup",keyup);
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
    paramsArray = [];
    params2Array.forEach( row => paramsArray.push( [ 2, [row[0],row[1],0,,0,0,0,0,], [row[2],row[3],0,0,0,0,0], row[4] ] ));
    params3Array.forEach( row => paramsArray.push( [ 3, [row[0],row[1],row[2],0,0,0,0,], [row[3],row[4],row[5],0,0,0,0], row[6] ] ));

    for (let i=0; i<8; i++) {
        let x=i<4?i:i-4;
        let y=i<4?0:1;
        let d=360;
        ps.push( new Pendulum(x*d+d/2,y*d+d/2,d,3) );
        ps[i].fillParams(paramsArray[i]);
    }
}

// clear screen
function clearScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
//    params.canvasSize = Math.min(canvas.width, canvas.height)-15;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2 - 10;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

console.log("Started...");
init();
animate();