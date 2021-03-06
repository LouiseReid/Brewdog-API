var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  // populateList(beers)
  populateSelector(beers)
};

var populateList = function(beers){
  var ul = document.getElementById('beer-list');
  for(var beer of beers){
    var beerName = document.createElement('li');
    beerName.innerText = beer.name;
    var beerImageLi = document.createElement('li');
    var beerImage = document.createElement('img');
    beerImage.src = beer.image_url;

    var maltIngredients = document.createElement('ul');
    for(var malt of beer.ingredients.malt){
      var ing = document.createElement('li')
      ing.innerText = malt.name;
      maltIngredients.appendChild(ing)
    }

    ul.appendChild(beerName)
    beerImageLi.appendChild(beerImage);
    ul.appendChild(beerImageLi)
    ul.appendChild(maltIngredients)

  }
}

var populateSelector = function(beers){
  var beersList = document.getElementById('beer-dropdown');

  for(var i = 0; i < beers.length; i++){
    var beer = beers[i];
    var option = document.createElement('option');
    option.innerText = beer.name;
    option.value = i;
    beersList.appendChild(option)
  }

  beersList.addEventListener('change', function(){
    var selectedBeer = beers[this.value];
    var beerName = document.getElementById('beer-name');
    beerName.innerText = selectedBeer.name;
    var beerImage = document.getElementById('beer-image');
    beerImage.src = selectedBeer.image_url;


    var maltIngredients = document.getElementById('malt-ingredients');
    maltIngredients.innerText = ""
    for(var malt of selectedBeer.ingredients.malt){
      var ing = document.createElement('li')
      ing.innerText = `${malt.name} ${malt.amount.value} ${malt.amount.unit}`;
      maltIngredients.appendChild(ing)
    }
    var hopsIngredients = document.getElementById('hops-ingredients');
    hopsIngredients.innerText = ""
    for(var hop of selectedBeer.ingredients.hops){
      var ing = document.createElement('li')
      ing.innerText = `${hop.name} ${hop.amount.value} ${hop.amount.unit}`;
      hopsIngredients.appendChild(ing)
    }
    var yeastIngredients = document.getElementById('yeast-ingredients');
    yeastIngredients.innerText = selectedBeer.ingredients.yeast

    var jsonString = JSON.stringify(selectedBeer);
    localStorage.setItem('selectedBeer', jsonString);

  })


}


var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete)

  var jsonString = localStorage.getItem('selectedBeer');
  var savedBeer = JSON.parse(jsonString);


  var beerName = document.getElementById('beer-name');
  beerName.innerText = savedBeer.name;
  var beerImage = document.getElementById('beer-image');
  beerImage.src = savedBeer.image_url;

  var maltIngredients = document.getElementById('malt-ingredients');
  maltIngredients.innerText = ""
  for(var malt of savedBeer.ingredients.malt){
    var ing = document.createElement('li')
    ing.innerText = `${malt.name} ${malt.amount.value} ${malt.amount.unit}`;
    maltIngredients.appendChild(ing)
  }
  var hopsIngredients = document.getElementById('hops-ingredients');
  hopsIngredients.innerText = ""
  for(var hop of savedBeer.ingredients.hops){
    var ing = document.createElement('li')
    ing.innerText = `${hop.name} ${hop.amount.value} ${hop.amount.unit}`;
    hopsIngredients.appendChild(ing)
  }
  var yeastIngredients = document.getElementById('yeast-ingredients');
  yeastIngredients.innerText = savedBeer.ingredients.yeast
}



window.addEventListener('load', app);
