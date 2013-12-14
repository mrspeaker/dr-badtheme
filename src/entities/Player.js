(function (Ω, Bullet) {

    "use strict";

    var Player = Ω.Entity.extend({

        w: 16,
        h: 24,

        vx: 0,
        vy: 0,

        ac: 0.5,
        drag: 0.9,

        woundTime: 0,

        lastShot: 0,
        shotRate: 50,

        health: 100,
        healthRate: 20,

        ammo: 100,
        ammoRate: 2,
        ammoReward: 8,

        init: function (x, y, screen) {

            this.x = x;
            this.y = y;
            this.screen = screen;

            this.lastShot = Ω.utils.now();

            this.bullets = [];
        },

        tick: function () {

            this.handleInput();

            this.bullets = this.bullets.filter(function (b) {
                return b.tick();
            });
            this.woundTime--;

        },

        handleInput: function () {
            var xo = 0,
                yo = 0;

            if (Ω.input.isDown("up")) {
                yo -= this.ac;
            }
            if (Ω.input.isDown("down")) {
                yo += this.ac;
            }
            if (Ω.input.isDown("right")) {
                xo += this.ac;
            }
            if (Ω.input.isDown("left")) {
                xo -= this.ac;
            }

            if (xo !== 0 && yo !== 0) {
                // Don't allow extra diag movements
            }

            this.vx += xo;
            this.vy += yo;

            this.vx *= this.drag;
            this.vy *= this.drag;

            this.x += this.vx;
            this.y += this.vy;

            var now = Ω.utils.now();
            if (Ω.input.isDown("fire")) {
                if (now - this.lastShot > this.shotRate) {
                    this.lastShot = now;
                    this.fire();
                }
            }

            if (Ω.input.pressed("swap")) {
                this.swapBinary();
            }

        },

        fire: function () {

            if (this.ammo > 0) {
                this.bullets.push(
                    new Bullet(this.x + 7, this.y - 2)
                );
                this.ammo -= this.ammoRate;
            }


        },

        swapBinary: function () {
            this.screen.swapBinary();
        },

        hit: function (e) {
            if (e instanceof Binary) {
                if (e.isOne) {
                    this.ammo = Math.min(100, this.ammo + this.ammoReward);
                    e.remove = true;
                } else {
                    if (this.woundTime <= 0) {
                        this.wound();
                    }
                }
            }

            if (e instanceof Health) {
                this.health = Math.min(100, this.health + e.amount);
            }

        },

        wound: function () {
            this.health = Math.max(-1, this.health - this.healthRate);
            if (this.health < 0) {
                this.screen.playerDead();
            }
            this.woundTime = 30;
        },

        render: function (gfx) {
            var c = gfx.ctx;

            this.bullets.forEach(function (b) {
                b.render(gfx);
            });

            if (this.woundTime > 0 && Ω.utils.toggle(70, 2)) {
                return;
            }
            c.fillStyle = "#00c";
            c.fillRect(this.x, this.y, this.w, this.h);

        }
    });

    window.Player = Player;

}(
    window.Ω,
    window.Bullet
));
