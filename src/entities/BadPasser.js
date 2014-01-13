(function (Ω, BadTheme) {

    "use strict";

    function Lerp(start, end, step) {
        return function (dt) {
            return step();
        }
    }

    var BadPasser = BadTheme.extend({

        init: function (x, y, shooting, screen) {

            this._super(x, y, shooting, screen);
            this.y = y - 150;
            this.shooting = shooting;
            this.speedDescend = (Math.random() * 3 | 0) + 1;
        },

        state_INTRO: function () {
            this.state.set("PATROL");
        },

        state_PATROL: function () {

            if (this.hitTime <= 0) {
                this.y += this.speedDescend;
                if (this.y > Ω.env.h) {
                    this.remove = true;
                }

                if (this.shooting) {
                    this.spawnVote(2 + (this.speedDescend * 0.5));
                }
            } else {
                this.y -= this.hitTime;
            }


        },

        render: function (gfx) {

            var c = gfx.ctx,
                doFlash = false,
                dead = this.state.is("DEAD");

            if (dead || this.hitTime-- > 0) {
                c.globalAlpha = dead ? 0.1 : 0.4;
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