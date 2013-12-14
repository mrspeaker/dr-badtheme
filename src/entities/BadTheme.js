(function (Ω) {

    "use strict";

    var BadTheme = Ω.Entity.extend({

        w: 40,
        h: 30,

        life: 450,

        remove: false,

        init: function (x, y) {
            this.x = x;
            this.y = y;
        },

        tick: function () {

            this.x += Math.sin(Ω.utils.now() / 500) * 0.9;

            return (!this.remove) && this.life-- > 0;

        },

        hit: function () {

            this.remove = true;

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#0cc";
            c.fillRect(this.x, this.y, this.w, this.h);

        }

    });

    window.BadTheme = BadTheme;

}(
    window.Ω
));