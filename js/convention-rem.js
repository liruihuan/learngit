(function (doc, win) {
    var docEl = doc.documentElement,
        metaEl = doc.querySelector('meta[name="viewport"]'),
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    /** 查询有没有meta属性，没有的情况下加上 <meta content='initial-scale= scale, maximum-scale=scale, minimum-scale=scale, user-scalable=no/>
     * */
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        const scale = 1;
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 750) {
            docEl.style.fontSize = '100px';
        } else {
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        }
    }

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 + 'px';
        }, false);
    }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem, false);
    doc.addEventListener('DOMContentLoaded', refreshRem, false);
})(document, window);