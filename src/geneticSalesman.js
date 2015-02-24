var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources) {
  var options = {
    numberOfBloodlines: 10,
    offspringPerSurvivor: 50,
  };
  var generation = 1;

  var bloodlines = [];
  for (var i = 0; i < options.numberOfBloodlines; i++) {
    var newBloodline = initiateBloodline(genes);
    bloodlines.push(newBloodline);
  }
  var mutations = 0;
  while (availableResources > 0) {
    var blCopy = bloodlines.slice();
    for (var blCount = 0; blCount < blCopy.length; blCount++) {
      var currentRoute = blCopy[blCount];
      var alternateRoute = alterRoute(currentRoute);
      if (assessFitness(alternateRoute) < assessFitness(currentRoute)) {
        bloodlines[blCount] = alternateRoute;
      }
    }
    mutations++;
    if (mutations % options.numberOfBloodlines === 0) {
      availableResources--;
    }
  }
  var optimalRoute = bloodlines[0];
  for (var survivorCount = 1; survivorCount < bloodlines.length; survivorCount++) {
    var survivor = bloodlines[survivorCount];
    if (assessFitness(survivor) < assessFitness(optimalRoute)) {
      optimalRoute = survivor;
    }
  }
  return optimalRoute;
};

var createRoute = function(cities) {
  var route = cities.slice();
  for (var i = 0; i < route.length; i++) {
    var randomIndex = Math.floor(Math.random() * i);
    route[i] = route[randomIndex];
    route[randomIndex] = cities[i];
  }
  return route;
};

var alterRoute = function(route) {
  var routeCopy = route.slice();
  var idx1 = Math.floor(Math.random() * routeCopy.length);
  var tmpCity1 = routeCopy[idx1];
  var idx2 = idx1;
  while (idx2 === idx1) {
    idx2 = Math.floor(Math.random() * routeCopy.length);
  }
  routeCopy[idx1] = routeCopy[idx2];
  routeCopy[idx2] = tmpCity1;
  return routeCopy;
};

var calculateDistance = function(route) {
  var distances = route.map(function(city, index, route) {
    var nextCity = route[index + 1] || route[0];
    var distance = distanceCalculator(city, nextCity);
    return distance;
  });

  return distances.reduce(function(distance1, distance2) {
    return distance1 + distance2;
  });
};
