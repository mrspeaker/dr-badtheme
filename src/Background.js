(function (Ω) {

    "use strict";

    var Background = {
        init: function () {},
        tick: function () {},
        render: function (gfx) {

            gfx.ctx.fillStyle = "#888";

            for (var i = 0 ; i < 10; i++) {
                gfx.ctx.fillRect(Math.random() * gfx.w | 0, Math.random() * gfx.h | 0, 2, 2);
            }
        }
    };

    window.Background = Background;

}(window.Ω));
