import Display from './Display';
import Generator from './generator/Generator';
import generator_config from './generator/Generator.config';

const Game = function(){
  this.display = new Display();
  this.lastTime = 0;
}

Game.prototype = {
  init : function(){
    this.display.init();
  },
  createLevel : function(){
    const generator = new Generator(generator_config);
    generator.generate();
    generator.drawDebugTree(this.display);
  }
}

export default Game;