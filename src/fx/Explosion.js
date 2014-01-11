(function (Ω) {

    "use strict";

    var Explosion = Ω.Entity.extend({

        init: function (x, y) {
            this.start = Ω.utils.now();
            this.time = 100;

            this.r = (Math.random() * 40) + 10 | 0;
            this.x = x + (Math.random() * 20) | 0;
            this.y = y + (Math.random() * 20) | 0;
            this.offColour = 0.1;
            this.dir = Math.random() - 0.5;
        },

        tick: function () {
            this.perc = 1 - ((Ω.utils.now() - this.start) / this.time);
            if (this.perc < 0) {
                this.perc = 0;
            }
            this.y += 1.5;
            if (this.y > Ω.env.h) {
                return false;
            }
            this.x += this.dir;
            return true;
        },

        render: function (gfx) {
            var c = gfx.ctx,
                col = 255 * (this.perc + this.offColour) | 0;

            c.fillStyle = "rgba(" + col + "," + col + "," + col + ", 0.5)";
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            c.fill();

        }

    });

    window.Explosion = Explosion;

}(
    window.Ω
));