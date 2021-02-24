class Bar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    move(direction_x) {
        this.x += direction_x;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {

}

class Brick {

}

class Game {
    constructor() {
        this.game_screen = document.getElementById("game_screen");
        this.context = this.game_screen.getContext("2d");
    }

    init() {
        let bar_width = 100;
        let bar_height = 10;
        this.bar_speed = 10;
        let x = this.game_screen.width / 2 - bar_width / 2;
        let y = this.game_screen.height - bar_height;
        this.bar = new Bar(x, y, bar_width, bar_height, "blue");
        this.bar.draw(this.context);
    }

    clear_screen() {
        this.context.clearRect(0, 0, this.game_screen.width, this.game_screen.height);
    }

    redraw_screen() {
        this.bar.draw(this.context);
    }

    handle_keyboard(window) {
        let self = this;
        window.addEventListener('keydown', function(event) {
            let key = event.keyCode;

            self.clear_screen();

            switch(key) {
                case 37: // left arrow key
                    self.bar.move(-self.bar_speed);
                    break;
                case 39: // right arrow key
                    self.bar.move(self.bar_speed);
                    break;
            }

            self.redraw_screen();
        });
    }
}

let game = new Game();
game.init();
game.handle_keyboard(window);