'use strict'

const apiKey = 'gEThUBZziE0HqLA7Eay4xZje3S1xnicnbIXOyRm2'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=gEThUBZziE0HqLA7Eay4xZje3S1xnicnbIXOyRm2';

const queryString = formatQueryParams(params)
const url = searchURL + '?' + queryString;

function formatQueryParams(params){

    const queryItems = Object.keys(params)

        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        console.log(queryItems.join('&'));
}

function displayResults(){

}

function getParks(){
    const params = {
        key: apiKey,
        q: query,
        part: 'snippet',
        maxResults,
        type: 'video'
      };
    fetch('')
}

function initSubmit(){

}



//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////



// put your own value below!
const apiKey = 'gEThUBZziE0HqLA7Eay4xZje3S1xnicnbIXOyRm2'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=gEThUBZziE0HqLA7Eay4xZje3S1xnicnbIXOyRm2';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, maxResults=50) {
  const params = {
    key: apiKey,
    q: query,
    stateCode: 'ca',
    maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);