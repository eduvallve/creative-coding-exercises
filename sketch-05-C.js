const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ], animate:true
};


let url = '/images/738-100x100.jpg';
let img;

let manager;

let text = 'A';
let fontSize;
let fontFamily = 'serif';



const loadSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = () => {
  loadSomeImage(url).then(img => {
    manager = canvasSketch(sketch, settings);
  })
}


const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');
const cell = 12;

const sketch = ({ context, width, height }) => {
  


  return ({ context, width, height }) => {

    
    const cols = Math.floor(width/cell);
    const rows = Math.floor(height/cell);
    const numCells = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;



    fontSize = cols * 1;
    var pat = typeContext.createPattern(img, "no-repeat");
    typeContext.rect(0, 0, cols, rows);
    typeContext.fillStyle = pat;
    typeContext.fill();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    //context.drawImage(img, 0, 0);

    for(let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i/cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];


      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if(Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;


      context.fillStyle = `rgb(${r},${g},${b},${a})`;

      context.save();
      context.translate(x,y);
      context.fillRect(0,0,cell,cell);
      context.fillText(glyph,0,0);
      context.restore();
    }
  };
};


const getGlyph = (v) => {
  if (v < 50) return '*';
  if (v < 100) return ':';
  if (v < 150) return '-';
  if (v < 200) return '+';

  const glyphs = '_= /'.split('');

  return random.pick(glyphs);
}



start();
