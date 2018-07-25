import GameBody from '../GameBody';
import Room from './Room';
import Split from './Split';
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
  recursiveGenerate : function(layout){
    this._split = Split.prototype.createSplit(
      this, layout.randomSections.reduce((prev, cur) => prev + cur)
    );

    this._children = [];

    if(this._split === false){
      this._room = new Room();
      this._room.generate(this, layout.roomCf());
    }else{
      const splitBodies = this._split.randSplitBody(this, 
        layout.amass('min_section_size', layout._data[0]),
        layout.amass('min_section_size', layout._data[1])
      )
      splitBodies.forEach((split, index) => {
        let node = new DungeonTreeNode(split, this._name + index);
        this._children.push(node);
        node.recursiveGenerate(layout.getSubLayout(index));
      })
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
        let children = child.getChildrenOnEdge(
          this._split.plane, (index + 1) % 2
        )

        return children.filter((child) => {
          return !child._room._endroom;
        });
      }
    });

    this._corrider = new Corrider(this);
    if(!this._corrider.determineRooms(sideNodes, cf)){
      return false;
    }
    return true;
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