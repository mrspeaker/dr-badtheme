(function (Ω) {

    "use strict";

    var Bullet = Ω.Entity.extend({

        w: 7,
        h: 8,

        speed: 10,
        removeIn: 0,

        sheet: new Ω.SpriteSheet("res/images/bullets.png", 24, 32),

        init: function (x, y, xDir) {

            this.x = x + (Math.random() * 7 | 0);
            this.y = y + (Math.random() * 7 | 0);

            this.xDir = xDir;

        },

        tick: function () {

            if (this.removeIn <= 0) {
                this.y -= this.speed;
                this.x += this.xDir * 0.3;
            }

            if (--this.removeIn === 0) {
                this.remove = true;
            }

            return !this.remove && this.y > 0;

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = this.removeIn > 0 ? "#fff" : "#889";
            //c.fillRect(this.x, this.y, this.w, this.h);
            this.sheet.render(gfx, 0, 0, this.x, this.y);

        },

        hit: function () {
            //this.remove = true;
            this.removeIn = 3;
        }

    });

    window.Bullet = Bullet;

}(window.Ω));