(function (Ω) {

    "use strict";

    var Vote = Ω.Entity.extend({

        w: 8,
        h: 16,

        speed: 2,

        remove: false,

        ballot: 0,

        sheet: new Ω.SpriteSheet("res/images/binary.png", 16, 16),

        init: function (ballot, x, y, angle) {

            this.ballot = ballot;
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

        flip: function () {
            if (this.ballot === -1) {
                return;
            }
            if (this.ballot === 0) {
                this.ballot = 1;
            } else if (this.ballot === 1) {
                this.ballot = 0;
            }
        },

        render: function (gfx) {
            var c = gfx.ctx;

            //c.fillStyle = this.isOne ? "#444" : "#222";
            //c.fillText(this.isOne ? "1" : "0", this.x - 2, this.y + this.h - 2);
            //c.fillRect(this.x, this.y, this.w, this.h);

            if (this.ballot === -1 && Ω.utils.toggle(200, 2)) {
                return;
            }

            this.sheet.render(gfx, this.ballot + 1, 0, this.x - 2, this.y);

        }
    });

    window.Vote = Vote;

}(window.Ω));