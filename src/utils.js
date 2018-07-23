const utils = {
  randIntBetween : function(min_range, max_range,){
    return Math.floor(Math.random() * (max_range - min_range) + min_range);
  }
}

export default utils;