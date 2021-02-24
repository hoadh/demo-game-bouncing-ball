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
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
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
        this.bar_speed = 20;
        let x = this.game_screen.width / 2 - bar_width / 2;
        let y = this.game_screen.height - bar_height;
        this.bar = new Bar(x, y, bar_width, bar_height, "blue");


        let ball_radius = 10;
        let ball_x = this.game_screen.width / 2 - ball_radius / 2;
        let ball_y = this.game_screen.height / 2 - ball_radius / 2;
        this.ball = new Ball(ball_x, ball_y, ball_radius, "red");
        this.dx = 2;
        this.dy = 2;
        
        this.redraw_screen();
    }

    // Hàm phát hiện va chạm giữa hình tròn và hình chữ nhật
    isCollision(ball, bar) {
        let Ax = ball.x;
        let Ay = ball.y;
    
        let rect_left = bar.x;
        let rect_top = bar.y;
        let rect_right = bar.x + bar.width;
        let rect_bottom = bar.x + bar.width;
    
        if (ball.x < rect_left)
            Ax = rect_left;
        else if (ball.x > rect_right)
            Ax = rect_right;
    
        if (ball.y < rect_top)
            Ay = rect_top;
        else if (ball.y > rect_bottom)
            Ay = rect_bottom;
    
        let dx = ball.x - Ax;
        let dy = ball.y - Ay;
    
        return (dx * dx + dy * dy) <= ball.radius * ball.radius;
    }

    change_ball_direction() {
        this.dy = -this.dy;
    }

    clear_screen() {
        this.context.clearRect(0, 0, this.game_screen.width, this.game_screen.height);
    }

    move_ball() {
        this.ball.move(this.dx, this.dy);
    }

    redraw_screen() {
        let self = this;

        // Lặp lại thao tác vẽ màn hình sau 1 khoảng thời gian
        setInterval(function() {
            self.clear_screen();

            if (self.isCollision(self.ball, self.bar)) {
                self.change_ball_direction();
            }

            self.move_ball();
            self.bar.draw(self.context);
            self.ball.draw(self.context);
        }, 20);
    }

    handle_keyboard(window) {
        let self = this;
        window.addEventListener('keydown', function(event) {
            let key = event.keyCode;

            switch(key) {
                case 37: // left arrow key
                    self.bar.move(-self.bar_speed);
                    break;
                case 39: // right arrow key
                    self.bar.move(self.bar_speed);
                    break;
            }
        });
    }
}

let game = new Game();
game.init();
game.handle_keyboard(window);