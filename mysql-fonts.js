// ==UserScript==
// @name        Mysql fonts
// @namespace   WEBSITE
// @author			drwonky
// @include     https://dev.mysql.com/doc/*
// @include     http://dev.mysql.com/doc/*
// @version     1
// @grant       none
// ==/UserScript==
//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#docs-body { color: #000; font-family: "Helvetica,Arial,sans-serif"; font-size: 14px; line-height: 180%; max-width: 720px; }'); 
