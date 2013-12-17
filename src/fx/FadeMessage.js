(function (Ω) {

    "use strict";

    var FadeMessage = Ω.Entity.extend({

        init: function (msg, time, x, y) {
            this.msg = msg;
            this.time = time || 2000;
            this.start = Ω.utils.now();

            this.x = x;
            this.y = y;
        },

        tick: function () {
            this.perc = 1 - ((Ω.utils.now() - this.start) / this.time);
            if (this.perc <= 0.01) {
                return false;
            }
            return true;
        },

        render: function (gfx) {
            var c = gfx.ctx;

            c.fillStyle = "rgba(255, 255, 255, " + this.perc  + ")";
            c.fillText(this.msg, this.x, this.y);

        }

    });

    window.FadeMessage = FadeMessage;

}(
    window.Ω
));