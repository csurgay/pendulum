let canvas, ctx, paramsArray, ps=[], runAnim=true, showRods=false, showParams=false, showSerial=false, slowAnim=false;

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
    let ind=0;
    paramsAllArray.forEach( row => paramsArray.push( [ind++, ...row] ) );
    params2Array.forEach( row => paramsArray.push( [ ind++, 2, [0,0], [row[0],row[1],0,,0,0,0,0,], [row[2],row[3],0,0,0,0,0], row[4] ] ));
    params3Array.forEach( row => paramsArray.push( [ ind++, 3, [0,0,0], [row[0],row[1],row[2],0,0,0,0,], [row[3],row[4],row[5],0,0,0,0], row[6] ] ));

    create8pendulums();
    get8pendulums();
}

console.log("Started...");
init();
animate();