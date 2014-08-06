;(function() {
    "use strict";

    console.time = console.time || function() {};
    console.timeEnd = console.timeEnd || function() {};

    var ul = document.getElementById('ul');
    var readHeightCheckBox = document.getElementById('readHeightCheckBox');
    var amountOfLiAppendInput = document.getElementById('amountOfLiAppendInput');
    var heavyStringLengthInput = document.getElementById('heavyStringLengthInput');
    var useFragmentCheckBox = document.getElementById('useFragmentCheckBox');

    var intervalIndex = null;
    var active = false;
    var liRetainingArray = window.liRetainingArray = [];

    function HeavyObject() {
        this.heavyString = new Array(+heavyStringLengthInput.value).join(' ');
    }

    function createLi() {
        var li = document.createElement('li');
        var customContent = document.createElement('customContent');
        customContent.textContent = 'li';
        customContent._heavyObject = new HeavyObject();
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
        var n = +amountOfLiAppendInput.value;
        var useFragment = useFragmentCheckBox.checked;
        if(useFragment) {
            var fragment = document.createDocumentFragment();
            while(n--) fragment.appendChild(appendLi(true));
        } else {
            while(n--) appendLi();
        }
        if(useFragment) {
            console.log('fragment');
            ul.appendChild(fragment);
        }
        console.timeEnd('fillUl');
    }

    function appendLi(useFragment) {
        var li = createLi();
        liRetainingArray.push(li);
        if(!useFragment) ul.appendChild(li);
        if(readHeightCheckBox.checked) readHeight();
        return li;
    }

    function toggle() {
        (active = !active) ? start() : stop();
    }

    function start() {
        intervalIndex = setInterval(fillUl, 1000);
        fillUl();
    }

    function stop() {
        clearInterval(intervalIndex);
        intervalIndex = null;
    }

    function clearLiRetainingArray() {
        liRetainingArray.length = 0;
    }

    document.getElementById('toggle').addEventListener('click', toggle, false);
    document.getElementById('clearLiRetainingArray').addEventListener('click', clearLiRetainingArray, false);

})();