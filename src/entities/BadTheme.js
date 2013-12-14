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
                this.y += this.speedDescend;
                if (this.y >= this.targetY) {
                    this.state.set("PATROL");
                }
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

        state_PATROL: function () {

            var now = Ω.utils.now();

            this.x += Math.sin(now / this.speedPatrolX) * 0.9;

            if (now - this.lastBomb > 500) {
                this.lastBomb = now;
                if (Ω.utils.oneIn(10)) {
                    this.isOnes = !this.isOnes;
                }
                this.screen.spawnBinary(this.isOnes, this);
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

            c.fillStyle = this.hitTime-- > 0 ? "#fff" : "#0cc";
            c.fillRect(this.x, this.y, this.w, this.h);

        }

    });

    window.BadTheme = BadTheme;

}(
    window.Ω,
    window.Bullet
));