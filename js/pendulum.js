class Pendulum {
    constructor(x,y,r,dim) {
        this.x=x;
        this.y=y;
        this.dim=dim;                               // number of rods
        this.initLengths=[10,10,10,10,10,10,10],    // length of rods
        this.speeds=[0.1,0.1,0.1,0.1,0.1,0.1,0.1],  // sotation speed rods
        this.traceLength=6000;                      // points to keep trace
        this.canvasSize=r;                          // canvas width and height
        this.pointsPerFrame=100;                    // animation speed
        this.showRods=false;                        // show rods on/off
        this.showParams=true;                       // show params on/off
        this.runAnim=true;                          // animation on/off
        this.slowAnim=false;                        // slower animation
        this.selectedRod=0;                         // rod to adjust length/speed
        this.tracePoints=[];                        // the whole path it draws
        this.angles=[0,0,0,0,0,0,0];                // starting angles of rods
        this.lengths=[10,10,10,10,10,10,10];        // real length of rods in canvas

    }

    calculate() {
        var xs=[0,1,2,3,4,5,6],ys=[0,1,2,3,4,5,6],xEnd,yEnd;
        
        // Update rod lengths for canvas size
        let sum = 0; 
        for (let i=0;i<this.dim;i++) sum+=this.initLengths[i];
        for (let i=0;i<this.dim;i++) {
            this.lengths[i]=Math.floor(this.initLengths[i]*this.canvasSize/2/sum);
        }

        for (let i=0; i<(this.slowAnim?1:this.pointsPerFrame); i++) {

            // Calculate rod endpoints
//            xs[0] = centerX + Math.cos(this.angles[0]) * this.lengths[0];
//            ys[0] = centerY + Math.sin(this.angles[0]) * this.lengths[0];
            xs[0] = Math.cos(this.angles[0]) * this.lengths[0];
            ys[0] = Math.sin(this.angles[0]) * this.lengths[0];
            for (let i=1; i<this.dim; i++) {
                xs[i] = xs[i-1] + Math.cos(this.angles[i]) * this.lengths[i];
                ys[i] = ys[i-1] + Math.sin(this.angles[i]) * this.lengths[i];
                xEnd=xs[i]; yEnd=ys[i];
            }

            // Add new trace point
            this.tracePoints.push({x: xEnd, y: yEnd});
            while (this.tracePoints.length > this.traceLength && this.tracePoints.length > this.pointsPerFrame) {
                this.tracePoints.shift();
            }

            // Update angles
            for (let i=0;i<this.dim;i++) {
                this.angles[i]+=this.speeds[i];
            }
        }
    }

    draw() {
        // Draw trace
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(200, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        for (let i = 0; i < this.traceLength; i++) if (i<this.tracePoints.length) {
            const point = this.tracePoints[i];
            if (i === 0) {
                ctx.moveTo(this.x+point.x, this.y+point.y);
            } else {
                ctx.lineTo(this.x+point.x, this.y+point.y);
            }
        }
        ctx.stroke();

        // Draw parameters
        if (this.showParams) {
            ctx.font="16px Arial";
            let iy=0, dy=20;
            ctx.fillStyle="white";
            ctx.fillText(paramsIndex,10,dy+15*++iy);
            for (let i=0; i<this.dim; i++) {
                ctx.fillStyle=(i==this.selectedRod?"red":"white");
                ctx.fillText(this.initLengths[i]+' '+this.speeds[i],10,dy+15*++iy);
            }
            ctx.fillStyle="white";
            ctx.fillText(this.traceLength,10,dy+15*++iy);
        }

        // Draw rods
        if (this.showRods) {
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.moveTo(centerX, centerY);
            for (let i=0;i<this.dim;i++) {
                ctx.lineTo(xs[i],ys[i]);
            }
            ctx.stroke();
        }
    }
    fillParams(p) {
        this.tracePoints=[];
        this.dim=p[0];
        for (let i=0;i<this.dim;i++) {
            this.initLengths[i]=p[1][i];
        }
        for (let i=0;i<this.dim;i++) {
            this.speeds[i]=p[2][i];
        }
        this.traceLength=p[3];
        // reset angles
        for (let i=0;i<this.dim;i++) {
            this.angles[i]=0;
        }
    }
}
