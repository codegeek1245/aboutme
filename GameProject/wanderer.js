window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 720;
    
    //Input constructor that allows w, a, s, d for movement such as running or jumping
    class InputHandler{
        constructor(){
            window.addEventListener('keydown', ({keyCode}) => {
                //console.log(keyCode)
                switch(keyCode){
                    case 65:
                        console.log('left')
                        keys.left.pressed = true
                        break
                    case 83:
                        console.log('down')
                        break
                    case 68:
                        console.log('right')
                        keys.right.pressed = true
                        break     
                    case 87:
                        console.log('up')
                        player.velocity.y -= 15
                        break       
                }
                console.log(keys.right.pressed)
            })
            
            window.addEventListener('keyup', ({keyCode}) => {
                //console.log(keyCode)
                switch(keyCode){
                    case 65:
                        console.log('left')
                        keys.left.pressed = false
                        break
                    case 83:
                        console.log('down')
                        break
                    case 68:
                        console.log('right')
                        keys.right.pressed = false
                        break     
                    case 87:
                        console.log('up')
                        player.velocity.y -= 25
                        break       
                }
                console.log(keys.right.pressed)
            })
        }
    }

    const gravity = 1.5
    // Player constructor
    class Player {
        constructor(){
            this.position = {
                x: 100,
                y: 100
            }
            this.velocity = {
                x: 0,
                y: 0
            }
            this.width = 30
            this.height = 30
        }
        // player draw function
        draw(){
            ctx.fillStyle = 'red'
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        // player updates movement
        update(){
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
                this.velocity.y += gravity
        }
    }


    // Background constructor
    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 1000;
            this.height = 720;
        }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
        update(){
            if(this.x < 0 - this.width) this.x = 0;
        }
        
    }

    // Platform constructor
    class Platform {
        constructor({x, y, x2}) {
            this.position = {
                x,
                y 
            }
            
            this.width = x2
            this.height = 20
            this.image = document.getElementById('plaformImage')
            
        }
    
        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height + 100)

        }
    }

    
    
    
    let input = new InputHandler();
    let player = new Player();
    let platforms =  []
    let backgrounds = [];                
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }

    let scrollOffset = 0
    let gameOver = false
    
    //Display text 
    function displayWinningText(context){
        context.font = '40px Helvetica';
        
        //Display text when you win
        if(gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('Congratulations', canvas.width/2, 200);
        }
    }
    //Reset game and initate game
    function init(){
        player = new Player();
        platforms =  [new Platform({x: -1, y: 520, x2: 200}),
                      new Platform({x: 398, y: 520, x2: 500}),
                      new Platform({x: 398*2 + 100, y: 520, x2: 200}),
                      new Platform({x: 398*3, y: 520, x2: 250}),
                      new Platform({x: 398*4 - 150, y: 520, x2: 500}),
                      new Platform({x: 398*4 + 400, y: 300, x2: 250}),
                      new Platform({x: 398*5 + 450, y: 300, x2: 250}),
                      new Platform({x: 398*5 + 500, y: 520, x2: 600}),
                      new Platform({x: 398*6 + 500, y: 520, x2: 900})]
        backgrounds = [new Background(canvas.width, canvas.height)];                

        scrollOffset = 0
    }
    //Function that draws, and animate the platform, characters, background
    function animate(){
        if(!gameOver) requestAnimationFrame(animate);
        backgrounds.forEach(background => {
            background.draw();
            background.update();
        })
       
        //Draw player and updates any movement
        player.draw(ctx);
        player.update();
        displayWinningText(ctx);
        

        //Draws platform
        platforms.forEach((platform) => {
            platform.draw()
        })    
        
        //Any key pressed affect the player movement, background, and platforms
        if(keys.right.pressed && player.position.x < 400){
            player.velocity.x = 5
        } 
        else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
            player.velocity.x = -5
        }
        else{ player.velocity.x = 0

            if (keys.right.pressed){
                scrollOffset += 5
                platforms.forEach((platform) => {
                platform.position.x -= 5
                })
                backgrounds.forEach((background) => {
                    background.x -= 3
                })
            }
            else if (keys.left.pressed && scrollOffset > 0){
                scrollOffset -= 5
                platforms.forEach((platform) => {
                platform.position.x += 5
                })
                backgrounds.forEach((background) => {
                    background.x += 3
                })    
            }
        }    
        console.log(scrollOffset)
        //check platform collision
        platforms.forEach((platform) => {
            if(player.position.y + player.height <= 
               platform.position.y && player.position.y + 
               player.height + player.velocity.y >= platform.position.y 
               && player.position.x + player.width >= platform.position.x
               && player.position.x <= platform.position.x + platform.width){
               player.velocity.y = 0
            }
           })
        
        // win condition and stops the game
        if(scrollOffset > 3300){
            gameOver = true;
            console.log('you win')
        }
        
        // lose condition
        if(player.position.y > canvas.height){
            init()
        }
    }
    // initate program
    init();
    // animation start
    animate();


});

