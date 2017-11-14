var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    //'<h2>' +
   // '<a class="js-result-name" href="" target="_blank"></a> by <a class="js-user-name" href="" target="_blank"></a></h2>' +
    '<p class="js-thumbnail"></p>' + 
   
  '</div>'
);

function getDataFromApi(searchTerm, snippet, callback) {
  var query = {
    q: searchTerm,
    part: snippet,
    key: 'AIzaSyDhoZ0-vCuJi4o9HaxP-GZEa7kEazZQveE',
    per_page: 10
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(item) {
  var template = $(RESULT_HTML_TEMPLATE);

  template.find(".js-thumbnail").prepend(`<img src="${item.snippet.thumbnails.medium.url}"/>`);
  return template;
}

function displayYoutubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();

    // clear out the input

    getDataFromApi(query, 'snippet',displayYoutubeSearchData);

  });
}

$(watchSubmit);
