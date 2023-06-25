function loadArticle(title) {
  var url = encodeURI(title);
  if (url == null) {
    url = 'default.html';
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const data = xmlHttp.responseText;
      const node = document.getElementsByClassName('home')[0];
      node.innerText = '';
      node.innerHTML = data;

      window.highlightFormat();
      ga('set', 'page', url);
      ga('send', 'pageview');
    }
  };
  xmlHttp.open('GET', url, true); // true for asynchronous
  xmlHttp.send(null);
}

var QueryString = (function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    // If first entry with this name
    if (query_string[pair[0]] == null) {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
})();

document.addEventListener("DOMContentLoaded", function(event) { 
    var page = QueryString.page;
    //alert(page);
    if (
      window.location.pathname.indexOf('index.html') >= 0 ||
      window.location.pathname === '/'
    ) {
      loadArticle(page);
    }
});

