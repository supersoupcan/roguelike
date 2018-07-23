import DungeonTreeNode from "./DungeonTreeNode";

const DungeonTreeRoot = function(gamebody){
  DungeonTreeNode.call(this, gamebody, "");
  this.status = "AWAITING_GENERATION";
}

const prototype = {
  connectTree : function(cf){
    this.traversePostOrder((node) => {
      node.connectChildren(cf);
    }, (node) => node._children.length === 2);
  }
}

DungeonTreeRoot.prototype = Object.assign(
  Object.create(DungeonTreeNode.prototype),
  prototype
)

DungeonTreeRoot.prototype.constructor = DungeonTreeRoot;

export default DungeonTreeRoot;