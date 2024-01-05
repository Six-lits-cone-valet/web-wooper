const unfilter_btn = document.getElementById('unfilter');
const addScroll_btn = document.getElementById('addScroll');
const deleteIframes_btn = document.getElementById('deleteIframes');
const disableJS_btn = document.getElementById('disableJS');

unfilter_btn.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "unfilter" }, function (response) {
            console.log("sending in popup");
        });
    });
})

addScroll_btn.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "addScroll" }, function (response) {
            console.log("sending in popup");
        });
    });
})

deleteIframes_btn.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "deleteIframes" }, function (response) {
            console.log("sending in popup");
        });
    });
})

disableJS_btn.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "disableJS" }, function (response) {
            console.log("sending in popup");
        });
    });
})