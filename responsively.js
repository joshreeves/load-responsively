(function( $ ) {
  $.fn.responsively = function(options) {

    var settings = $.extend({
      limitSize: true,
    }, options );

    return this.each(function() {
      var $this = $(this);
      var width = $this.attr('width') || $this.attr('data-width');
      var height = $this.attr('height') || $this.attr('data-height');
      var $image = $this.is('img') ? $this : $this.find('img').eq(0);
      $image.css({maxWidth: '100%', height: 'auto'});

      if (_.isUndefined(width, height)) { return; }

      var bottomPadding = (height / width) * 100;
      var parentStyles = "display: inline-block; position: relative; height: 0; width: 100%; overflow: hidden; padding-bottom: " + bottomPadding + "%";
      $this.wrap('<span style="' + parentStyles + '"></span>');
      var $parent = $this.parent();
      var $container = $parent;

      if (settings.limitSize) {
        var grandParentStyles = "display: inline-block; max-width:" + width + "px; max-height: " + height + "px; width: 100%;";
        $parent.wrap('<span style="' + grandParentStyles + '"></span');
        var $grandParent = $parent.parent();
        $container = $grandParent;
      }

      $container.css({ opacity: 0, transition: 'opacity 1s ease-in-out' });
      $this.css({position: 'absolute', top: 0, left: 0, width: '100%'});

      $image.on('load', function() {
        $container.css({ opacity: 1 });
      });
    });

  };
}( jQuery ));
