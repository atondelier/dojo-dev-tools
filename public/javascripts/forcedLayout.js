;(function() {
    "use strict";

    var intervalIndex = null;
    var active = false;
    var ul = document.getElementById('ul');
    var liRetainingArray = window.liRetainingArray = [];
    var readHeightCheckBox = document.getElementById('readHeightCheckBox');

    function HeavyObject() {
        this.heavyString = new Array(1e5).join(' ');
    }

    function createLi() {
        var li = document.createElement('li');
        var customContent = document.createElement('customContent');
        customContent.textContent = 'li';
        li.appendChild(customContent);
        return li;
    }

    function readHeight() {
        ul.scrollHeight;
    }

    function clearUl() {
        while(ul.firstChild) ul.removeChild(ul.firstChild);
    }

    function fillUl() {
        console.time('fillUl');
        clearUl();
        var n = 1e0;
        while(n--) appendLi();
        console.timeEnd('fillUl');
    }

    function appendLi() {
        var liClone = createLi();
        liRetainingArray.push(liClone);
        liClone._heavyObject = new HeavyObject();
        ul.appendChild(liClone);
        if(readHeightCheckBox.checked) readHeight();
    }

    function toggle() {
        (active = !active) ? start() : stop();
    }

    function start() {
        console.timeline('experiment');
        intervalIndex = setInterval(fillUl, 1000);
        fillUl();
    }

    function stop() {
        console.timelineEnd('experiment');
        clearInterval(intervalIndex);
        intervalIndex = null;
    }

    function clearLiRetainingArray() {
        liRetainingArray.length = 0;
    }

    document.getElementById('toggle').addEventListener('click', toggle, false);
    document.getElementById('clearLiRetainingArray').addEventListener('click', clearLiRetainingArray, false);

})();