import GameBody from '../GameBody';
import Split from './Split';
import Room from './Room';
import utils from '../utils';
import Corrider from './Corrider';

const DungeonTreeNode = function(gamebody, name){
  GameBody.call(this, gamebody.x0, gamebody.y0, gamebody.width, gamebody.height);
  this._split = null;
  this._room = null;
  this._corrider = null;
  this._name = name;
  this._children = [];
}

const prototype = {
  recursiveGenerate : function(cf){
    const randSectionSize = utils.randIntBetween(
      cf.min_section_size, cf.max_section_size
    );
    
    function canSplit(length){
      return length >= randSectionSize * 2;
    }

    this._children = [];

    const canSplitX = canSplit(this.width);
    const canSplitY = canSplit(this.height);

    if(canSplitX || canSplitY){
      if(canSplitX && canSplitY){
        this._split = new Split();
      }else if(canSplitX){
        this._split = new Split('x');
      }else if(canSplitY){
        this._split = new Split('y');
      }

      const splitBodies = this._split.randSplitBody(
        this, cf.min_section_size
      );

      splitBodies.forEach((split, index) => {
        let node = new DungeonTreeNode(split, this._name + index);
        this._children.push(node);
        node.recursiveGenerate(cf);
      })

    }else{
      this._room = new Room();
      this._room.generate(this, cf);
    }
  },
  getChildrenOnEdge(plane, index){
    let childrenOnEdge = [];
    this.traversePostOrder(
      (child) => {childrenOnEdge.push(child)},
      (child) => (child._children.length === 0),
      (parent, child, childIndex) => {
        return !(parent._split.plane === plane && index !== childIndex);
      }
    )
    return childrenOnEdge;
  },
  connectChildren : function(cf){
    const sideNodes = this._children.map((child, index) => {
      if(child._children.length === 0){
        return [child];
      }else{
        return child.getChildrenOnEdge(
          this._split.plane, (index + 1) % 2
        )
      }
    });

    this._corrider = new Corrider(this);
    if(!this._corrider.determineRooms(sideNodes, cf)){
      console.log('FATAL ERROR!');
    }
  },
  traversePostOrder : function(cb, cbFilter, recurseFilter){
    (function recurse(parent){
      parent._children.forEach((child, index) => {
        if(recurseFilter){
          if(recurseFilter(parent, child, index)){
            recurse(child);
          }
        }else{
          recurse(child);
        }
      })
      if(cbFilter){
        if(cbFilter(parent)){
          cb(parent);
        }
      }else{
        cb(parent);
      }
    })(this);
  }
}

DungeonTreeNode.prototype = Object.assign(
  Object.create(GameBody.prototype),
  prototype
)

DungeonTreeNode.prototype.constructor = DungeonTreeNode;

export default DungeonTreeNode;