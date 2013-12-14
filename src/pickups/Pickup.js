(function (Ω) {

    "use strict";

    var Pickup = Ω.Entity.extend({

        w: 15,
        h: 15,

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
