(function (Ω) {

    "use strict";

    var Vote = Ω.Entity.extend({

        w: 8,
        h: 16,

        remove: false,

        ballot: 0,

        sheet: new Ω.SpriteSheet("res/images/binary.png", 20, 20),

        init: function (ballot, speed, x, y, angle) {

            this.ballot = ballot;
            this.x = x - this.w / 2;
            this.y = y - this.h / 2;

            this.xspeed = speed * Math.cos(angle);
            this.yspeed = speed * Math.sin(angle);

            this.setSize();

        },

        tick: function () {

            this.x += this.xspeed;
            this.y += this.yspeed;

            return !(this.remove) && this.y < Ω.env.h;

        },

        setSize: function () {
            if (this.ballot === 1) {
                this.w = 36;
                this.h = 36;
            } else {
                this.w = 8;
                this.h = 16;
            }
        },

        flip: function () {
            if (this.ballot === -1) {
                return;
            }
            if (this.ballot === 0) {
                this.ballot = 1;
                this.x -= 10;
                this.y -= 10;
            } else if (this.ballot === 1) {
                this.ballot = 0;
                this.x += 10;
                this.y += 10;
            }

            this.setSize();
        },

        render: function (gfx) {
            //var c = gfx.ctx;

            if (this.ballot === -1 && Ω.utils.toggle(200, 2)) {
                return;
            }

            var xo = this.ballot == 1 ? 10 : -3,
                yo = this.ballot == 1 ? 10 : 0;

            //c.strokeStyle = "red";
            //c.strokeRect(this.x, this.y, this.w, this.h);
            this.sheet.render(gfx, this.ballot + 1, 0, this.x + xo, this.y + yo);

        }
    });

    window.Vote = Vote;

}(window.Ω));