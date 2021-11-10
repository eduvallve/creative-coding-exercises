const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};



const sketch = ({ context, width, height }) => {
  
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    const cx = width/3 * 2;
    const cy = height/3 * 2;

    let x, y;
    /*
    const w = width * 0.01;
    const h = height * 0.1;
  */
    const num = 90;
    const radius = width * 0.3;


    const linies = [];
    const arcs = [];

      for(let i = 0; i < num; i++){
        const slice = math.degToRad(360/num);
        const angle = slice * i;

        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);

        
        linies.push(new Linia(x,y,angle));
        arcs.push(new Arc(cx,cy,angle,radius,slice));

        
      }

      

      // Aqui manipulem l'animació

  return ({ context, width, height }) => {
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    
    
    arcs.forEach(arc => {
      arc.movement();
      arc.draw(context);
      
    });

    linies.forEach(linia => {
      linia.movement();
      linia.draw(context);
      
    });
    
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Linia {
  constructor(x,y,angle){
    this.pos = new Vector(x, y);
    this.angles = angle;
    console.log(this.angle);
    this.mida = random.range(0,0.5);
    this.scaleA = random.range(0.1, 0.75);
    this.scaleB = random.range(0.2, 10);
    this.color = Math.random();
    this.direction = random.range(-1,1);
  }
  draw(context){
    context.save();
    context.translate(this.pos.x,this.pos.y);
    context.rotate(this.angles * -1);
    console.log(this.angles);
    context.scale(this.scaleA,this.scaleB);

    context.beginPath();
    context.rect(1,1,10,10);
    //context.fillStyle = 'hsla(50%, 80%, 60% / '+this.color+')';
    context.fillStyle = "black";
    context.fill();
    context.restore();
  }
  movement(){
    //this.angles += random.range(0,0.1) * this.direction;
    //this.scaleA += random.range(0,0.01) * this.scaleA;
    
    if(this.scaleB >= 10){
      this.scaleB -= random.range(0,25);
    }else{
      this.scaleB += random.range(0,0.25);
    }
  }
}


class Arc {
  constructor(x,y,angle,radius,slice){
    this.pos = new Vector(x, y);
    this.angle = angle;
    this.radius = radius * random.range(0.2, 2.6);
    this.sliceA = slice * random.range(1, -8);
    this.sliceB = slice * random.range(0, 5);
    this.linewidth = random.range(10, 120);
    this.color = 100 * Math.random();
    this.direction = random.range(-1,1);
  }
  draw(context){
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.rotate(this.angle * -1);
    context.lineWidth = this.linewidth;
    context.beginPath();
    context.arc(0,0,this.radius,this.sliceA,this.sliceB);
    context.strokeStyle = 'hsl(' + this.color + ', 80%, 60%)';
    context.stroke();
    context.restore();
  }
  movement(){
    this.angle += random.range(0,0.01) * this.direction;
  }
}