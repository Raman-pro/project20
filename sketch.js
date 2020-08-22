var car, wall;

function setup() {
    createCanvas(1600, 400);
    car = createSprite(100, 200, 50, 15);
    wall = createSprite(1500, 200, 20, 300);
}

var carMoving = false;
var carCrashed = false;
var once = false

function draw() {
    background(0);
    if (carCrashed && once) {
        car.velocityX = 0;
        car.x = 100
        car.y = 200
        carCrashed = false
        carMoving = false;
        once = false;
    }
    $("#r").on("click", function () {

        if (!carMoving && !carCrashed) {
            speed = Math.round(random(55, 90));
            $("#s").prop("value", `${speed}`)
            weight = Math.round(random(400, 1500));
            $("#w").prop("value", `${weight}`)
            car.velocityX = speed;
            carMoving = true;
        }
    })
    $("#su").on("click", () => {
        if (carCrashed) {
            car.x = 100
            car.y = 200
            carCrashed = false
            carMoving = false;
            once = false;
        }
        if (!carMoving && !carCrashed) {
            speed = parseInt($("#s").val());
            weight = parseInt($("#w").val());
            if (speed < 90) {
                car.velocityX = speed;
                carMoving = true;
            } else {
                $("#s").prop("value", `speed shall be smaller than 90`)
            }
        }
    })
    collide(car, wall, function () {
        if (!once) {
            car.velocityX = 0;
            var result = Math.round((0.5 * weight * (speed ** 2)) / 22500);
            console.log(result)
            carMoving = false;
            carCrashed = true;
            if (result < 100) {
                car.shapeColor="green"
            } else if (result > 100 && result < 180){
                car.shapeColor="yellow"
            }else{
                car.shapeColor="red"
            }
                $("#res").prop("value", `${result}`)
            once = true;
        }
    });
    drawSprites();
}

function collide(sprite1, sprite2, func) {
    if (sprite1.x - sprite2.x < sprite1.width / 2 + sprite2.width / 2 && sprite2.x - sprite1.x < sprite1.width / 2 + sprite2.width / 2 && sprite1.y - sprite2.y < sprite1.height / 2 + sprite2.height / 2 && sprite2.y - sprite1.y < sprite1.height / 2 + sprite2.height / 2) {
        func()
    }
}