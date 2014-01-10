(function (Ω, Player, Vote, BadTheme, BadPasser, Health, Background, Conductor) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w / 2 - 10, Ω.env.h - 50, this);
            this.votes = [];
            this.pickups = [];
            this.baddies = [];

            this.lastBaddie = this.lastHealth = Ω.utils.now();
            this.nextHealth = Math.random() * 3000 + 300 | 0;

            this.background = Background.init();
            this.conductor = new Conductor().init(this);

            this.foreFx = [];

            this.backFx = [];

        },

        tick: function () {

            this.player.tick();

            this.baddies = this.baddies.filter(function (b) {
                return b.tick();
            });

            this.votes = this.votes.filter(function (b) {
                return b.tick();
            });

            this.pickups = this.pickups.filter(function (p) {
                return p.tick();
            });

            Ω.Physics.checkCollision(this.player, this.votes);
            Ω.Physics.checkCollision(this.player, this.pickups);
            Ω.Physics.checkGroupCollision(this.baddies.filter(function(b) { return b.state.isNot("DEAD"); }), this.player.bullets);

            this.conductor.tick();

            /*if (now - this.lastHealth > this.nextHealth) {
                this.lastHealth = now;
                this.nextHealth = Math.random() * 3000 + 300 | 0;
                this.pickups.push(
                    new Health(
                        (Math.random() * Ω.env.w / 2 + 100) | 0,
                        -30
                    )
                );
            }*/

            this.background.tick();
            this.backFx = this.backFx.filter(function (f) {
                return f.tick();
            });
            this.foreFx = this.foreFx.filter(function (f) {
                return f.tick();
            });


        },

        spawnVote: function (ballot, speed, b) {
            var angle = Ω.utils.angleBetween(this.player, b);

            this.votes.push(
                new Vote(ballot, speed, b.x + b.w / 2, b.y + b.h - 4, angle)
            );
        },

        flipVote: function () {
            this.votes.forEach(function (v) {
                v.flip();
            });
        },

        playerDead: function () {

            window.game.gameOver();

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.save();


            this.backFx.forEach(function (f) {
                f.render(gfx);
            });


            this.clear(gfx, "hsl(195, 40%, 5%)");



            this.background.render(gfx);

            this.player.render(gfx);

            this.votes.forEach(function (b) {
                b.render(gfx);
            });

            this.pickups.forEach(function (p) {
                p.render(gfx);
            });

            this.baddies.forEach(function (b) {
                b.render(gfx);
            });

            c.font = "8pt monospace";
            c.fillStyle = "#fff";
            c.fillText("BAD", 18, 19);
            c.fillText("GOOD", 160, 19);
            c.fillText("AMMO", 10, 32);

            c.fillText("SCORE", 290, 19);
            c.fillText("HI", gfx.w - 40, 19);

            // Votes bar - back
            c.fillStyle = "#e4dd25";
            c.fillRect(45, 10, 110, 10);

            // Ammo bar - back
            c.fillStyle = "#900";
            c.fillRect(45, 25, 110, 10);

            var barlen;
            if (this.player.health < 50) {
                barlen = (1 - this.player.health / 50) * 55;
                c.fillRect(45 + (55 - barlen), 10, barlen, 10);
            }

            c.fillStyle = "#090";
            if (this.player.health >= 50) {
                barlen = ((this.player.health - 50) / 50) * 55;
                c.fillRect(45 + 55, 10, barlen, 10);
            }
            c.fillRect(45, 25, this.player.ammo / 100 * 110, 10);

            c.fillStyle = "#000";
            c.fillRect(45 + 55, 10, 2, 10);

            this.foreFx.forEach(function (f) {
                f.render(gfx);
            });

            c.restore();

        }
    });

    window.MainScreen = MainScreen;

}(
    window.Ω,
    window.Player,
    window.Vote,
    window.BadTheme,
    window.BadPasser,
    window.Health,
    window.Background,
    window.Conductor
));
