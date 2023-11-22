
(() => {
const myScriptTag = document.currentScript;
const myScriptId = myScriptTag.id.split("script-")[1];
const selector = 'canvas-' + myScriptId
new p5((p) => {
    let x, y;
    let xSpeed, ySpeed;
    let diameter = 50;

    p.setup = function() {
        let canvasDiv = document.getElementById(selector);
        if (!canvasDiv) {
            console.error(`No element with id ${selector} found.`);
            return;
        }
        let divWidth = canvasDiv.offsetWidth;

        p.createCanvas(divWidth, 400).parent(selector);
        
        x = p.width / 2;
        y = p.height / 2;
        
        xSpeed = 3;
        ySpeed = 3;
    };

    p.draw = function() {
        p.background(220);

        x += xSpeed;
        y += ySpeed;

        if (x > p.width - diameter / 2 || x < diameter / 2) {
            xSpeed *= -1;
        }
        if (y > p.height - diameter / 2 || y < diameter / 2) {
            ySpeed *= -1;
        }

        p.fill("red");
        p.ellipse(x, y, diameter);
    };

    p.windowResized = function() {
        let canvasDiv = document.getElementById(selector);
        if (!canvasDiv) {
            return;
        }
        let divWidth = canvasDiv.offsetWidth;
        p.resizeCanvas(divWidth, 400);
    };
});

})();