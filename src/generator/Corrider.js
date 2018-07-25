import GameBody from '../GameBody';
import utils from '../utils';

const Corrider = function(parent){
  GameBody.call(this);
  this._name = parent._name;
  this._split = parent._split;
  this._active = true;
}

const prototype = {
  generate : function(connection, cf){
    const altTranslate = this._split.altTranslate;
    const translate = this._split.translate;

    const rooms = connection.rooms;

    const r0p0 = rooms[0][altTranslate.plane0];
    const r0p1 = rooms[0][altTranslate.plane1];
    const r1p0 = rooms[1][altTranslate.plane0];
    const r1p1 = rooms[1][altTranslate.plane1];

    let max = Math.min(r0p1, r1p1);
    let min = Math.max(r0p0, r1p0);

    if(connection.strict){
      min += cf.strict_buffer;
      max -= cf.strict_buffer;
    }

    const plane0 = rooms[0][translate.plane1];
    const altPlane0 = utils.randIntBetween(min, max);
    const planeLength = rooms[1][translate.plane0] - rooms[0][translate.plane1];
    const altPlaneLength = cf.corrider_width;

    const gamebody = {
      [translate.plane0] : plane0,
      [altTranslate.plane0] : altPlane0,
      [translate.planeLength] : planeLength,
      [altTranslate.planeLength] : altPlaneLength,
    }

    this.setPosition(gamebody.x0, gamebody.y0);
    this.setSize(gamebody.width, gamebody.height);

    rooms.forEach(room => {
      room.addCorrider(this);
    })
  },
  determineRooms(sideNodes, cf){
    let connections = [];

    sideNodes[0].forEach((side0Node) => {
      let translate = this._split.altTranslate;

      const r0p0 = side0Node._room[translate.plane0];
      const r0p1 = side0Node._room[translate.plane1];


      sideNodes[1].forEach((side1Node) => {

        const r1p0 = side1Node._room[translate.plane0];
        const r1p1 = side1Node._room[translate.plane1];

        const connection = r0p0 < r1p1 && r1p0 < r0p1;
        
        if(connection){
          const min = Math.max(r0p0, r0p0);
          const max = Math.min(r0p1, r1p1)
        
          const strictConnection = (max - min) - cf.strict_buffer * 2 > 0;

          connections.push({
            rooms : [side0Node._room, side1Node._room],
            hierachy : side0Node._name.length + side1Node._name.length,
            strict : strictConnection,
          });
        }
      })
    })

    if(!connections || connections.length === 0){
      return false;
    }else{
      if(cf.prioritize){
        connections = cf.prioritize(connections);
      }
      const randConnection = connections[
        Math.floor(Math.random() * connections.length)
      ]
      this.generate(randConnection, cf);
      return true;
    }
  }
}

Corrider.prototype = Object.assign(
  Object.create(GameBody.prototype),
  prototype
)

export default Corrider;