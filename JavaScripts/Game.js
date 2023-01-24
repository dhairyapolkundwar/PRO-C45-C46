class Game{

    constructor(){
        this.player = rect(400, windowHeight - 360, 100, 100)
        this.score = 0;
    }

    start(){
        var form = new MainScreen();
        form.display();
    }

    #detectTouch = function(objectA, objectB){
        objectA.overlap(objectB, function(collector, collected){
            gameState.currentState = "end"
            collected.remove()
            this.showLoseMessage()
        })
    }

    


     #generateObstacles = function(timePeriod, group){
        if(frameCount%timePeriod === 0){

            var obsNo = round(random(0,2))

            if(obsNo > 0){
                var obstacle = createSprite(windowWidth + 300, windowHeight - 150, 100, 100)
            } else {
                var obstacle = createSprite(windowWidth + 300, windowHeight - 138, 100, 100)
            }
            
            obstacle.velocity.x = -10
            obstacle.addImage(objects[obsNo])
            group.add(obstacle)

            

        }

        
        
    } 

    #enemyImage = 0;
    #playerImage = 0;
    #playerPos = 0;

    showLoseMessage(){
        
            swal({
                title: 'You Lost',
                text: 'Your Score: ' + this.score,
                imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
                confirmButtonText: 'Restart Game'
            })
       

    }

    play(){

        this.#enemyImage += 0.3
        this.#playerImage += 0.2
        if(gameState.currentState === "running"){

            if(this.#enemyImage >= (enemyRunning.length - 0.5)){
                this.#enemyImage = 0;
            }

            if(this.#enemyImage < (enemyRunning.length - 0.5)){
                image(enemyRunning[Math.round(this.#enemyImage)], 200, windowHeight - 420, 376 / 1.5, 520 / 1.5)
            }

            if(this.#playerImage >= (running.length - 0.5)){
                this.#playerImage = 0;
            }

            if(currentCMD === "run"){
                if(this.#playerImage < (running.length - 0.5)){
                    if(this.#playerPos > 0){
                        this.#playerPos -= 5
                    }
                    image(running[Math.round(this.#playerImage)], 400, (windowHeight - 360) - this.#playerPos, 641 / 2, 542 / 2)
                }
            } else if(currentCMD === "jump"){
                if(this.#playerImage < (jump.length - 0.5)){
                    if(this.#playerPos < 150){
                        this.#playerPos += 5
                    }
                    

                    image(jump[5], 400, (windowHeight - 360) - this.#playerPos, 641 / 2, 542 / 2)
                
                }
            }
            

            this.#generateObstacles(180, obstacleGroup)
            // this.#detectTouch(this.player, obstacleGroup)

        } else if(gameState.currentState === "end"){

            if(this.#enemyImage >= (enemyIdle.length - 0.5)){
                this.#enemyImage = 0;
            }

            if(this.#enemyImage < (enemyIdle.length - 0.5)){
                image(enemyIdle[Math.round(this.#enemyImage)], 200, windowHeight - 420, 290 / 1.5, 500 / 1.5)
            }

            if(this.#playerImage >= (dead.length - 0.5)){
                this.#playerImage = dead.length - 1;
            }

            if(this.#playerImage < (dead.length - 0.5)){
                image(dead[Math.round(this.#playerImage)], 400, windowHeight - 360, 605 / 2, 604 / 2)
            }

        }

        drawSprites();
        
    }

}
