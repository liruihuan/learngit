(function (Win, LRH) {

    function PressEvent(element, onlyClick, pressClick, moveHandle) {
        let xStart = xEnd = yStart = yEnd = timer = null,
            press = false;

        const doc = Win.document;
        this.onlyClick = typeof onlyClick === 'function' ? onlyClick : new Function();
        this.pressClick = typeof pressClick === 'function' ? pressClick : new Function();
        this.moveHandle = typeof moveHandle === 'function' ? moveHandle : new Function();
        this.targetElement = (element !== undefined) ? doc.querySelector(element) : doc || Win;
        this.targetElement.addEventListener('touchstart', (e) => {
            xStart = e.touches ? e.touches[0].clientX : e.clientX;
            yStart = e.touches ? e.touches[0].clientY : e.clientY;
            timer = setTimeout(() => {
                if (timer !== null) {
                    press = true;
                    this.pressClick()
                }
            }, 500)

        });
        this.targetElement.addEventListener('mousedown', (e) => {
            xStart = e.touches ? e.touches[0].clientX : e.clientX;
            yStart = e.touches ? e.touches[0].clientY : e.clientY;
            timer = setTimeout(() => {
                if (timer !== null) {
                    press = true;
                    this.pressClick()
                }
            }, 500)

        });
        this.targetElement.addEventListener('touchend', () => {           
            clearTimeout(timer)
            xStart = xEnd = yStart = yEnd = timer = null;
            if (!press) {
                this.onlyClick()
            }
            press = false;
        });
        this.targetElement.addEventListener('mouseup', () => {          
            clearTimeout(timer)
            xStart = xEnd = yStart = yEnd = timer = null;
            if (!press) {
                this.onlyClick()
            }
            press = false;
        });
        this.targetElement.addEventListener("mousemove", (e) => {
            this.tempDeclaration(e)
        });
        this.targetElement.addEventListener("touchmove", (e) => {
            this.tempDeclaration(e)
        });
        this.tempDeclaration = function (e) {
            if (!xStart)
                return;
            press = true; //防止松开触发点击事件
            timer = null; //防止移动时触发长按事件
            xEnd = e.touches ? e.touches[0].clientX : e.clientX;
            yEnd = e.touches ? e.touches[0].clientY : e.clientY;
            try {
                this.moveHandle(e, xStart, xEnd, yStart, yEnd)
                xStart = xEnd;
                yStart = yEnd;
            } catch (error) {
                console.log(error)
            }

        }

    };
    LRH.PressEvent = PressEvent
})(window, window['LRH'] || (window['LRH'] = {}))