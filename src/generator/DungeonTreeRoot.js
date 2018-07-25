import DungeonTreeNode from "./DungeonTreeNode";
import Room from "./Room";

const DungeonTreeRoot = function(gamebody){
  DungeonTreeNode.call(this, gamebody, "");
  this.status = "AWAITING_GENERATION";
}

const prototype = {
  connectTree : function(cf){
    this.traversePostOrder((node) => {
      if(!node.connectChildren(cf)) console.log('catastrophy');
    }, (node) => node._children.length === 2);
    return true;
  },
  analyze : function(cf){
    return true;
  }
}

DungeonTreeRoot.prototype = Object.assign(
  Object.create(DungeonTreeNode.prototype),
  prototype
)

DungeonTreeRoot.prototype.constructor = DungeonTreeRoot;

export default DungeonTreeRoot;