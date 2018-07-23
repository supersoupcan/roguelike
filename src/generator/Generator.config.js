const generator_config = {
  gamebody : {
    x0: 0,
    y0: 0,
    height : 32,
    width : 48,
  },
  generate : {
    min_section_size : 6,
    max_section_size : 9, 
    min_room_size : 4,
  },
  connect : {
    corrider_width : 1,
    strict_buffer : 1,
    prioritize : strictHierachy,
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