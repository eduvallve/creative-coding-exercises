const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};



const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    const cx = width;
    const cy = height;

    let x, y;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 120;
    const radius = width * 0.8;

      for(let i = 0; i < num; i++){
        const slice = math.degToRad(360/num);
        const angle = slice * i;

        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);

        context.save();
        context.translate(x,y);
        context.rotate(-angle);
        context.scale(random.range(0.1, 2),random.range(0.2, 5));
    
        context.beginPath();
        context.rect(-w*0.5, random.range(0,-h*0.5), w, h);
        context.fillStyle = 'hsla(50%, 80%, 60% / '+Math.random()+')';

        context.fill();
        context.restore();


        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
        context.lineWidth = random.range(10, 120);
        context.beginPath();
        context.arc(0,0,radius * random.range(0.2, 2.6),slice * random.range(1, -8),slice * random.range(0, 5));
        context.strokeStyle = 'hsl(' + 100 * Math.random() + ', 80%, 60%)';
        
        context.stroke();
        context.restore();
      }


    
  };
};

canvasSketch(sketch, settings);