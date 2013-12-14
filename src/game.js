(function (Ω, TitleScreen) {

    "use strict";

    var OmegaGame = Ω.Game.extend({

        canvas: "#board",

        init: function (w, h) {

            this._super(w, h);

            Ω.evt.progress.push(function (remaining, max) {
                console.log((((max - remaining) / max) * 100 | 0) + "%");
            });

            Ω.input.bind({
                "fire": ["space", "mouse1", "touch"],
                "swap": [90],
                "escape": "escape",
                "left": "left",
                "right": "right",
                "up": "up",
                "down": "down",
            });

        },

        reset: function () {
            this.setScreen(new TitleScreen());
        },

        load: function () {

            this.reset();

        }

    });

    window.OmegaGame = OmegaGame;

}(
    window.Ω,
    window.TitleScreen
));
