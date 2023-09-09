//robotjs libary
var robot = require('robotjs');

//Main
function main() {
    console.log("Starting");
    sleep(4000);

    var number_of_clicks = 0;
    while(number_of_clicks < 26) {
        
        var property = findItem();
        //if script cannot locate an item to harvest. script ends.
        if(property == false){
            rotateView();
            console.log("test");
            continue;
        }

        //harvest
        robot.moveMouseSmooth(property.x, property.y);
        robot.mouseClick();

        sleep(8000);

        //dropping the property obtained
        dropItem();
        
        number_of_clicks++;
    }

    console.log("Done");
}

function dropItem(){
    var invX = 1705;
    var invY = 756;
    //dropping the item obtained
    robot.moveMouseSmooth(invX, invY);
    robot.mouseClick('right');
    robot.moveMouseSmooth(invX, invY + 46);
    robot.mouseClick();
    sleep(8000);
}

function testCapture(){
    //screenshot
    var img = robot.screen.capture(0, 0, 1920, 1080);

    var pixel_color = img.colorAt(24, 17);

    console.log(pixel_color);
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0 , ms);
}


function findItem(){
    var x = 300;
    var y = 300;
    var width = 1300;
    var height = 400;

    var img = robot.screen.capture(x, y, width, height);

    var itemColors = ["#694c29", "#7d5c32", "#100c04", "#42301a", "#372814", "#46331b", "#77582f", "#846033", "#614726", "#30391d", "#2d3906"];

    for(var i = 0; i < 1000; i++) {
        var randomX = getRandomInt(0, width-1);
        var randomY = getRandomInt(0, height-1);
        var ourColor = img.colorAt(randomX, randomY);

        if(itemColors.includes(ourColor)) {
            var screenX = randomX + x;
            var screenY = randomY + y;

            console.log("Property at:" + screenX + ", " + screenY + " color " + ourColor);
            return {x: screenX, y: screenY};
        }
    }

    //cannot locate property colors
    return false;
    

}

function rotateView(){
    console.log("rotate camera");

    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();