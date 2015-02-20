!(function(){
  var preload = new createjs.LoadQueue();
  preload.addEventListener("fileload", handleFileComplete);
  preload.loadFile("assets/images/bg.jpg");



  function handleFileComplete(event) {
    loading = document.getElementById('loading');
    loading.className = 'loaded';
    transitionEnd(loading).bind(function(){
        loading.parentNode.removeChild(loading);
    });
  }
})()
