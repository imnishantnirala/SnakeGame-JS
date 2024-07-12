function init(){
    canvas = document.getElementById('mycanvas');

    W = canvas.width = 1000;
    H = canvas.height = 1000;
    cs = 67;
    game_over = false;
    score = '';
    var f;
    startgame = false;

    // create image object for food
    food_img = new Image();
    food_img.src = "Assets/apple.png";

    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    snakeHead = new Image();
    snakeHead.src = "Assets/snakeHead.png";

    snakeBody = new Image();
    snakeBody.src = "Assets/snakeBody.png";
    


    food = getRandomFood();
    // canvas used to graphics
    pen = canvas.getContext('2d');

    snake = {
        init_len: 5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len; i>0; i--){
                this.cells.push({x:i, y:0});
            }
        },

        drowSnake:function(){
            for(var i=0; i<this.cells.length; i++){
                if(i==0){
                    pen.fillStyle = 'red';
                    pen.drawImage(snakeHead, this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2);
                }else{
                    pen.fillStyle = this.color;
                    pen.drawImage(snakeBody, this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2);
                }
            }
        },
        updateSnake: function(){

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            //check if the snake eten the food increse the snake length 

            if(headX==food.x && headY == food.y){
                food = getRandomFood();
                score++;
            }else{
                this.cells.pop();
            }
            
            // Updating snake according to the direction property
            var nextX, nextY;
            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            } 
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else if(this.direction == "up"){
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({x:nextX, y:nextY});

            // write a logic that prevents snake from going out
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y ){
                game_over = true;
            }
        }
    }

    snake.createSnake();

    // Add a Event Listener on the Document Object

    function keyPressed(e){
        // Conditional Statments
        if(e.key == 'ArrowRight'){
            snake.direction = "right";
        }else if(e.key == 'ArrowLeft'){
            snake.direction = "left";
        }else if(e.key == 'ArrowDown'){
            snake.direction = "down";
        }else if(e.key == 'ArrowUp') {
            snake.direction = "up";
        }

        console.log(snake.direction);
    }

    document.addEventListener('keydown', keyPressed);
}

function drow(){
    pen.clearRect(0,0,W,H);
    snake.drowSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x*cs, food.y*cs, cs, cs);

    pen.drawImage(trophy, 18, 20, cs, cs);
    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score, 50, 50);
    
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(W-cs)/cs);

    var food = {
        x: foodX,
        y:foodY,
        color: "red",
    }
    return food; 
}

function gameLoop(){
    if(game_over==true){
        clearInterval(f);
        showPopup();
    }
    drow();
    update();
}



//popup
function showPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
    document.getElementById('popup-text').textContent = 'Game Over';
    document.getElementById('popup-score').textContent = score? 'Score: '+score: 'Score: 0';
}
function showStartGamePopup() {
    document.getElementById('startGameOverlay').style.display = 'flex';
}
function hideStartGamePopup() {
    document.getElementById('startGameOverlay').style.display = 'none';
}

function hidePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function reStart(){
    window.location.reload();
}

function startGame(){
    if(!startgame){
        hideStartGamePopup();
        f = setInterval(gameLoop, 200);
        startgame = true;
    }
}


init();
gameLoop();
showStartGamePopup();



