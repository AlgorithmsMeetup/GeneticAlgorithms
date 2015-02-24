var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources){
  var options = {
    numberOfBloodlines: 10,
    offspringPerSurvivor: 50,
  };
  var generation = 1;

  var bloodlines = [];
  for(var i = 0; i < options.numberOfBloodlines; i++){
    bloodlines.push(initiateBloodline(genes));
  }

  while(availableResources){
    console.log('\n\n\nGeneration:', generation);
    for(var i = 0; i < bloodlines.length; i++){
      var survivor = bloodlines[i];
      var survivorFitness = assessFitness(survivor);
      for(var offspring = 0; offspring < options.offspringPerSurvivor; offspring++){
        var currentOffspring = mutate(bloodlines[i]);
        var currentFitness = assessFitness(currentOffspring);
        if(currentFitness < survivorFitness){
          survivor = currentOffspring;
          survivorFitness = currentFitness;
        }
      }
      console.log(survivorFitness);
      bloodlines[i] = survivor;
    }

    availableResources--;
    generation++;
  }

  bloodlines.sort(function(bloodline1, bloodline2){
    return assessFitness(bloodline1) - assessFitness(bloodline2);
  });

  var optimalRoute = bloodlines[0];
  var optimalFitness = assessFitness(bloodlines[0]);

  console.log("optimalRoute", optimalFitness, "meters");
  console.log('route', optimalRoute);
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

