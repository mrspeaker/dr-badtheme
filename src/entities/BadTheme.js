(function (Ω, Bullet) {

    "use strict";

    var BadTheme = Ω.Entity.extend({

        w: 40,
        h: 30,

        lastBomb: 0,

        remove: false,
        isOnes: false,

        init: function (x, y, screen) {
            this.x = x;
            this.y = y;
            this.screen = screen;

            this.speed = Math.random() * 300 + 200;

            this.lastBomb = Ω.utils.now();
        },

        tick: function () {

            var now = Ω.utils.now();

            this.x += Math.sin(Ω.utils.now() / this.speed) * 0.9;

            if (now - this.lastBomb > 500) {
                this.lastBomb = now;
                if (Ω.utils.oneIn(10)) {
                    this.isOnes = !this.isOnes;
                }
                this.screen.spawnBinary(this.isOnes, this);
            }

            return (!this.remove);

        },

        hit: function (e) {

            if (e instanceof Bullet) {

                this.remove = true;

            }

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#0cc";
            c.fillRect(this.x, this.y, this.w, this.h);

        }

    });

    window.BadTheme = BadTheme;

}(
    window.Ω,
    window.Bullet
));