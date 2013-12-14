(function (Ω, Bullet) {

    "use strict";

    var BadTheme = Ω.Entity.extend({

        w: 40,
        h: 30,

        lastBomb: 0,

        remove: false,
        isOnes: false,

        state: null,

        health: 100,
        healthRate: 20,

        sheet: new Ω.SpriteSheet("res/images/baddies.png", 40, 30),

        init: function (x, y, screen) {
            this.x = x;
            this.targetY = y;
            this.y = y - 150;
            this.screen = screen;

            this.speedDescend = 2;
            this.speedPatrolX = Math.random() * 300 + 200;

            this.lastBomb = Ω.utils.now();

            this.state = new Ω.utils.State("BORN");
        },

        tick: function () {

            this.state.tick();
            switch (this.state.get()) {
            case "BORN":
                this.state.set("INTRO");
                break;
            case "INTRO":
                this.state_INTRO();
                break;
            case "PATROL":
                this.state_PATROL();
                break;
            case "DYING":
                break;
            case "DEAD":
                break;
            }
            return (!this.remove);

        },

        state_INTRO: function () {
            this.y += this.speedDescend;
            if (this.y >= this.targetY) {
                this.state.set("PATROL");
            }
        },

        state_PATROL: function () {

            this.x += Math.sin(Ω.utils.now() / this.speedPatrolX) * 0.9;

            this.spawnVote();

        },

        spawnVote: function () {

            var now = Ω.utils.now(),
                ballot;

            if (now - this.lastBomb > 500) {
                this.lastBomb = now;
                if (Ω.utils.oneIn(10)) {
                    this.isOnes = !this.isOnes;
                }
                ballot = this.isOnes ? 1 : 0;
                if (Ω.utils.oneIn(20)) {
                    ballot = -1;
                }

                this.screen.spawnVote(ballot, this);
            }
        },

        hit: function (e) {

            if (e instanceof Bullet) {
                this.hitTime = 5;
                this.health = Math.max(-1, this.health - this.healthRate);
                if (this.health < 0) {
                    this.remove = true;
                }
            }

        },

        render: function (gfx) {

            var c = gfx.ctx;

            //c.fillStyle = this.hitTime-- > 0 ? "#fff" : "#0cc";
            //c.fillRect(this.x, this.y, this.w, this.h);
            if (this.hitTime-- > 0) {
                return;
            }
            this.sheet.render(gfx, 0, 0, this.x, this.y);

        }

    });

    window.BadTheme = BadTheme;

}(
    window.Ω,
    window.Bullet
));