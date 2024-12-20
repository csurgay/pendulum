function animate() {
    // Clear canvas
    clearScreen();
    sizePendulums();

    ps.forEach( p => { p.calculate(); p.draw(); })
    if (Date.now()-time>timeout) {
        nextPendulums();
        time=Date.now();
    }

    if (runAnim) requestAnimationFrame(animate);
}
// create 1 or 8 new pendulums
function creatependulums() {
    for (let i=0; i<(mode=="8"?8:1); i++) {
        ps.push( new Pendulum(i,"red",100,100,75,3) );
    }
    sizePendulums();
    randomizeColors();
}

// calc sizes and positions
function sizePendulums() {
    for (let i=0; i<(mode=="8"?8:1); i++) {
        let x=i<4?i:i-4;
        let y=i<4?0:1;
        let d=Math.floor(canvas.width/4.1);
        if (mode=="1") d=Math.min(canvas.height,canvas.width);
        ps[i].x=x*d+d/2;
        ps[i].y=y*d+d/2;
        ps[i].radius=d;
    }
}

// randomize pendulum colors
function randomizeColors() {
    shuffleArray(colors);
    let colindex=0;
    for (let i=0; i<(mode=="8"?8:1); i++) {
        let c=color=="random"?colors[colindex++]:color;
        ps[i].color=c;
    }
}

// new set of 8 pendulums
function getpendulums() {
    for (let i=0; i<(mode=="8"?8:1); i++) {
        ps[i].fillParams(paramsArray[paramsIndex+i]);
    }
}

// clear screen
function clearScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2 - 10;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// utility to shuffle colors
function shuffleArray(arr) {
    arr.sort(function (a, b) {
      return Math.random() - 0.5;
    });
}

function prevPendulums() {
    paramsIndex = paramsIndex-(mode=="8"?8:1);
    if (paramsIndex<0) paramsIndex=paramsArray.length-(mode=="8"?8:1);
    randomizeColors();
    getpendulums();
}

function nextPendulums() {
    paramsIndex = paramsIndex+(mode=="8"?8:1);
    if (paramsIndex>=paramsArray.length-(mode=="8"?8:1)) paramsIndex=0;
    randomizeColors();
    getpendulums();
}
