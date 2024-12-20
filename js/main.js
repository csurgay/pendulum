let canvas, ctx, paramsArray, ps=[], runAnim=true, showRods=false, showParams=false, showSerial=false, 
    slowAnim=false, urlString, urlParams, color='random', lineWidth=0.4, opacity=1, mode="1",
    timeout=7000, time=Date.now();
let colors=["red","green","blue","orange","white", "red", "white", "orange"];

function init() {
    urlString = window.location.search;
    urlParams = new URLSearchParams(urlString);
    if (urlParams.has('color')) color=urlParams.get('color');
    if (urlParams.has('lineWidth')) lineWidth=urlParams.get('lineWidth');
    if (urlParams.has('opacity')) opacity=urlParams.get('opacity');
    if (urlParams.has('mode')) mode=urlParams.get('mode');
    if (urlParams.has('timeout')) timeout=urlParams.get('timeout');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.translate(0.5,0.5);
    clearScreen();
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

    creatependulums();
    getpendulums();
}

console.log("Started...");
init();
animate();