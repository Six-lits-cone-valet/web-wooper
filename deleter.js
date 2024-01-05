///////////////////////
// table of contents //
// 1 - runtime messaging
// 2 - waiting for page to load
// 3 - utility functions
///////////////////////
console.log('eric');


// 1 - runtime messaging
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.command === "unfilter") {
            console.log('received unfilter command, trying to unfilter');
            sendResponse({ result: "success" });
            unfilterAllElements();
        } else if (request.command === "addScroll") {
            sendResponse({ result: "success" });
            addScroll();
            deepCorrection();
        } else if (request.command === "deleteIframes") {
            sendResponse({ result: "success" });
            deleteIframes();
        } else if (request.command === "disableJS") {
            sendResponse({ result: "success" });
            console.log('disabling JS');
            
            'use strict';

            (function () {
                var tags = document.getElementsByTagName('noscript');

                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].firstChild) {
                        var newDiv = document.createElement('div');
                        newDiv.innerHTML = tags[i].innerHTML;
                        tags[i].parentNode.replaceChild(newDiv, tags[i]);
                    }
                }
            })();

        }
});

// 2 - waiting for page to load
window.addEventListener('load', (event) => {

    addDeleterEventListener(document);

})


// 3 - utility functions


function addDeleterEventListener(doc) {
    doc.addEventListener('mousedown', (event) => {
        // console.log("mouse down");
        event.stopPropagation();
        event.preventDefault();

        if (event.ctrlKey && event.altKey) {
            console.log("ctrl, alt, clicked !!");
            event.target.remove();
        }
    }, { capture: true, composed: true });
}

function addScroll() {
    let html = document.querySelector('html');
    let body = document.querySelector('body');
    let main = document.querySelector('main');

    if (html) {
        console.log('fixing html');
        html.style.cssText = 'overflow-y: scroll !important';
        html.style.setProperty('overflow', 'scroll', '!important');
        html.style.setProperty('position', 'static', '!important');
        html.style.setProperty('overflow', 'scroll', '!important');
        html.style.setProperty('overflow-y', 'scroll', '!important');
        html.style.setProperty('position', 'static', '!important');
    }

    if (body) {
        console.log('fixing body');
        body.style.cssText = 'overflow-y: scroll !important';
        body.style.cssText = 'position: static !important';
        body.style.setProperty('overflow', 'scroll', '!important');
        body.style.setProperty('overflow-y', 'scroll', '!important');
        body.style.setProperty('position', 'static', '!important');
    }

    if (main) {
        console.log('fixing main');
        main.style.cssText = 'overflow-y: scroll !important';
        main.style.cssText = 'position: static !important';
        main.style.setProperty('overflow', 'scroll', '!important');
        main.style.setProperty('overflow', 'scroll', '!important');
        main.style.setProperty('overflow-y', 'scroll', '!important');
        main.style.setProperty('position', 'static', '!important');
    }

}

function unfilterAllElements() {
    var allElements = document.querySelectorAll('*');

    for (let i = 0; i < allElements.length; i++) {
        let inlineFilter = allElements[i].style.filter;
        let cssRuleFilter = window.getComputedStyle(allElements[i]).filter;

        if (inlineFilter !== '' || cssRuleFilter !== 'none') {
            console.log('found this filtered element: ', allElements[i]);
            allElements[i].style.filter = 'none';
        }
    }
} 

//this function will go throuh all element
// and check for scrollability and correct it
function deepCorrection() {

    var allElements = document.querySelectorAll('*');

    for (let i = 0; i < allElements.length; i++) {
        let styleRules = [
            allElements[i].style.overflow,
            window.getComputedStyle(allElements[i]).overflow,
            allElements[i].style.overflowY,
            window.getComputedStyle(allElements[i]).overflowY
        ];

        styleRules.forEach((rule) => {
            if (rule.contains('hidden')) {
                allElements[i].style.overflow = "scroll";
            }
        });
    }
}

function deleteIframes() {
    let iframes = document.querySelectorAll('iframe');

    console.log(iframes);

    iframes.forEach((iframe) => {
        iframe.remove();
    });
}