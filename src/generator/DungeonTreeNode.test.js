import DungeonTreeNode from './DungeonTreeNode';

import config from 'Generator.config';

let dungeon = new DungeonTreeNode(config.gamebody);
let area = 0;
test('mantain dungeon area', () => {
  dungeon.recursiveGenerate(level_cf.generate);
  dungeon.traversePostOrder((node) => {
    area += node.area;
  }, (node) => node._children.length === 0)

  expect(area).toBe(dungeon.area);
});