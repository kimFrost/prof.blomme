(function (window, undefined) {
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

  window.snap = {};
  window.snap.scrolltoIndex = scrolltoIndex;
  window.snap.activeIndex = 0;

//--- VARIABLES ----------------------------------------------------------//

  var options = {
    snapPercent: 10,
    animationDuration: 300
  };

  var fps = 0,
    fpsCount = 0,
    lastScrollTop = 0,
    numOfLogs = 0,
    debounceTimer = null,
    windowHeight = window.innerHeight,
    activePanelIndex = 0,
    animationQuery = [];

  var states = {
    animating: false
  };


//--- FUNCTIONS ----------------------------------------------------------//

  // Linear interpolation
  function lerp(a, b, f) {
    return a + f * (b - a);
  }

  // Debounce
  var debounce = function (func, threshold) {

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function(){
      func();
    },threshold);

    /*
    var timeout;
    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap) {
          func.apply(obj, args);
        }
        timeout = null;
      }

      if (timeout) {
        clearTimeout(timeout);
      }
      else if (execAsap) {
        func.apply(obj, args);
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
    */

  };

  // Recal
  function recal() {
    console.log('recal');
  }

  function scrolltoIndex(index){
    if (index !== undefined) {
      var container = document.querySelector('#scrollCapture');
      var scrollTop = container.scrollTop;
      var newPos = scrollTop;
      newPos = windowHeight * index;
      if (newPos !== scrollTop) {
        animate(scrollTop, newPos, container);
      }
    }
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

      //console.log('timeProgress',timeProgress);

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
      //return;
    }
    var container = this,
      scrollTop = container.scrollTop,
      direction = 0,
      percent = scrollTop / windowHeight * 100,
      snapPercent = percent % 100;

    debounce(function() {
      if (scrollTop > lastScrollTop) {
        direction = 1;
      }
      else if (scrollTop < lastScrollTop) {
        direction = -1;
      }

      var newPos = scrollTop;
      var newIndex = activePanelIndex;

      if (direction > 0) {
        if (snapPercent >= options.snapPercent) {
          newPos = (percent + 100 - snapPercent) * windowHeight / 100;
          newIndex = Math.floor((percent + 100 - snapPercent) / 100);
        }
        else {
          newIndex = Math.floor((percent) / 100);
        }
      }
      else if (direction < 0) {
        if (snapPercent <= (100 - options.snapPercent)) {
          newPos = (percent - snapPercent) * windowHeight / 100;
          newIndex = Math.floor((percent - snapPercent) / 100);
        }
        else {
          newIndex = Math.floor((percent) / 100);
        }
      }

      //activePanelIndex = newIndex;

      if (newPos !== scrollTop) {
        animate(scrollTop, newPos, container);
      }

      /*
      console.log('v-------------scrollCapture-------------v');
      console.log('newIndex', newIndex);
      console.log('newPos', newPos);
      console.log('scrollTop', scrollTop);
      console.log('lastScrollTop', lastScrollTop);
      console.log('direction', direction);
      console.log('windowHeight', windowHeight);
      console.log('percent', percent);
      console.log('snapPercent', snapPercent);
      console.log(' ');
      */

      lastScrollTop = scrollTop;
    }, 300);


    //activePanelIndex = newIndex;
    //window.snap.activeIndex = activePanelIndex;

  });

  // Resize
  window.addEventListener('resize', function(event){
    //console.log('resize');
    windowHeight = window.innerHeight;
    var container  = document.querySelector('#scrollCapture');
    container.scrollTop = activePanelIndex * windowHeight;
    lastScrollTop = container.scrollTop;
    /*
    debounce(function() {
      var container  = document.querySelector('#scrollCapture');
      var scrollTop = container.scrollTop;
      var percent = scrollTop / windowHeight * 100;
      var newIndex = Math.round(percent / 100);
      console.log('percent', percent);
      console.log('newIndex', newIndex);
      container.scrollTop = newIndex * windowHeight;
    }, 100);
    */
  });

  // Fps set
  setInterval(function() {
    fps = fpsCount;
    fpsCount = 0;
  },1000);

  setInterval(function() {
    var container = document.querySelector('#scrollCapture');
    var scrollTop = container.scrollTop;
    var index = Math.round(scrollTop / windowHeight);
    window.snap.activeIndex = index;
  },300);

//--- INIT ----------------------------------------------------------//

  // Start draw loop
  updateLoop();

})(window);
