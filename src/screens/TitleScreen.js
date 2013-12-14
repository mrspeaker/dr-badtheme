(function (Ω, MainScreen) {

    "use strict";

    var TitleScreen = Ω.Screen.extend({

        count: 15,

        init: function () {

            Ω.input.reset();

        },
        tick: function () {
            if (this.count-- < 0) {
                window.game.setScreen(new MainScreen());
            }
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#333";
            c.fillRect(0, 0, gfx.w, gfx.h);

        }

    });

    window.TitleScreen = TitleScreen;

}(
    window.Ω,
    window.MainScreen
));
