(function (Ω) {

    "use strict";

    var Bullet = Ω.Entity.extend({

        w: 4,
        h: 7,

        speed: 10,

        init: function (x, y) {

            this.x = x;
            this.y = y;

        },

        tick: function () {

            this.y -= this.speed;

            return !this.remove && this.y > 0;

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#cc0";
            c.fillRect(this.x, this.y, this.w, this.h);

        },

        hit: function () {
            this.remove = true;
        }

    });

    window.Bullet = Bullet;

}(window.Ω));