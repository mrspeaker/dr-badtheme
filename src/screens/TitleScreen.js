(function (Ω, NextScreen) {

    "use strict";

    var TitleScreen = Ω.Screen.extend({

        count: 100,

        img: new Ω.Image("res/images/title.png"),

        init: function () {

            Ω.input.reset();

        },
        tick: function () {
            if (this.count-- < 0) {
                window.game.setScreen(new NextScreen());
            }
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#111";
            c.fillRect(0, 0, gfx.w, gfx.h);

            this.img.render(gfx, gfx.w / 2 - 145, gfx.h * 0.3);

        }

    });

    window.TitleScreen = TitleScreen;

}(
    window.Ω,
    window.IntroScreen
));
