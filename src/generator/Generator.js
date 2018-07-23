import DungeonTreeRoot from './DungeonTreeRoot';

const Generator = function(level_cf){
  this._root = null;
  this._level_cf = level_cf;
}

Generator.prototype = {
  generate : function(){
    this._root = new DungeonTreeRoot(this._level_cf.gamebody);
    this._root.recursiveGenerate(this._level_cf.generate);
    this._root.connectTree(this._level_cf.connect);
  },
  drawDebugTree : function(display){
    let gameBodies = [];
    this._root.traversePostOrder((node) => {
      if(node._children.length === 0){
        //gameBodies.push(node);
        gameBodies.push(node._room);
      }
      if(node._corrider) gameBodies.push(node._corrider);
    })
    display.drawDebugGameBodies(gameBodies);
  }
}

module.exports = Generator;