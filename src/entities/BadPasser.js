(function (Ω, BadTheme) {

    "use strict";

    var BadPasser = BadTheme.extend({

        init: function (x, y, screen) {
            this._super(x, y, screen);
            this.y = y - 150;
            this.speedDescend = (Math.random() * 3 | 0) + 1;
        },

        state_INTRO: function () {
            this.state.set("PATROL");
        },

        state_PATROL: function () {

            this.y += this.speedDescend;
            if (this.y > Ω.env.h) {
                this.remove = true;
            }

            this.spawnVote(2 + (this.speedDescend * 0.5));
        },

        render: function (gfx) {

            var c = gfx.ctx,
                doFlash = false;

            if (this.hitTime-- > 0) {
                c.globalAlpha = 0.4;
                doFlash = true;
            }
            this.sheet.render(gfx, 1, 0, this.x, this.y);
            if (doFlash) {
                c.globalAlpha = 1;
            }

        }

    });

    window.BadPasser = BadPasser;

}(
    window.Ω,
    window.BadTheme
));