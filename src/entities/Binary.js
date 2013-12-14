(function (Ω) {

    "use strict";

    var Binary = Ω.Entity.extend({

        w: 8,
        h: 16,

        xspeed: 0,
        yspeed: 2,

        remove: false,

        init: function (isOne, x, y) {

            this.isOne = isOne;
            this.x = x;
            this.y = y;
        },

        tick: function () {

            this.x += this.xspeed;
            this.y += this.yspeed;

            return !(this.remove) && this.y < Ω.env.h;

        },

        render: function (gfx) {
            var c = gfx.ctx;

            c.fillStyle = this.isOne ? "#0c0" : "#f80";
            c.fillText(this.isOne ? "1" : "0", this.x - 2, this.y + this.h - 2);

        }
    });

    window.Binary = Binary;

}(window.Ω));