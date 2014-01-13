(function (Ω) {

    "use strict";

    var gamepad = {

        buttons: {
            face_1: false,
            face_2: false,

            dpad_up: false,
            dpad_down: false,
            dpad_left: false,
            dpad_right: false
        },

        init: function () {
            this.supported = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
        },

        tick: function () {
            if (!this.supported) {
                return;
            }
            var gamepad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
            if (!gamepad) {
                return;
            }

            this.buttons.face_1 = gamepad.buttons[0];
            this.buttons.face_2 = gamepad.buttons[1];

            this.buttons.dpad_up = gamepad.buttons[12];
            this.buttons.dpad_down = gamepad.buttons[13];
            this.buttons.dpad_left = gamepad.buttons[14];
            this.buttons.dpad_right = gamepad.buttons[15];

        }

    };

    Ω.input.gamepad = gamepad;

}(window.Ω));
