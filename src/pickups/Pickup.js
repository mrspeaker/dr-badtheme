(function (Ω) {

    "use strict";

    var Pickup = Ω.Entity.extend({

        w: 16,
        h: 16,

        sheet: new Ω.SpriteSheet("res/images/pickups.png", 16, 16),

        init: function (x, y) {
            this.x = x;
            this.y = y;
        },

        tick: function () {

            this.y ++;

            return !(this.remove) && this.y < Ω.env.h;
        },

        hit: function () {
            this.remove = true;
        }

    });

    window.Pickup = Pickup;

}(
    window.Ω
));
