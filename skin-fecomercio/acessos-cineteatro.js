/* Ligação adicional solicitada pelo cliente. O export e o player 3DVista permanecem intactos. */
(function () {
  'use strict';
  var attempts = 0;
  var timer = setInterval(function () {
    var player = window.tour && window.tour.player;
    var playlist = player && player.getById('mainPlayList');
    if (!playlist || !player.getById('panorama_FCA602B8_F789_3EFD_41C2_FBDA51A4F5ED')) {
      if (++attempts > 240) clearInterval(timer);
      return;
    }
    clearInterval(timer);
    function addAccess(sourceId, targetId, yaw, label) {
      var target = player.getById(targetId);
      var targetIndex = playlist.get('items').findIndex(function (item) { return item.get('media') === target; });
      if (targetIndex < 0) return;
      var source = player.getById(sourceId);
      var template = source.get('overlays').reduce(function (found, overlay) {
        return found || (overlay.get('items') || []).find(function (item) { return !!item.get('image'); });
      }, null);
      if (!template) return;
      var area = player.createInstance('HotspotPanoramaOverlayArea');
      area.set('mapColor', 'any');
      area.set('displayTooltipInTouchScreens', true);
      area.bind('click', function () { window.tour.setMediaByIndex(targetIndex); });
      var image = player.createInstance('HotspotPanoramaOverlayImage');
      image.set('image', template.get('image'));
      image.set('distance', 50);
      image.set('yaw', yaw);
      image.set('pitch', 0);
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
      source.set('overlays', source.get('overlays').concat([overlay]));
    }
    addAccess('panorama_FCA602B8_F789_3EFD_41C2_FBDA51A4F5ED', 'panorama_FCA4E057_F789_39B2_41EC_A9A84DAB3DD3', -8, 'Entrada do cineteatro');
    addAccess('panorama_FCA4E057_F789_39B2_41EC_A9A84DAB3DD3', 'panorama_FCA602B8_F789_3EFD_41C2_FBDA51A4F5ED', 173, 'Galeria de arte');
  }, 250);
})();
