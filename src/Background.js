(function (Ω) {

    "use strict";

    var Background = {
        speed1: 3,
        speed2: 5,
        starCount: 50,
        init: function () {
            this.stars = [];
            for (var i = 0; i < this.starCount; i++) {
                this.stars.push([Math.random() * Ω.env.w | 0, Math.random() * Ω.env.h | 0]);
            }
            return this;
        },
        tick: function () {
            var h = Ω.env.h,
                speed1 = this.speed1,
                speed2 = this.speed2,
                layer = this.starCount / 2;
            this.stars = this.stars.map(function (s, i) {
                s[1] += i < layer ? speed1 : speed2;
                if (s[1] > h) {
                    s[1] = 0;
                    s[0] = Math.random() * Ω.env.w | 0;
                }
                return s;
            });
        },
        render: function (gfx) {

            var s = this.stars,
                count = this.starCount,
                half = count / 2;

            gfx.ctx.fillStyle = "#555";
            for (var i = 0; i < half; i++) {
                gfx.ctx.fillRect(s[i][0], s[i][1], 2, 2);
            }

            gfx.ctx.fillStyle = "#888";
            for (i = half; i < count; i++) {
                gfx.ctx.fillRect(s[i][0], s[i][1], 2, 2);
            }
        }
    };

    window.Background = Background;

}(window.Ω));
