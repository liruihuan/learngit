let frame1 = document.getElementById('frame1'),
    frame2 = document.getElementById('frame2'),
    frame3 = document.getElementById('frame3'),
    labels = document.querySelectorAll('label'),
    ctx = frame3.getContext('2d'),
    slider = document.getElementById('slider'),
    frameWidth = 480,
    frameHeight = 327,
    activeFrame = 0,
    frames = 34,
    xStart = null,
    s2Settings = {
        sensitivity: 40
    },
    s3Settings = {
        fps: 20,
        reverse: false
    },
    now, delta, then = Date.now(),
    interval = 1000 / s3Settings.fps,    
    runCanvas = false;

let gui = new dat.GUI(),
    s2 = gui.addFolder('Drag / Swipe'),
    s3 = gui.addFolder('Canvas');

s2.add(s2Settings, "sensitivity", 10, 80, 1);
s3.add(s3Settings, "fps", 1, 60, 1).onChange(() => {interval = 1000 / s3Settings.fps;});
s3.add(s3Settings, "reverse");

s2.open();
s3.open();

let sprite = new Image();
sprite.onload = function() {
    frame1.style.background = frame2.style.background = `url(${sprite.src})`;
    document.getElementById('overlay').style.display = 'none';
    
    solution1(); //input range
    solution2(); // drag / swipe
    solution3(); // canvas
    
    labels.forEach(function(element) {
      element.addEventListener('click', function() {
          runCanvas = false;
          if(this.getAttribute('for') == "sol3")
              runCanvas = true;
      });
    });
};
sprite.src = 'img/b.jpg';

function solution1() {    
    slider.addEventListener("input", function() {
        activeFrame = parseInt(this.value);
        frame1.style.backgroundPositionX = `-${activeFrame * frameWidth}px`;
    });
}

function solution2() {
    frame2.addEventListener('touchstart', (e) => {
        xStart = e.touches ? e.touches[0].clientX : e.clientX;
    });
    frame2.addEventListener('mousedown', (e) => {
        xStart = e.touches ? e.touches[0].clientX : e.clientX;
    });
    frame2.addEventListener('touchend', () => { xStart = null; });
    frame2.addEventListener('mouseup', () => { xStart = null; });
    frame2.addEventListener("mousemove", move);
    frame2.addEventListener("touchmove", move);
}

function move(e) {
    if(!xStart)
        return;
    
    let xEnd = e.touches ? e.touches[0].clientX : e.clientX;
    if (xStart - xEnd > .5 * frameWidth / (10 + s2Settings.sensitivity)) {
        activeFrame++;
        if(activeFrame > frames)
            activeFrame = 0;
        frame2.style.backgroundPositionX = `${activeFrame * frameWidth}px`;
        xStart = xEnd;
    } else if(xEnd - xStart > .5 * frameWidth / (10 + s2Settings.sensitivity)) {
        activeFrame--;
        if(activeFrame < 0)
            activeFrame = frames;
        frame2.style.backgroundPositionX = `${activeFrame * frameWidth}px`;
        xStart = xEnd;
    }
}

function solution3() {
    frame3.width = frameWidth;
    frame3.height = frameHeight;
    animate();
}

function animate() { 
    now = Date.now();
    delta = now - then;
    
    if(runCanvas && delta > interval) {
        if(activeFrame > frames)
            activeFrame = 0;
        else if(activeFrame < 0)
            activeFrame = frames;

        ctx.drawImage(
            sprite, activeFrame * frameWidth, 0, frameWidth, frameHeight, 
            0, 0, frameWidth, frameHeight
        );
        
        activeFrame += (s3Settings.reverse) ? -1 : 1;
        then = now - (delta % interval);
    }
    window.requestAnimationFrame(animate);
}