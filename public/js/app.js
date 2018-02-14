const formfetch = document.getElementById('search-form-fetch');
const formxhr = document.getElementById('search-form-xhr');
const searchField = document.getElementById('search-keyword-fetch');
const responseContainerfetch = document.getElementById('response-container-fetch');
const responseContainerxhr = document.getElementById('response-container-xhr');
let searchedForText;

formfetch.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainerfetch.innerHTML = '';
  searchedForText = searchField.value;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=dfcd365f4d354fd4abb3e5308452082b`;
  fetch(url)
  .then(handleErrors)
  .then(parseJSON)
  .then(addNews)
  .catch(displayErrors);
});

function handleErrors(res){
  if(!res.ok){
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res){
  return res.json()
    .then(function(parsedData){
          return parsedData.response.docs[0];

    })
}


function addNews(data) {
  const title=data.headline.main;
  const snippet=data.snippet;
  let li=document.createElement('li');
  li.className='articleClass';
  li.innerText=snippet;
  responseContainerfetch.appendChild(li);
}

function displayErrors(err){
  console.log("INSIDE displayErrors!");
  console.log(err);
}

// ------XHR-----

formxhr.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainerxhr.innerHTML = '';
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
  const article = data.response.docs[0];
  const title=article.headline.main;
  const snippet=article.snippet;
  let li=document.createElement('li');
  li.className='articleClass';
  li.innerText=snippet;
  responseContainerxhr.appendChild(li);
}
