(function (undefined) {
  'use strict';

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();



//--- VARIABLES ----------------------------------------------------------//

  var options = {
    snapPercent: 10,
    animationDuration: 300
  };

  var fps = 0,
    fpsCount = 0,
    lastScrollTop = 0,
    numOfLogs = 0,
    windowHeight = window.innerHeight,
    animationQuery = [];

  var states = {
    animating: false
  };


//--- FUNCTIONS ----------------------------------------------------------//

  // Linear interpolation
  function lerp(a, b, f) {
    return a + f * (b - a);
  }

  // Recal
  function recal() {

  }

  // Animate
  function animate(from, to, element) {
    if (from !== undefined && to !== undefined && element !== undefined) {
      states.animating = true;
      animationQuery.push({
        from: from,
        to: to,
        created: Date.now(),
        length: options.animationDuration,
        element: element
      });

    }
  }

  // Update/draw functions
  function updateLoop() {
    window.requestAnimFrame(updateLoop);
    update();
    fpsCount++;
    if (numOfLogs > 500) {
      console.clear();
    }
  }
  function update() {
    //console.log('draw');
    for (var i=0;i<animationQuery.length;i++) {
      var animation = animationQuery[i];
      var animationDone = false;
      var timeProgress = (Date.now() - animation.created) / animation.length;

      if (timeProgress > 1) {
        timeProgress = 1;
        animationDone = true;
      }

      console.log('timeProgress',timeProgress);

      var y = lerp(animation.from, animation.to, timeProgress);
      animation.element.scrollTop = y;
      lastScrollTop = y;

      if (animationDone) {
        animationQuery.splice(i,1);
        states.animating = false;
      }

    }
  }


//--- BINDINGS ----------------------------------------------------------//

  // Scroll
  document.querySelector('#scrollCapture').addEventListener('scroll', function (event) {
    if (states.animating) {
      return;
    }

    var container = this,
      scrollTop = container.scrollTop,
      direction = 0,
      percent = scrollTop / windowHeight * 100,
      snapPercent = percent % 100;

    if (scrollTop > lastScrollTop) {
      direction = 1;
    }
    else if (scrollTop < lastScrollTop) {
      direction = -1;
    }

    var newPos = scrollTop;

    if (direction > 0) {
      if (snapPercent >= options.snapPercent) {
        newPos = (percent + 100 - snapPercent) * windowHeight / 100;
      }
    }
    else if (direction < 0) {
      if (snapPercent <= (100 - options.snapPercent)) {
        newPos = (percent + 0 - snapPercent) * windowHeight / 100;
      }
    }

    if (newPos !== scrollTop) {
      //container.scrollTop = newPos;
      animate(scrollTop, newPos, container);
    }

    console.log('v-------------scrollCapture-------------v');
    console.log('scrollTop', scrollTop);
    console.log('lastScrollTop', lastScrollTop);
    console.log('direction', direction);
    console.log('windowHeight', windowHeight);
    console.log('percent', percent);
    console.log('snapPercent', snapPercent);
    console.log(' ');

    lastScrollTop = scrollTop;
  });

  // Resize
  window.addEventListener('resize', function(event){
    console.log('resize');
    windowHeight = window.innerHeight;
  });

  // Fps set
  setInterval(function() {
    fps = fpsCount;
    fpsCount = 0;
  },1000);

//--- INIT ----------------------------------------------------------//

  // Start draw loop
  updateLoop();


  //console.log(lerp(100,500,0.5)); == 300

})();
