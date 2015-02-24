var toRadians = function(thing){
  return thing * Math.PI / 180;
}

var distanceCalculator = function(point1, point2){
  var R = 6371000;
  var dx = toRadians(point2.latitude - point1.latitude);
  var dy = toRadians(point2.longitude - point1.longitude);
  var median = Math.pow(Math.sin(dx / 2), 2) +
               Math.cos(toRadians(point1.latitude)) * Math.cos(toRadians(point2.latitude)) *
               Math.pow(Math.sin(dy / 2),2);
  var c = 2 * Math.atan2(Math.sqrt(median), Math.sqrt(1 - median));
  var distance = R * c;
  return distance;
};
