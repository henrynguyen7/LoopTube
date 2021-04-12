'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [ new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.youtube.com' },
      })],
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    let queryString = url.substring(url.indexOf("?"), url.length);
    let videoId = new URLSearchParams(queryString).get('v');
    chrome.tabs.create({ url: chrome.runtime.getURL("tubelooper.html?v=" + videoId) });
  });
});