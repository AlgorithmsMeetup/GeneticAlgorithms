var cities = require('./cities.js');
var distanceCalculator = require('./distanceCalculator.js');
var log = require('./log.js').log;

var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources){
  var options = {
    numberOfBloodlines: 50,
    offspringPerSurvivor: 20,
    maxStagnant: 100
  };

  var bloodlines = [];
  for(var i = 0; i < options.numberOfBloodlines; i++){
    bloodlines.push({
      stagnant: 0,
      survivor: initiateBloodline(genes)
    });
  }

  var startingResources = availableResources;
  while(availableResources){
    for(var i = 0; i < bloodlines.length; i++){
      var survivor = bloodlines[i].survivor;
      var survivorFitness = assessFitness(survivor);
      if(bloodlines[i].stagnant > options.maxStagnant){
        bloodlines[i].stagnant = bloodlines[i].stagnant-1;
      }
      var stagnantion = 0;
      for(var offspring = 0; offspring < options.offspringPerSurvivor; offspring++){
        var currentOffspring = mutate(survivor);
        var currentFitness = assessFitness(currentOffspring);
        if(currentFitness < survivorFitness){
          survivor = currentOffspring;
          survivorFitness = currentFitness;
        }
      }
      if(bloodlines[i].survivor === survivor){
        stagnantion = bloodlines[i].stagnant + 1;
      }
      bloodlines[i] = {'survivor': survivor, 'stagnant': stagnantion };
    }
    log({
      generation: 1 + startingResources - availableResources,
      survivorFitness: bloodlines.map(function(bloodline){
        var stag = '';
        for(var i = 0; i < bloodline.stagnant; i++){
          stag += '+';
        }
        return ''+Math.round(assessFitness(bloodline.survivor))+' stagnation: '+stag;
      }).sort()
    });
    availableResources--;
  }

  bloodlines.sort(function(bloodline1, bloodline2){
    return assessFitness(bloodline1.survivor) - assessFitness(bloodline2.survivor);
  });

  var optimalRoute = bloodlines[0].survivor;
  var optimalFitness = assessFitness(bloodlines[0].survivor);

  console.log("optimalRoute", optimalFitness, "meters", 'generations stagnant', bloodlines[0].stagnant);
  return optimalRoute;
}

var createRoute = function(cities){
  var route = cities.slice();
  for(var i = 0; i < route.length; i++){
    var randomIndex = Math.floor(Math.random() * i);
    route[i] = route[randomIndex];
    route[randomIndex] = cities[i];
  }
  return route;
}

var alterRoute = function(route){
  var alteredRoute = route.slice();
  var index1 = Math.floor(Math.random() * route.length)
  var index2 = Math.floor(Math.random() * route.length)
  alteredRoute[index1] = alteredRoute[index2];
  alteredRoute[index2] = route[index1];
  return alteredRoute;
}

var calculateDistance = function(route){
  var distances = route.map(function(city, index, route){
    var nextCity = route[index + 1] || route[0];
    var distance = distanceCalculator(city, nextCity);
    return distance;
  });

  return distances.reduce(function(distance1, distance2){
    return distance1 + distance2;
  });
}

geneticSalesman(cities, calculateDistance, createRoute, alterRoute, 3000);