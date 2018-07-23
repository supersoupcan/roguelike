import DungeonTreeNode from './DungeonTreeNode';

const level_cf = {
  gamebody : {
    x: 0,
    y : 0,
    height : 12,
    width : 12
  },
  generate : {
    min_section_size : 3,
    max_section_size : 5,
    min_room_size : 4,
  },
  connect : {

  }
}

let dungeon = new DungeonTreeNode(level_cf.gamebody);
let area = 0;
test('mantain dungeon area', () => {
  dungeon.recursiveGenerate(level_cf.generate);
  dungeon.traversePostOrder((node) => {
    area += node.area;
  }, (node) => node._children.length === 0)

  expect(area).toBe(dungeon.area);
});