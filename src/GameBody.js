const Position = function(x, y){
  this._x = x;
  this._y = y;
}

Position.prototype = {
  get x(){
    return this._x;
  },
  get y(){
    return this._y;
  }
}

const Size = function(width, height){
  this._width = width;
  this._height = height;
}

Size.prototype = {
  get width(){
    return this._width;
  },
  set width(width){
    this._width = width;
  },
  get height(){
    return this._height;
  },
  set height(height){
    this._height = height;
  }
}

const GameBody = function(x0, y0, width, height){
  this._pos = new Position(x0, y0);
  this._size = new Size(width, height)
  this.color = 0x000000;
}
 

GameBody.prototype = {
  setPosition : function(x0, y0){
    this._pos = new Position(x0, y0);
  },
  setSize : function(width, height){
    this._size = new Size(width, height);
  },
  get height(){
    return this._size.height;
  },
  get width(){
    return this._size.width;
  },
  get area(){
    return this.width * this.height;
  },
  get x0(){
    return this._pos.x;
  },
  get x1(){
    return this._pos.x + this.width;
  },
  get y0(){
    return this._pos.y;
  },
  get y1(){
    return this._pos.y + this.height;
  },
  constructorArgvs : function(){
    let base = {
      x0 : this.x0,
      y0 : this.y0,
      width : this.width,
      height : this.height,
    }
    return Object.assign({}, base);
  },
}

export default GameBody;