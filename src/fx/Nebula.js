(function (Ω) {

    "use strict";

    var Nebula = Ω.Entity.extend({

        img: new Ω.Image("res/images/nebula1.png"),

        init: function () {
            this.start = Ω.utils.now();

            this.x = -100;
            this.y = -800;
            this.type = 1;
            this.speed = 0.5;
        },

        tick: function () {
            this.y += this.speed;

            if (this.y > Ω.env.h) {
                this.y = -800;
            }
            return true;
        },

        render: function (gfx) {
            this.img.render(gfx, this.x, this.y);
        }

    });

    window.Nebula = Nebula;

}(
    window.Ω
));
