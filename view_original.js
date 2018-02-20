// ==UserScript==
// @name        View original image for Google images
// @namespace   https://github.com/Brownies
// @description Click a search result to view original image instead of doing silly Google things
// @include     *google.com/search*tbm=isch*
// @exclude     %exclude%
// @version     0.1
// @grant       none
// ==/UserScript==


// This userscript will most likely not work on your browser out-of-the-box. I developed it on Pale Moon 27.7 and
// using images.google.com as the page for entering the query. If you use google.com for example, it will not work
// since it currently leads to a completely different results page(at least for me).


'use strict';
window.onload = function () {
  var results = document.querySelectorAll('a.rg_l');
  
  for (var i = 0; i < results.length; i++) {
    var href = new URL(results[i].href).search.substring(1).replace(/%2F/g, '/').replace('%3A', ':').split('&');
    var new_href = '';
    
    for (var j = 0; j < href.length; j++) {
      if (href[j].startsWith('imgurl=')) {
        new_href = href[j].substring(7);
        //console.log(new_href);
        break;
      }
    }
    
    results[i].setAttribute('href', new_href);
    results[i].setAttribute('rel', 'noreferrer'); //circumvent hotlink blocks
    results[i].setAttribute('target', '_blank');
    
    results[i].addEventListener('click', function (event) {
      event.stopPropagation();
    }, true);
  }
}
