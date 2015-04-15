!(function(scope) {

  function Casamiento() {
    var preload = new createjs.LoadQueue();
    preload.addEventListener('fileload', this.handleFileComplete.bind(this));
    preload.loadFile('assets/images/bg.jpg');

    document.getElementById("ifrm").setAttribute("onload", "if(Casamiento.rsvp) {Casamiento.rsvpSent();}");
  }

  Casamiento.prototype = {
    self: this,
    rsvp: false,

    handleFileComplete: function handleFileComplete(event) {
      $('#main').fullpage({
        autoScrolling: false,
        fitToSection: false,
        afterRender: this.loadMap.bind(this)
      });

      loading = document.getElementById('loading');
      loading.className = 'loaded';
      $('#main').addClass('loaded');
      transitionEnd(loading).bind(function() {
        loading.parentNode.removeChild(loading);
      });
    },

    validateRsvp: function validateRsvp() {
      self.rsvp = true;
      return true;
    },

    rsvpSent: function rsvpSent() {
      rsvp = document.getElementById('rsvp');
      transitionEnd(rsvp).bind(function() {
        $('#rsvp').addClass('hidden');
        $('#rsvp-sent').removeClass('hidden');
        $.fn.fullpage.reBuild();
        $('#rsvp-sent h1').addClass('sent');

        $('#rsvp').remove();
      });
      $('#rsvp').addClass('sent');
    },

    loadMap: function loadMap() {
      $('#map article').height('80%');
      $('#map-container').height('100%');
      var mapOptions = {
        center: {
          lat: 32.218068,
          lng: 34.937992
        },
        zoom: 16,
        scrollwheel: false,
      };
      var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
    }
  };

  scope['Casamiento'] = new Casamiento();
})(window)
