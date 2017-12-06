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
  populateList(beers)

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


    console.log(beer.ingredients.malt[0].name);


    ul.appendChild(beerName)
    beerImageLi.appendChild(beerImage);
    ul.appendChild(beerImageLi)
    ul.appendChild(maltIngredients)

  }
}


var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete)

}

window.addEventListener('load', app);
