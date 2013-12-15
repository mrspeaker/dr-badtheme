(function (Ω, Pickup) {

    "use strict";

    var Health = Pickup.extend({

        amount: 15,

        render: function (gfx) {
            this.sheet.render(gfx, 0, 0, this.x, this.y);
        }



    });

    window.Health = Health;

}(
    window.Ω,
    window.Pickup
));
