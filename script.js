'use strict'

function getUserInput(){
  $('#js-form').on('submit', function(){
    event.preventDefault();
    let state = document.getElementById("js-search-term").value;
    let limit = document.getElementById("js-max-results").value;
    const queryString = 'stateCode=' + state + '&limit=' + limit;
    console.log(queryString);
    formulateRequest(queryString)
  });
}

function formulateRequest(queryString){
  const baseURL = 'https://developer.nps.gov/api/v1/parks';
  const apiKey = 'api_key=gEThUBZziE0HqLA7Eay4xZje3S1xnicnbIXOyRm2';
  const start = 'start=0';
  const url = baseURL + '?' + apiKey + '&' + start + '&' + queryString;
  sendGET(url);
}

function sendGET(url){
  fetch(url)
    .then(response => response.json() )
    .then(responseJson => grabResponses(responseJson))
    .catch(error => alert('Something went wrong, try reformatting the state code with lowercase letters and separate by comma'))
}

function grabResponses(responseJson){
  $('#results-list').empty();
  let theLimit = document.getElementById("js-max-results").value;

  console.log(responseJson)

  for(let i = 0; i < theLimit; i++){
    let parkName = responseJson.data[i].name;
    let description = responseJson.data[i].description;
    let parkURL = responseJson.data[i].url;
    displayResults(parkName, description, parkURL, );
  }
}

function displayResults(parkName, description, parkURL){
  $('#results-list').append(`
  <li>
  <p>Name of park:  ${parkName}</p>

  <p>Description of park: <p>${description}</p>

  <p>Park website: <p><a href="${parkURL}">Go to park website!</a></p>
  </li>
  `)
  $('.results').removeClass('hidden');
}

$(function runIt() {
  $(document).ready() 
  console.log('Locked n Loaded');
  getUserInput();
});