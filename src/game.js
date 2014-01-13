(function (Ω, TitleScreen, GameOverScreen) {

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
                "swap": [88],
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

        },

        gameOver: function () {
            this.setScreen(new GameOverScreen());
        }

    });

    window.OmegaGame = OmegaGame;

}(
    window.Ω,
    window.TitleScreen,
    window.GameOverScreen
));
