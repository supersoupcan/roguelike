import GameBody from '../GameBody';
import utils from '../utils';

const Room = function(){
  GameBody.call(this);
  this._role = 'STANDARD';
  this._corriders = [];
}

const prototype = {
  generate : function(node, cf){
    const width = utils.randIntBetween(cf.min_room_size, node.width);
    const height = utils.randIntBetween(cf.min_room_size, node.height);

    this.setSize(width, height);  

    const x0 = node.x0 + Math.floor(Math.random(node.width - this.width)) + 1;
    const y0 = node.y0 + Math.floor(Math.random(node.height - this.height)) + 1;

    this.setPosition(x0, y0);
  },
  addCorrider(corrider){
    this._corriders.push(corrider);
  }
}

Room.prototype = Object.assign(
  Object.create(GameBody.prototype),
  prototype
)


export default Room;