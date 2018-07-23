const Split = function(plane){
  const randomPlane = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
  this._plane = plane || randomPlane;
}

Split.prototype = {
  set plane(plane){
    if(plane === 'x' || plane === 'y'){
      this._plane = plane;
    }
  },
  get plane(){
    return this._plane;
  },
  get altPlane(){
    if(this._plane === 'x') return 'y';
    return 'x';
  },
  get translate(){
    if(this.plane === 'x'){
      return {
        plane0 : 'x0',
        plane1 : 'x1',
        planeLength : 'width'
      }
    }else if(this.plane === 'y'){
      return {
        plane0 : 'y0',
        plane1 : 'y1',
        planeLength : 'height'
      }
    }
  },
  get altTranslate(){
    if(this.plane === 'y'){
      return {
        plane0 : 'x0',
        plane1 : 'x1',
        planeLength : 'width'
      }
    }else if(this.plane === 'x'){
      return {
        plane0 : 'y0',
        plane1 : 'y1',
        planeLength : 'height'
      }
    }
  },
  randSplitBody : function(game_body, min_section_size){
    const translate = this.translate;

    const length = game_body[translate.planeLength];

    let splitLength = Math.floor(
      length/2 + (Math.random() - 1/2) * (length - min_section_size * 2)
    )

    let body0 = game_body.constructorArgvs(); 
    body0[translate.planeLength] = splitLength;

    let body1 = game_body.constructorArgvs();
    body1[translate.plane0] += splitLength;
    body1[translate.planeLength] -= splitLength;

    return [body0, body1];
  }
}

export default Split;