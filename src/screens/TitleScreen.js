(function (Ω, NextScreen) {

    "use strict";

    var TitleScreen = Ω.Screen.extend({

        count: 30,

        img: new Ω.Image("res/images/title.png"),

        init: function () {

            Ω.input.reset();

        },
        tick: function () {
            if (this.count-- < 0 && Ω.input.isDown("fire")) {
                window.game.setScreen(new NextScreen());
            }
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#111";
            c.fillRect(0, 0, gfx.w, gfx.h);
            c.fillStyle = "#fff";
            c.font = "13pt verdana";
            c.fillText("arrows to move", gfx.w * 0.3, gfx.h * 0.5);
            c.fillText("space to fire", gfx.w * 0.3, gfx.h * 0.6);
            c.fillText("x to swap votes", gfx.w * 0.3, gfx.h * 0.7);
            this.img.render(gfx, gfx.w / 2 - 145, gfx.h * 0.3);

        }

    });

    window.TitleScreen = TitleScreen;

}(
    window.Ω,
    window.IntroScreen
));
