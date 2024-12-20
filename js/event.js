function keyup(event) {
    // rods display
    if (event.key=="r") showRods = !showRods;
    // parameters display
    else if (event.key=="p") showParams = !showParams;
    // serial numbers display
    else if (event.key=="s") showSerial = !showSerial;
    // animation slow speed
    else if (event.key=="a") slowAnim = !slowAnim;
    // randomize colors
    else if (event.key=="c") randomizeColors();
    // break
    else if (event.key==" ") {
        runAnim = !runAnim;
        if (runAnim) requestAnimationFrame(animate);
    }
    else if (event.key=="Enter") {
        clearScreen();
        randomizeColors();
        ps.forEach( p=>p.randomize() );
    }
    else if (event.key>="0" && event.key<="9") {
        let c = event.key.charCodeAt(0)-48;
        ps[c].log();
    }
    else if (event.key=="Q") {
        params.initLengths[params.selectedRod] -= 10;
        if (params.initLengths[params.selectedRod]<0) params.initLengths[params.selectedRod]=0;
    }
    else if (event.key=="W") {
        params.initLengths[params.selectedRod] -= 1;
        if (params.initLengths[params.selectedRod]<0) params.initLengths[params.selectedRod]=0;
    }
    else if (event.key=="E") {
        params.initLengths[params.selectedRod] += 1;
        if (params.initLengths[params.selectedRod]>100) params.initLengths[params.selectedRod]=100;
    }
    else if (event.key=="R") {
        params.initLengths[params.selectedRod] += 10;
        if (params.initLengths[params.selectedRod]>100) params.initLengths[params.selectedRod]=100;
    }
    else if (event.key=="A") {
        params.speeds[params.selectedRod] -= 0.0100;
        if (params.speeds[params.selectedRod]<0) params.speeds[params.selectedRod]=0;
    }
    else if (event.key=="S") {
        params.speeds[params.selectedRod] -= 0.0010;
        if (params.speeds[params.selectedRod]<0) params.speeds[params.selectedRod]=0;
    }
    else if (event.key=="D") {
        params.speeds[params.selectedRod] += 0.0010;
        if (params.speeds[params.selectedRod]>100) params.speeds[params.selectedRod]=100;
    }
    else if (event.key=="F") {
        params.speeds[params.selectedRod] += 0.0100;
        if (params.speeds[params.selectedRod]>100) params.speeds[params.selectedRod]=100;
    }
    else if (event.key=="ArrowLeft") {
        paramsIndex = paramsIndex-(mode=="8"?8:1);
        if (paramsIndex<0) paramsIndex=paramsArray.length-(mode=="8"?8:1);
        randomizeColors();
        getpendulums();
    }
    else if (event.key=="ArrowRight") {
        paramsIndex = paramsIndex+(mode=="8"?8:1);
        if (paramsIndex>=paramsArray.length-(mode=="8"?8:1)) paramsIndex=0;
        randomizeColors();
        getpendulums();
    }
}
