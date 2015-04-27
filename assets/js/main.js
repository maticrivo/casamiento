!(function(scope) {

  function Casamiento() {
    var preload = new createjs.LoadQueue();
    preload.addEventListener('fileload', this.handleFileComplete.bind(this));
    preload.loadFile('assets/images/bg.jpg');

    document.getElementById("ifrm").setAttribute("onload", "Casamiento.rsvpSent()");

    document.getElementById("map-container").addEventListener("touchstart", this.touchStart.bind(this), true);
    document.getElementById("map-container").addEventListener("touchend", this.touchEnd.bind(this), true);
    document.getElementById("map-container").addEventListener("touchmove", this.touchMove.bind(this), true);

    $('input[name="entry.1490252627"]').change(this.handleAbroadRsvp.bind(this));
    $(window).resize(this.handleResize.bind(this));
  }

  Casamiento.prototype = {
    rsvp: false,
    dragFlag: false,
    start: 0,
    end: 0,
    venue: new google.maps.LatLng(32.218068, 34.937992),

    handleFileComplete: function handleFileComplete(event) {
      // $('#main').fullpage({
      //   autoScrolling: false,
      //   fitToSection: false,
      //   responsive: 640,
      //   afterRender: this.loadMap.bind(this)
      // });
      this.handleResize();
      this.loadMap();

      loading = document.getElementById('loading');
      loading.className = 'loaded';
      $('#main').addClass('loaded');
      transitionEnd(loading).bind(function() {
        loading.parentNode.removeChild(loading);
      });
    },

    handleResize: function handleResize() {
      $('.section, .cell').height($(window).height());
    },

    handleAbroadRsvp: function handleAbroadRsvp(element) {
      if (element.target.value.toLowerCase() == 'si') {
        $('fieldset[rel="info-extranjeros"]').removeClass('hidden');
      } else {
        $('fieldset[rel="info-extranjeros"]').addClass('hidden');
      }
      this.handleResize();
    },

    validateRsvp: function validateRsvp() {
      this.rsvp = true;
      return true;
    },

    rsvpSent: function rsvpSent() {
      if (this.rsvp) {
        var rsvp = document.getElementById('rsvp');

        transitionEnd(rsvp).bind((function() {
          $('#rsvp').addClass('hidden');
          $('#rsvp-sent').removeClass('hidden');
          $('#rsvp-sent h1').addClass('sent');

          $('#rsvp').remove();

          this.handleResize();
        }).bind(this));
        $('#rsvp').addClass('sent');
      }
    },

    loadMap: function loadMap() {
      $('#map article').height('75%');
      $('#map-container').height('100%');

      var mapOptions = {
        center: this.venue,
        zoom: 15,
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true,
        styles: [{"featureType":"all","elementType":"labels","stylers":[{"gamma":0.26},{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"},{"lightness":-50}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":20}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"saturation":"-80"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"saturation":"-54"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"lightness":50},{"hue":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"lightness":20}]}]
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
      if (!this.dragFlag) return;
      this.end = e.touches[0].pageY;
      window.scrollBy(0, (this.start - this.end));
    }
  };

  scope['Casamiento'] = new Casamiento();
})(window)
