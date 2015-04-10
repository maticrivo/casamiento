!(function(scope) {

  function handleFileComplete(event) {
    $('#main').fullpage({
      easingcss3: 'ease',
      autoScrolling: true,
      normalScrollElements: '#rsvp',
      controlArrows: false,
      scrollOverflow: true,
      fitToSection: true
    });

    loading = document.getElementById('loading');
    loading.className = 'loaded';
    transitionEnd(loading).bind(function() {
      $('#main').addClass('loaded');
      loading.parentNode.removeChild(loading);
    });
  }

  function Casamiento() {
    var preload = new createjs.LoadQueue();
    preload.addEventListener('fileload', handleFileComplete);
    preload.loadFile('assets/images/bg.jpg');
  }

  Casamiento.prototype = {
    rsvp: false,

    validate_rsvp: function validate_rsvp() {
      return false;
    }
  };

  /*function initialize() {
    var mapOptions = {
      center: {
        lat: 32.2198,
        lng: 34.936
      },
      zoom: 15,
      styles: [{
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": 33
        }]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
          "color": "#f2e5d4"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c5dac6"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c5c6c6"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e4d7c6"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fbfaf7"
        }]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#acbcc9"
        }]
      }]
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);*/

  scope['Casamiento'] = new Casamiento();
})(window)
