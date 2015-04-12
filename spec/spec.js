var testCitiesShort = [
  {"latitude":38.579065,"longitude":-121.491014,"name":"Sacramento"},
  {"latitude":39.74001,"longitude":-104.992259,"name":"Denver"},
  {"latitude":33.748315,"longitude":-84.391109,"name":"Atlanta"},
  {"latitude":42.358635,"longitude":-71.056699,"name":"Boston"},
  {"latitude":30.267605,"longitude":-97.742984,"name":"Austin"},
];

var testCitiesLong = [
  {"latitude":38.579065,"longitude":-121.491014,"name":"Sacramento"},
  {"latitude":39.74001,"longitude":-104.992259,"name":"Denver"},
  {"latitude":33.748315,"longitude":-84.391109,"name":"Atlanta"},
  {"latitude":42.358635,"longitude":-71.056699,"name":"Boston"},
  {"latitude":30.267605,"longitude":-97.742984,"name":"Austin"},
  {"latitude":40.759505,"longitude":-111.888229,"name":"Salt Lake City"},
  {"latitude":44.943829,"longitude":-93.093326,"name":"Saint Paul"},
  {"latitude":39.76691,"longitude":-86.149964,"name":"Indianapolis"},
  {"latitude":21.30477,"longitude":-157.857614,"name":"Honolulu"},
  {"latitude":33.44826,"longitude":-112.075774,"name":"Phoenix"},
];

describe("calculateDistance", function(){
  it('should accurately calculate the distance between two cities', function(){
    var cities = testCitiesShort.slice(0,2);
    console.log(calculateDistance);
    var distance = calculateDistance(cities);
    expect(Math.floor(distance)).to.equal(2852653);
  });

  it('should accurately calculate the distance of a route of many cities', function(){
    var cities = testCitiesShort;
    var distance = calculateDistance(cities);
    expect(Math.floor(distance)).to.equal(9963888);
  });
});

describe("createRoute", function(){
  it('should create a route that visits every city exactly once', function(){
    var route = createRoute(testCitiesShort);
    var visitedCities = {};
    for(var i = 0; i < route.length; i++){
      visitedCities[route[i].name] = true;
    }
    var cityCount = Object.keys(visitedCities).length;

    expect(cityCount).to.equal(Object.keys(testCitiesShort).length);
  });

  it('should not modify the original city list', function(){
    var route = createRoute(testCitiesShort);
    expect(route).to.not.equal(testCitiesShort);
  });
});

describe("alterRoute", function(){
  it('should not modify the parent route', function(){
    var parent = testCitiesShort;
    var offspring = alterRoute(parent);
    expect(offspring).to.not.equal(parent);
  });

  it('should have the same number of cities as the parent route', function(){
    var parent = testCitiesShort;
    var offspring = alterRoute(parent);
    expect(parent.length).to.equal(offspring.length);
  })

  it('should swap 0 or 2 values from the parent route', function(){
    var parent = testCitiesShort;
    var offspring = alterRoute(parent);
    var swapCount = 0;

    for(var i = 0; i < offspring.length; i++){
      if(offspring[i] !== parent[i]){
        swapCount++;
      }
    }

    expect(swapCount === 0 || swapCount === 2);
  });
});

describe("geneticSalesman", function(){
  it('should return a route that visits all cities exactly once', function(){
    var route = geneticSalesman(cities, calculateDistance, createRoute, alterRoute, 100);
    var visitedCities = {};
    for(var i = 0; i < route.length; i++){
      visitedCities[route[i].name] = true;
    }

    var cityCount = Object.keys(visitedCities).length;

    expect(cityCount).to.equal(Object.keys(cities).length);
  });

  it('should find the optimal solution for n=5 (most of the time)', function(){
    var route = geneticSalesman(testCitiesShort, calculateDistance, createRoute, alterRoute, 100);
    var optimizedRoute = ["Austin", "Sacramento", "Denver", "Boston", "Atlanta"];

    var routeNames = [];
    for(var i = 0; i < route.length; i++){
      routeNames.push(route[i].name);
    }

    // var austin = routeNames.indexOf("Austin")
    // routeNames.concat(routeNames.slice(0, austin));

    // if(routeNames[0] === "Atlanta"){
    //   routeNames.reverse();
    // }

    var austin = routeNames.indexOf("Austin");
    routeNames= routeNames.slice(austin).concat(routeNames.slice(0, austin));
    
    if(routeNames[4] === "Sacramento"){
      routeNames.reverse();
    }

    austin = routeNames.indexOf("Austin");
    routeNames= routeNames.slice(austin).concat(routeNames.slice(0, austin));

    var equalRoutes = true;
    for(var i = 0; i < routeNames.length; i++){
      if(routeNames[i] !== optimizedRoute[i]){
        equalRoutes = false;
      }
    }

    expect(equalRoutes);
  });

  it('should return a partially optimized solution for n=50', function(){
    var route = geneticSalesman(cities, calculateDistance, createRoute, alterRoute, 100);
    var distance = calculateDistance(route);
    expect(distance).to.be.below(40000000);
  });
});
