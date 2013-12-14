(function (Ω, Player, Binary, BadTheme, BadPasser, Health) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w / 2 - 10, Ω.env.h - 50, this);
            this.binary = [];
            this.pickups = [];
            this.baddies = [];

            this.lastBaddie = this.lastHealth = Ω.utils.now();
            this.nextHealth = Math.random() * 3000 + 300 | 0;

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

            this.pickups = this.pickups.filter(function (p) {
                return p.tick();
            });

            Ω.Physics.checkCollision(this.player, this.binary);
            Ω.Physics.checkCollision(this.player, this.pickups);
            Ω.Physics.checkCollisions(this.baddies.concat(this.player.bullets));

            if (now - this.lastBaddie > 2000 && this.baddies.length < 6) {
                this.lastBaddie = now;
                var Clazz = Math.random() < 0.3 ? BadPasser : BadTheme;
                this.baddies.push(
                    new Clazz(
                        (Math.random() * Ω.env.w / 2 + 100) | 0,
                        Ω.utils.rand(150, 10),
                        this
                    )
                );
            }

            if (now - this.lastHealth > this.nextHealth) {
                this.lastHealth = now;
                this.nextHealth = Math.random() * 3000 + 300 | 0;
                this.pickups.push(
                    new Health(
                        (Math.random() * Ω.env.w / 2 + 100) | 0,
                        -30
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

            this.pickups.forEach(function (p) {
                p.render(gfx);
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
    window.BadTheme,
    window.BadPasser,
    window.Health
));
