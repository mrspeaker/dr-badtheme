(function (Ω, Player, Binary, BadTheme) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w / 2 - 10, Ω.env.h - 50, this);
            this.binary = [];
            this.baddies = [];

            this.lastBomb = Ω.utils.now();
            this.lastBaddie = Ω.utils.now();

        },

        tick: function () {

            var now = Ω.utils.now();

            this.player.tick();

            this.baddies = this.baddies.filter(function (b) {
                return b.tick();
            });

            this.binary = this.binary.filter(function (b) {
                return b.tick();
            });

            Ω.Physics.checkCollision(this.player, this.binary);
            Ω.Physics.checkCollisions(this.baddies.concat(this.player.bullets));

            if (now - this.lastBomb > 100) {
                this.lastBomb = now;
                this.binary.push(
                    new Binary(Math.random() < 0.5, Math.random() * Ω.env.w, -20)
                );
            }

            if (now - this.lastBaddie > 2000) {
                this.lastBaddie = now;
                this.baddies.push(
                    new BadTheme(Math.random() * Ω.env.w / 2 + 100, Math.random() * 100 | 0)
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
            this.baddies.forEach(function (b) {
                b.render(gfx);
            });
            this.binary.forEach(function (b) {
                b.render(gfx);
            });

        }
    });

    window.MainScreen = MainScreen;

}(
    window.Ω,
    window.Player,
    window.Binary,
    window.BadTheme
));
