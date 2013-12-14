(function (Ω) {

    "use strict";

    var GameOverScreen = Ω.Screen.extend({

        count: 80,

        init: function () {

            Ω.input.reset();

        },
        tick: function () {
            if (this.count-- < 0) {
                window.game.reset();
            }
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#000";
            c.fillRect(0, 0, gfx.w, gfx.h);

            c.fillStyle = "#fff";
            c.fillText("Game Over.", gfx.w / 2, gfx.h / 2);

        }

    });

    window.GameOverScreen = GameOverScreen;

}(
    window.Ω,
    window.TitleScreen
));
