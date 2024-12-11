function animate() {
    // Clear canvas
    clearScreen();

    ps.forEach( p => { p.calculate(); p.draw(); })

    if (runAnim) requestAnimationFrame(animate);
}
// create 8 new pendulums
function create8pendulums() {
    for (let i=0; i<8; i++) {
        let x=i<4?i:i-4;
        let y=i<4?0:1;
        let d=360;
        ps.push( new Pendulum(i,x*d+d/2,y*d+d/2,d,3) );
    }
}

// new set of 8 pendulums
function get8pendulums() {
    for (let i=0; i<8; i++) {
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
