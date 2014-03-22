require(["hiage.js/init", "hiage.js/Game"], function (init, Game) {
    var aspectRatio = screen.width / screen.height;
    new Game('container', 500, aspectRatio, 1).start();
})
