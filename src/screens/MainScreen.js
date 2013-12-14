(function (Ω, Player, Binary, BadTheme) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w / 2 - 10, Ω.env.h - 50, this);
            this.binary = [];
            this.baddies = [];

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

            if (now - this.lastBaddie > 2000 && this.baddies.length < 6) {
                this.lastBaddie = now;
                this.baddies.push(
                    new BadTheme(
                        (Math.random() * Ω.env.w / 2 + 100) | 0,
                        Ω.utils.rand(150, 10),
                        this
                    )
                );
            }

        },

        spawnBinary: function (isOne, b) {
            var angle = Ω.utils.angleBetween(this.player, b);

            this.binary.push(
                new Binary(isOne, b.x + b.w / 2, b.y + b.h - 4, angle)
            );
        },

        swapBinary: function () {
            this.binary.forEach(function (b) {
                b.isOne = !b.isOne;
            });
        },

        playerDead: function () {

            window.game.gameOver();

        },

        render: function (gfx) {

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 5%)");

            this.player.render(gfx);

            c.font = "14pt monospace";
            this.binary.forEach(function (b) {
                b.render(gfx);
            });

            this.baddies.forEach(function (b) {
                b.render(gfx);
            });

            c.fillStyle = "#900";
            c.fillRect(10, 10, 110, 15);
            c.fillRect(10, 30, 110, 15);

            c.fillStyle = "#090";
            c.fillRect(10, 10, this.player.health / 100 * 110, 15);
            c.fillRect(10, 30, this.player.ammo / 100 * 110, 15);

        }
    });

    window.MainScreen = MainScreen;

}(
    window.Ω,
    window.Player,
    window.Binary,
    window.BadTheme
));
