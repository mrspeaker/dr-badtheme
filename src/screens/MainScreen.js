(function (Ω, Player, Binary) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w / 2 - 10, Ω.env.h - 50, this);
            this.binary = [];
            this.lastBomb = Ω.utils.now();

        },

        tick: function () {

            this.player.tick();

            this.binary = this.binary.filter(function (b) {
                return b.tick();
            });

            Ω.Physics.checkCollision(this.player, this.binary);

            if (Ω.utils.now() - this.lastBomb > 100) {
                this.lastBomb = Ω.utils.now();
                this.binary.push(
                    new Binary(Math.random() < 0.5, Math.random() * Ω.env.w, -20)
                );
            }

        },

        swapBinary: function () {
            this.binary.forEach(function (b) {
                b.isOne = !b.isOne;
            });
        },

        render: function (gfx) {

            this.clear(gfx, "hsl(195, 40%, 5%)");

            this.player.render(gfx);
            this.binary.forEach(function (b) {
                b.render(gfx);
            });

        }
    });

    window.MainScreen = MainScreen;

}(
    window.Ω,
    window.Player,
    window.Binary
));
