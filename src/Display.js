import * as PIXI from 'pixi.js';

const Display = function(){
  this._engine = new PIXI.Application();
  this._debug = new PIXI.Graphics();
  this.scale = 12;
}

Display.prototype = {
  init : function(){
    this._engine.renderer.view.style.position = "absolute";
    this._engine.renderer.view.style.display = "block";
    this._engine.renderer.backgroundColor = 0xFFFFFF;
    this._engine.renderer.autoResize = true;
    this._engine.renderer.resize(window.innerWidth, window.innerHeight);

    this._engine.stage.scale.x = 1;
    this._engine.stage.scale.y = 1;

    this._engine.stage.addChild(this._debug);

    document.body.appendChild(this._engine.view);
  },
  drawDebugGameBodies(game_bodies){
    this._debug.lineStyle(1, 0x000000);
    game_bodies.forEach((gamebody) => {
      this._debug.drawRect(
        gamebody.x0 * this.scale,
        gamebody.y0 * this.scale,
        gamebody.width * this.scale,
        gamebody.height * this.scale,
      );
    })
    this._debug.endFill();
  }
}

export default Display;