(function (Ω) {

    "use strict";

    var Bullet = Ω.Entity.extend({

        w: 7,
        h: 8,

        speed: 10,

        init: function (x, y, xDir) {

            this.x = x + (Math.random() * 7 | 0);
            this.y = y + (Math.random() * 7 | 0);

            this.xDir = xDir;

        },

        tick: function () {

            this.y -= this.speed;
            this.x += this.xDir * 0.3;

            return !this.remove && this.y > 0;

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#889";
            c.fillRect(this.x, this.y, this.w, this.h);

        },

        hit: function () {
            this.remove = true;
        }

    });

    window.Bullet = Bullet;

}(window.Ω));