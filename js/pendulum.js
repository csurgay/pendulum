class Pendulum {
    constructor(serial,color,x,y,r,dim) {
        this.serial=serial;
        this.color=color;
        this.x=x;
        this.y=y;
        this.dim=dim;                               // number of rods
        this.initLengths=[10,10,10,10,10,10,10],    // length of rods
        this.speeds=[0.1,0.1,0.1,0.1,0.1,0.1,0.1],  // sotation speed rods
        this.traceLength=6000;                      // points to keep trace
        this.canvasSize=r;                          // canvas width and height
        this.pointsPerFrame=100;                    // animation speed
        this.selectedRod=0;                         // rod to adjust length/speed
        this.tracePoints=[];                        // the whole path it draws
        this.angles=[0,0,0,0,0,0,0];                // starting angles of rods
        this.lengths=[10,10,10,10,10,10,10];        // real length of rods in canvas
        this.xs=[0,0,0,0,0,0,0];                    // endpoints of the rods
        this.ys=[0,0,0,0,0,0,0];

    }

    calculate() {
        let xEnd,yEnd;
        
        // Update rod lengths for canvas size
        let sum = 0; 
        for (let i=0;i<this.dim;i++) sum+=this.initLengths[i];
        for (let i=0;i<this.dim;i++) {
            this.lengths[i]=Math.floor(this.initLengths[i]*this.canvasSize/2/sum);
        }

        for (let i=0; i<(slowAnim?1:this.pointsPerFrame); i++) {

            // Calculate rod endpoints
            this.xs[0] = Math.cos(this.angles[0]) * this.lengths[0];
            this.ys[0] = Math.sin(this.angles[0]) * this.lengths[0];
            for (let i=1; i<this.dim; i++) {
                this.xs[i] = this.xs[i-1] + Math.cos(this.angles[i]) * this.lengths[i];
                this.ys[i] = this.ys[i-1] + Math.sin(this.angles[i]) * this.lengths[i];
                xEnd=this.xs[i]; yEnd=this.ys[i];
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
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = lineWidth;
        for (let i = 0; i < this.traceLength; i++) if (i<this.tracePoints.length) {
            const point = this.tracePoints[i];
            if (i === 0) {
                ctx.moveTo(this.x+point.x, this.y+point.y);
            } else {
                ctx.lineTo(this.x+point.x, this.y+point.y);
            }
        }
        ctx.stroke();

        // Draw serial number
        if (showSerial) {
            ctx.font="16px Arial";
            ctx.fillStyle="white";
            ctx.fillText(this.serial,this.x,this.y);
        }

        // Draw parameters
        if (showParams) {
            ctx.font="16px Arial";
            let iy=0, dy=20;
            ctx.fillStyle="white";
            ctx.fillText(this.dim,this.x+10,this.y+dy+15*++iy);
            for (let i=0; i<this.dim; i++) {
                ctx.fillStyle=(i==this.selectedRod?"white":"white");
                ctx.fillText(this.initLengths[i]+', '+this.speeds[i].toFixed(4),this.x+10,this.y+dy+15*++iy);
            }
            ctx.fillStyle="white";
            ctx.fillText(this.traceLength,this.x+10,this.y+dy+15*++iy);
        }

        // Draw rods
        if (showRods) {
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.moveTo(this.x, this.y);
            for (let i=0;i<this.dim;i++) {
                ctx.lineTo(this.x+this.xs[i],this.y+this.ys[i]);
            }
            ctx.stroke();
        }
    }

    fillParams(p) {
        this.tracePoints=[];
        this.serial=p[0];
        this.dim=p[1];
        for (let i=0;i<this.dim;i++) {
            this.angles[i]=p[2][i];
        }
        for (let i=0;i<this.dim;i++) {
            this.initLengths[i]=p[3][i];
        }
        for (let i=0;i<this.dim;i++) {
            this.speeds[i]=p[4][i];
        }
        this.traceLength=p[5];
    }

    randomize() {
        this.dim=Math.floor(2+3*Math.random());
        for (let i=0;i<this.dim;i++) {
            this.speeds[i]=2*Math.random()-1;
        }
        for (let i=0;i<this.dim;i++) {
            this.initLengths[i]=Math.floor(150*Math.random());
        }
        this.traceLength=Math.floor(6000*Math.random());
    }

    log() {
        let str='['+this.dim+', [';
        for(let i=0;i<this.dim;i++) str+=(i==0?"":", ")+this.angles[i];
        str+='], [';
        for(let i=0;i<this.dim;i++) str+=(i==0?"":", ")+this.initLengths[i];
        str+='], [';
        for(let i=0;i<this.dim;i++) str+=(i==0?"":", ")+this.speeds[i];
        str+='], ';
        str+=this.traceLength+'],';
        console.log(str);
    }
}
