(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({

        w: 16,
        h: 24,

        vx: 0,
        vy: 0,

        ac: 0.5,
        drag: 0.9,

        init: function (x, y) {

            this.x = x;
            this.y = y;
        },

        tick: function () {

            var xo = 0,
                yo = 0;

            if (Ω.input.isDown("up")) {
                yo -= this.ac;
            }
            if (Ω.input.isDown("down")) {
                yo += this.ac;
            }
            if (Ω.input.isDown("right")) {
                xo += this.ac;
            }
            if (Ω.input.isDown("left")) {
                xo -= this.ac;
            }

            if (xo !== 0 && yo !== 0) {
                // Don't allow extra diag movements
            }

            this.vx += xo;
            this.vy += yo;

            this.vx *= this.drag;
            this.vy *= this.drag;

            this.x += this.vx;
            this.y += this.vy;
        }
    });

    window.Player = Player;

}(window.Ω));