const btnfecth = document.getElementById('search-form-fecth');
const btnhrx = document.getElementById('search-form-xhr');

const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

btnfecth.addEventListener('click', function(e) {
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=dfcd365f4d354fd4abb3e5308452082b`;
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(addNews)
    .catch(displayErrors);
});


function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res) {
  return res.json()
    .then(function(parsedData) {
      return parsedData.response.docs;
    });
}


function addNews(data) {
  if (data.length > 0) {
    data.forEach(function(article) {
      const html = `<div>
      <div>
      <img class="img-c" src="https://www.nytimes.com//${article.multimedia[0].url}">
      </div>
      <div>
      <h3 class="title">${article.headline.main}</h3>
      <p>${article.snippet}</p>
      </div>
      </div>`;
      responseContainer.innerHTML += html;
    });
  } else {
    alert('No hay registros para mostrar');
  }
}
function displayErrors(err) {
  console.log('INSIDE displayErrors!');
  console.log(err);
}

// XHR

btnhrx.addEventListener('click', function(e) {
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});
function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=dfcd365f4d354fd4abb3e5308452082b`);
  articleRequest.onload = addNewsxhr;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
function handleError() {
  console.log('Se ha presentado un error');
}

function addNewsxhr() {
  const data = JSON.parse(this.responseText);
  const articles = data.response.docs;
  if (articles.length > 0) {
    articles.forEach(function(article) {
      const html = `<div>
      <div>
      <img class="img-c" src="https://www.nytimes.com//${article.multimedia[0].url}">
      </div>
      <div>
      <h3 class="title">${article.headline.main}</h3>
      <p>${article.snippet}</p>
      </div>
      </div>`;
      responseContainer.innerHTML += html;
    });
  } else {
    alert('No hay registros para mostrar');
  }
}