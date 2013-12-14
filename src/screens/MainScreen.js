(function (Ω, Player) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w / 2 - 10, Ω.env.h - 50);

        },

        tick: function () {

            this.player.tick();

        },

        render: function (gfx) {

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 5%)");

            this.player.render(gfx);

        }
    });

    window.MainScreen = MainScreen;

}(
    window.Ω,
    window.Player
));
