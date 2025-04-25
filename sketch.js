let sheet;
function preload(){
  sheet = loadImage('sheet.png');
}


const MARGIN = 1;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 58;
const ROW_SIZE = 13;
const BREAK = 4*MARGIN;

function sheetXY(i){
  let x = i % ROW_SIZE, y = (i-x) / ROW_SIZE;
  return [x * (TILE_WIDTH), y * (TILE_HEIGHT)];
}

function getSheetLookup(){
  const suits = {
    'm': [-1, 11, 0*ROW_SIZE+1], 
    'p': [-1, 11, 1*ROW_SIZE+1],
    's': [-1, 11, 2*ROW_SIZE+1],
    'y': [-1, 11, 3*ROW_SIZE+1],
    'z': [0, 9, 4*ROW_SIZE+1],
    
    'moon': [1, 8, 5*ROW_SIZE+1],
    '1f': [1, 4, 5*ROW_SIZE+1],
    '2f': [1, 4, 5*ROW_SIZE+1+4], 
    '3f': [1, 4, 6*ROW_SIZE+1], 
    '4f': [1, 4, 6*ROW_SIZE+1+4],
  }
  
  const sheetLookup = {};
  
  for(let suit in suits){
  
    let imin = suits[suit][0], imax = suits[suit][1];
    let basepos = suits[suit][2];
    for(let i = imin; i <= imax; i++){
      let notation = i + suit;
      let lookup = basepos + i;
      sheetLookup[notation] = lookup;
    }
  }
  
  specials = {
    '0': '0z',
    'e': '1z', 
    's': '2z',
    'w': '3z', 
    'n': '4z', 
    'wh': '5z', 
    'g': '6z', 
    'r': '7z', 
    'polaris': '8z',
    
    '1': '1p',
    '2': '2p',
    '3': '3p', 
    '4': '4p', 
    '5': '5p', 
    '6': '6p', 
    '7': '7p', 
    '8': '8p', 
    '9': '9p', 
    '10': '10p', 
    '-1': '-1p',
  }
  for(let name in specials) {
    sheetLookup[name] = sheetLookup[specials[name]]
  }
  
  return sheetLookup;
}
const sheetLookup = getSheetLookup();


function drawTile(s, x_dest){
  if(s == '') return;
  let lookup = sheetLookup[s];
  let coord = sheetXY(lookup);
  let x_src = coord[0], y_src = coord[1];
  
  image(sheet, x_dest, 0, TILE_WIDTH,TILE_HEIGHT, x_src- MARGIN, y_src, TILE_WIDTH ,TILE_HEIGHT)
  
  
}

function drawTiles(s){
  tiles = s.split(' ')
  let x = 0
  for(let tile of tiles){
    if(tile == '/') x += BREAK;
    else{
      drawTile(tile, x);
      x += TILE_WIDTH;
    }
  }
  
}

let sinput;
function setup(){
  createCanvas(TILE_WIDTH * 20,TILE_HEIGHT);
  sinput = createInput('1s 1s 1s / 2s 3s 4s / 6s 7s 8s / 9s 9s 9s / 5s 5s');
}
function draw() {
  
  background(220);
  drawTiles(sinput.value())
}