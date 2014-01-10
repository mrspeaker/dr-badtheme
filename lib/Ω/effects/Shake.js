(function (Ω) {

	"use strict";

	var Shake = Ω.Class.extend({

		init: function (time, xAmount, yAmount) {

			this.time = time || 10;
			this.xAmount = xAmount || 8;
			this.yAmount = yAmount || 4;

		},

		tick: function () {

			return this.time--;

		},

		render: function (gfx) {

			gfx.ctx.translate(Math.random() * this.xAmount | 0, Math.random() * this.yAmount | 0);

		}

	});

	Ω.Shake = Shake;

}(Ω));
