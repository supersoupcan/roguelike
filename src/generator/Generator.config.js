import utils from '../utils';

const Layout = function(layout, standard){
  standard.optional = true;
  this._standard = standard;
  this._layout = layout;
  this._shuffle = Boolean(Math.floor(Math.random() * 2));

  function recurse(branch, layout){
    if(Array.isArray(layout)){
      layout.forEach((child) => {
        recurse(branch, child);
      });
    }else{
      branch.push(layout);
    }
  }

  let data = [[],[]];

  if(Array.isArray(this._layout)){
    this._layout.forEach((child, index) => {
      recurse(data[index], child);
    })
  }else if(!this._layout){
    data[0].push(this._standard);
    data[1].push(this._standard);
  }else{
    data[0].push(this._layout);
    data[1].push(this._standard);
  }

  this._data = this._shuffle ? [data[1], data[0]] : data;
}

Layout.prototype = {
  get randomSections(){
    return this._data.map((section) => {
      return utils.randIntBetween(
        this.amass('min_section_size', section),
        this.amass('max_section_size', section),
      )
    })
  },
  shuffled(index){
    return this._shuffle ? (index + 1) % 2 : index;
  },
  amass : function(key, section){
    return section.reduce((prev, cur) => {
      return prev + cur[key];
    }, 0)
  },
  roomCf : function(){
    return this._data[this.shuffled(0)][0].room;
  },
  getSubLayout : function(index){
    let layout;
    if(Array.isArray(this._layout)){
      layout = this._layout[this.shuffled(index)];
    }else if(!this._layout){
      layout = false;
    }else{
      if(this.shuffled(index) === 0){
        layout = this._layout;
      }else{
        layout = false;
      }
    }
    return new Layout(layout, this._standard);
  }
}

const sections = {
  standard : {
    min_section_size : 6,
    max_section_size : 8,
    room : {
      endroom : false,
      type : 'standard',
      color : 0x00FF00,
      min_room_size : 5,
    }
  },
  boss : {
    min_section_size : 8,
    max_section_size : 10,
    room : {
      endroom : true,
      type : 'boss',
      color : 0x0000FF,
      min_room_size : 7,
    }
  },
  start : {
    min_section_size : 6,
    max_section_size : 8,
    room : {
      endroom : false,
      type : 'start',
      color : 0xFF0000,
      min_room_size : 5
    }
  },
  loot : {
    min_section_size : 6,
    max_section_size : 8, 
    room : {
      endroom : true,
      min_room_size : 5,
      color : 0xF0F000,
      type : 'loot'
    }
  }
}

const generator_config = {
  gamebody : {
    x0: 0,
    y0: 0,
    height : 32,
    width : 32,
  },
  layout : new Layout([
    [sections.boss, sections.loot], 
    [sections.start, sections.loot]], 
    sections.standard
  ),
  connect : {
    corrider_width : 1,
    strict_buffer : 1,
    prioritize : strictHierachy,
  },
  analysis : {

  }
}

function strictHierachy(connections){
  const prioritized = connections.reduce(
    (standard, current) => {
      if(standard.strict === false && current.strict === true){
        standard.strict = true;
        standard.contenders = [];
        standard.hierachy = 0;
      }

      if(standard.strict === current.strict){
        if(current.hierachy > standard.hierachy){
          standard.contenders = [{
            rooms : current.rooms,
            strict : standard.strict
          }];
          standard.hierachy = current.hierachy;
        }else if(current.hierachy === standard.hierachy){
          standard.contenders.push({
            rooms : current.rooms,
            strict : standard.strict
          });
        }
      }
      return standard;
    },{
      contenders : [],
      strict : false,
      hierachy : 0,
    }
  )

  return prioritized.contenders;
}

export default generator_config;