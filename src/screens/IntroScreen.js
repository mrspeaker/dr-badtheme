(function (Ω, NextScreen, FadeMessage) {

    "use strict";

    var IntroScreen = Ω.Screen.extend({

        count: 0,

        init: function () {
            this.foreFx = [];
            Ω.input.reset();
        },

        tick: function () {
            this.count++;

            if (this.count > 120 || Ω.input.pressed("escape")) {
                window.game.setScreen(new NextScreen());
            }

            if (this.count === 20) {
                this.foreFx.push(
                    new FadeMessage("dialog", 800, Ω.env.w / 2, Ω.env.h / 2)
                );
            }

            this.foreFx = this.foreFx.filter(function (f) {
                return f.tick();
            });
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#111";
            c.fillRect(0, 0, gfx.w, gfx.h);

            c.fillStyle = "#fff";

            this.foreFx.forEach(function (f) {
                f.render(gfx);
            });

            c.fillText("esc to skip", gfx.h * 0.9, gfx.w * 0.1);

        }

    });

    window.IntroScreen = IntroScreen;

}(
    window.Ω,
    window.MainScreen,
    window.FadeMessage
));
