(function (Ω) {

    "use strict";

    var Conductor = Ω.Class.extend({

        frame: 0,
        now: 0,
        state: null,

        lastBaddie: 0,

        init: function (screen) {

            this.screen = screen;
            this.state = new Ω.utils.State("BORN");

            return this;

        },

        tick: function () {

            this.now = Ω.utils.now();

            this.state.tick();
            switch (this.state.get()) {
            case "BORN":
                this.state.set("INTRO");
                break;
            case "INTRO":
                if (this.state.first()) {
                    console.log("INTRO");
                }
                if (this.state.count > 100) {
                    this.state.set("WAVE-TIMED");
                }
                break;
            case "WAVE-TIMED":
                if (this.state.first()) {
                    console.log("WAVE LIL!");
                }
                this.state_WAVETIMED();
                break;
            case "WAVE-BIG":
                break;
            case "BOSS":
                break;
            }

        },

        state_INTRO: function () {

        },

        state_WAVETIMED: function () {
            if (this.now - this.lastBaddie > 100 && this.screen.baddies.length < 20) {
               this.lastBaddie = this.now;
               var Clazz = Math.random() < 0.7 ? window.BadPasser : window.BadTheme;
               this.screen.baddies.push(
                   new Clazz(
                       (Math.random() * Ω.env.w / 2 + 100) | 0,
                       Ω.utils.rand(150, 10),
                       Math.random() < 0.2,
                       this.screen
                   )
               );
           }
        }

    });

    window.Conductor = Conductor;

}(
    window.Ω
));