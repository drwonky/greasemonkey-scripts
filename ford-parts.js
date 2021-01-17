// ==UserScript==
// @name     Ford Parts Full Part Number
// @author	 drwonky
// @version  1
// @match    https://parts.ford.com/*
// @grant    none
// @run-at   document-end
// ==/UserScript==

(function() {

  var getMeta = function (metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }

    return '';
  }

  var hyphenate = function (str) {
  
    const regexp = /(\w{4})(\d+)(\D+)/g;

		const array = [...str.matchAll(regexp)]

		array[0].shift();
    
    return array[0].join('-');    
  }
  
  var addPartNumber = function (el) {
    var pnSpan = document.createElement('span');
    var oldPn = el.querySelector('.productPartNumber');

    pnSpan.className = 'productPartNumber';
    pnSpan.innerText = hyphenate(partNumber);
 
		if (oldPn.style !== undefined) oldPn.style.display = 'none';
    
    el.appendChild(pnSpan);
  }
  
  var fixupSearchResult = function (container) {
	  var carthref = container.querySelector('.addToCartButtonContainer > a');
      
    if (carthref) {
      var pnumber = container.querySelector('.pNumber');
      
      if (pnumber) {
	      pnumber.style.whiteSpace='nowrap';

        var pnSpan = document.createElement('b');

        var attr = carthref.attributes['ana-productinfo'];

        if (attr) {
          var part = hyphenate(attr.nodeValue);

          pnSpan.innerText = '('+part+')';

          pnumber.appendChild(pnSpan);

        }
      }
    }
  }
  
  var partNumber = getMeta('pageIdentifier');
  
  var partContainers = document.querySelectorAll('.partNonImageContainer');
  
  if (partContainers) partContainers.forEach(fixupSearchResult);
  if (partNumber != '')	document.querySelectorAll('.partNumSection').forEach(addPartNumber);
  
  
})();
