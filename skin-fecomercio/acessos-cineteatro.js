/* Ligação adicional solicitada pelo cliente. O export e o player 3DVista permanecem intactos. */
(function () {
  'use strict';
  var attempts = 0;
  var timer = setInterval(function () {
    var player = window.tour && window.tour.player;
    if (!player || !player.getById('panorama_FCA602B8_F789_3EFD_41C2_FBDA51A4F5ED')) {
      if (++attempts > 240) clearInterval(timer);
      return;
    }
    clearInterval(timer);
    function addAccess(sourceId, targetIndex, yaw, label) {
      var area = player.createInstance('HotspotPanoramaOverlayArea');
      area.set('mapColor', 'any');
      area.set('displayTooltipInTouchScreens', true);
      area.bind('click', function () { window.tour.setMediaByIndex(targetIndex); });
      var image = player.createInstance('HotspotPanoramaOverlayImage');
      image.set('image', player.getById('AnimatedImageResource_E799EC5D_F9BB_29B6_41EE_36BB818AC9A3'));
      image.set('distance', 50);
      image.set('yaw', yaw);
      image.set('pitch', -5);
      image.set('scaleMode', 'fit_inside');
      image.set('hfov', 12.29);
      image.set('vfov', 12.29);
      image.set('data', {label: label});
      var overlay = player.createInstance('HotspotPanoramaOverlay');
      overlay.set('areas', [area]);
      overlay.set('items', [image]);
      overlay.set('enabledInVR', true);
      overlay.set('useHandCursor', true);
      overlay.set('data', {label: label});
      var source = player.getById(sourceId);
      source.set('overlays', source.get('overlays').concat([overlay]));
    }
    addAccess('panorama_FCA602B8_F789_3EFD_41C2_FBDA51A4F5ED', 23, -8, 'Entrada do cineteatro');
    addAccess('panorama_FCA4E057_F789_39B2_41EC_A9A84DAB3DD3', 33, 173, 'Galeria de arte');
  }, 250);
})();
