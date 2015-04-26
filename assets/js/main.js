!(function(scope) {

  function Casamiento() {
    var preload = new createjs.LoadQueue();
    preload.addEventListener('fileload', this.handleFileComplete.bind(this));
    preload.loadFile('assets/images/bg.jpg');

    document.getElementById("ifrm").setAttribute("onload", "if(Casamiento.rsvp) {Casamiento.rsvpSent();}");

    document.getElementById("map-container").addEventListener("touchstart", this.touchStart.bind(this), true);
    document.getElementById("map-container").addEventListener("touchend", this.touchEnd.bind(this), true);
    document.getElementById("map-container").addEventListener("touchmove", this.touchMove.bind(this), true);

    $('input[name="entry.1490252627"]').change(this.handleAbroadRsvp);
  }

  Casamiento.prototype = {
    self: this,
    rsvp: false,
    dragFlag: false,
    start: 0,
    end: 0,
    venue: new google.maps.LatLng(32.218068, 34.937992),

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

    handleAbroadRsvp: function handleAbroadRsvp() {
      if (this.value.toLowerCase() == 'si') {
        $('fieldset[rel="info-extranjeros"]').removeClass('hidden');
      } else {
        $('fieldset[rel="info-extranjeros"]').addClass('hidden');
      }
      $.fn.fullpage.reBuild();
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
      $('#map article').height('75%');
      $('#map-container').height('100%');
      var mapOptions = {
        center: this.venue,
        zoom: 16,
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true
      };

      var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

      var marker = new google.maps.Marker({
        title: 'Moadon Hakshatot / מועדון הקשתות',
        position: this.venue,
        map: map,
        icon: '/assets/images/heart-2.png'
      });

      var infowindow = new google.maps.InfoWindow({
        content: '<h1>Boda Noe & Mati</h1>'
      });

      // Opens the InfoWindow when marker is clicked.
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    },

    touchStart: function touchStart(e) {
      this.dragFlag = true;
      this.start = e.touches[0].pageY;
    },

    touchEnd: function touchEnd() {
      this.dragFlag = false;
    },

    touchMove: function touchMove(e) {
        if ( !this.dragFlag ) return;
        this.end = e.touches[0].pageY;
        window.scrollBy( 0,( this.start - this.end ) );
    }
  };

  scope['Casamiento'] = new Casamiento();
})(window)
