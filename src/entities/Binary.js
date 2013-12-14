(function (Ω) {

    "use strict";

    var Binary = Ω.Entity.extend({

        w: 8,
        h: 16,

        xspeed: 0,
        yspeed: 2,

        init: function (isOne, x, y) {

            this.isOne = isOne;
            this.x = x;
            this.y = y;
        },

        tick: function () {

            this.x += this.xspeed;
            this.y += this.yspeed;

            return this.y < Ω.env.h;

        },

        render: function (gfx) {
            var c = gfx.ctx;

            c.fillStyle = this.isOne ? "#0c0" : "#c00";
            c.fillRect(this.x, this.y, this.w, this.h);

            if (!this.isOne) {
                c.fillStyle = "#000";
                c.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);
            }

        }
    });

    window.Binary = Binary;

}(window.Ω));