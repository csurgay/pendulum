function keyup(event) {
    // pendulum display
    if (event.key=="P") params.showRods = !params.showRods;
    // values display
    else if (event.key=="V") params.showParams = !params.showParams;
    // turtle speed
    else if (event.key=="T") params.slowAnim = !params.slowAnim;
    // break
    else if (event.key==" ") {
        params.runAnim = !params.runAnim;
        if (params.runAnim) requestAnimationFrame(animate);
    }
    // log
    else if (event.key=="L") {
        let str='['+params.dim+', ';
        for(let i=0;i<params.dim;i++) str+=params.initLengths[i]+", ";
        for(let i=0;i<params.dim;i++) str+=params.speeds[i]+', ';
        str+=params.traceLength+'],';
        console.log(str);
    }
    else if (event.key=="Enter") {
        params.dim=Math.floor(2+3*Math.random());
        for (let i=0;i<params.dim;i++) {
            params.speeds[i]=2*Math.random()-1;
        }
        for (let i=0;i<params.dim;i++) {
            params.initLengths[i]=Math.floor(150*Math.random());
        }
        params.traceLength=Math.floor(6000*Math.random());
    }
    else if (event.key>="a" && event.key<="z") {
        let c = event.key.charCodeAt(0)-97;
        fillParams(paramsArray[c]);
    }
    else if (event.key>="0" && event.key<="9") {
        let c = event.key.charCodeAt(0)-48;
        if (c>=params.dim) c=params.dim-1;
        params.selectedRod=c;
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
        paramsIndex = paramsIndex-1;
        if (paramsIndex<0) paramsIndex=paramsArray.length-1;
        fillParams(paramsArray[paramsIndex]);
    }
    else if (event.key=="ArrowRight") {
        paramsIndex = paramsIndex+1;
        if (paramsIndex>=paramsArray.length) paramsIndex=0;
        fillParams(paramsArray[paramsIndex]);
    }
}
