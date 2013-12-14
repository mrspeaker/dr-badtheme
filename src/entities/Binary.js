(function (Ω) {

    "use strict";

    var Binary = Ω.Entity.extend({

        w: 8,
        h: 16,

        speed: 2,

        remove: false,

        sheet: new Ω.SpriteSheet("res/images/binary.png", 16, 16),

        init: function (isOne, x, y, angle) {

            this.isOne = isOne;
            this.x = x;
            this.y = y;

            this.xspeed = this.speed * Math.cos(angle);
            this.yspeed = this.speed * Math.sin(angle);

        },

        tick: function () {

            this.x += this.xspeed;
            this.y += this.yspeed;

            return !(this.remove) && this.y < Ω.env.h;

        },

        render: function (gfx) {
            var c = gfx.ctx;

            //c.fillStyle = this.isOne ? "#444" : "#222";
            //c.fillText(this.isOne ? "1" : "0", this.x - 2, this.y + this.h - 2);
            //c.fillRect(this.x, this.y, this.w, this.h);

            this.sheet.render(gfx, this.isOne ? 1 : 0, 0, this.x - 2, this.y);

        }
    });

    window.Binary = Binary;

}(window.Ω));