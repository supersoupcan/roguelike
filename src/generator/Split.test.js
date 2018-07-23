import GameBody from '../GameBody';
import Split from './Split';

test('split conserves area', () => {
  let gamebody = new GameBody(0, 0, 24, 24);
  let split = new Split();

  let area = 0;

  split.randSplitBody(gamebody, 8).forEach((recipe) => {
    const body = new GameBody(recipe.x0, recipe.y0, recipe.width, recipe.height);
    console.log(body);
    area += body.area;
  });

  expect(area).toBe(gamebody.area);
})