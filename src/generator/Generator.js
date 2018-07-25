import DungeonTreeRoot from './DungeonTreeRoot';

const Generator = function(level_cf){
  this._root = null;
  this._analysis = null;
  this._level_cf = level_cf;
}

Generator.prototype = {
  generate : function(){
    this._root = new DungeonTreeRoot(this._level_cf.gamebody);
    let count = 0;
    do{
      this._analysis = null;
      this._root.recursiveGenerate(this._level_cf.layout);
      const connected = this._root.connectTree(this._level_cf.connect);
      if(connected){
       this._analysis = this._root.analyze(this._level_cf.analysis);
      }
      count++;
    }while(!this._analysis && count <= 10);

  },
  drawDebugTree : function(display){
    let gameBodies = [];
    this._root.traversePostOrder((node) => {
      if(node._children.length === 0){
        gameBodies.push(node);
        gameBodies.push(node._room);
      }else{
        gameBodies.push(node._corrider);
      }
    })
    display.drawDebugGameBodies(gameBodies);
  },
}

module.exports = Generator;