(function (Ω, Pickup) {

    "use strict";

    var Health = Pickup.extend({

        w: 30,
        h: 30,

        amount: 15,

        render: function (gfx) {
            this.sheet.render(gfx, 0, 0, this.x + 7, this.y + 7);
        }

    });

    window.Health = Health;

}(
    window.Ω,
    window.Pickup
));
