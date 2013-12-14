(function (Ω, BadTheme) {

    "use strict";

    var BadPasser = BadTheme.extend({

        init: function (x, y, screen) {
            this._super(x, y, screen);
            this.y = y - 150;
            this.speedDescend = 1;
        },

        state_INTRO: function () {
            this.state.set("PATROL");
        },

        state_PATROL: function () {

            this.y += this.speedDescend;
            if (this.y > Ω.env.h) {
                this.remove = true;
            }

            this.spawnVote();
        },

        render: function (gfx) {

            var c = gfx.ctx;

            //c.fillStyle = this.hitTime-- > 0 ? "#fff" : "#c0c";
            //c.fillRect(this.x, this.y, this.w, this.h);
            if (this.hitTime-- > 0) {
                return;
            }
            this.sheet.render(gfx, 1, 0, this.x, this.y);

        }

    });

    window.BadPasser = BadPasser;

}(
    window.Ω,
    window.BadTheme
));