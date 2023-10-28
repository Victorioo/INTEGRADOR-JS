let mm = new MagnetMouse({
  magnet: {
    element: '.magnet',
    distance: 5,
  }
});

let buttonMagnet = new MagnetMouse({
  magnet: {
    element: '.button_magnet',
    distance: 3,
  }
});


buttonMagnet.init()
mm.init();