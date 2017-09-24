import Item from 'objects/Item'
import Cauldron from 'objects/Cauldron'

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#98FB98'
		this.step = 0
		this.statusLabel = this.add.text(this.game.world.width/2 - 360, 10, '')
		this.speed = 0
        this.gameover = false

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    	this.rKey.onDown.add(this.restart, this)

    	this.background = this.game.add.sprite(0, 0, 'background')

		this.game.cookingLabel = this.add.text(this.game.world.width/2, this.game.world.height/2, 'C O O K I N G')
		this.game.cookingLabel.anchor.setTo(0.5, 0.5)
		this.game.cookingLabel.visible = false
    	this.topShelfY = 57
    	this.shelfStartX = 120

 	  	this.game.cauldron = new Cauldron(this.game, 218, 308)

    	this.inventory = []
		this.maxItems = 9
    	for (let i=0; i<this.maxItems; i++) {
    		this.inventory.push(new Item(this.game, i, this.shelfStartX + i*48, this.topShelfY))
    	}
    	this.inventory.push(new Item(this.game, 8, this.shelfStartX + 8*48 + 5, this.topShelfY+1))
    	this.inventory.push(new Item(this.game, 8, this.shelfStartX + 8*48 + 10, this.topShelfY+2))
		this.inventory.push(new Item(this.game, 1, this.shelfStartX - 3 + 1*48, this.topShelfY))
		this.inventory.push(new Item(this.game, 1, this.shelfStartX - 6 + 1*48, this.topShelfY))
		this.inventory.push(new Item(this.game, 6, 435, 233))
		this.inventory.push(new Item(this.game, 7, 390, 237))
		this.maxItems += 6

		this.game.input.mouse.capture = true


		this.game.hasSelectedSprite = false
		this.game.selectedSprite = null
		this.game.canPick = true
		this.game.canPickCountdown = 0
		this.game.canPickCountdownMax = 10


		this.game.cookingCountdown = 0
		this.game.cookingCountdownMax = 30
		this.game.cooking = false


 	  	this.game.time.advancedTiming = true
 	}

	restart() {
		this.game.state.restart()
	}

	endgame() {
		this.gameover = true
	}

	update() {
		this.step += 1

		if (this.game.canPickCountdown > 1) {
			this.game.canPickCountdown-= 1
		}
		else if (this.game.canPickCountdown == 1) {
			this.game.canPickCountdown == 0
			this.game.canPick = true
		}

		if (this.game.cookingCountdown > 1) {
			this.game.cookingCountdown -= 1
		}
		else if (this.game.cookingCountdown == 1) {
			this.game.cookingCountdown = 0
			this.game.cooking = false
			this.game.cookingLabel.visible = false
			this.game.cauldron.reset()
		}

		if (this.gameover) {
			return
		}


		if (this.game.hasSelectedSprite && this.step % 5 == 0) {
			this.game.selectedSprite.angle = this.game.rnd.integerInRange(-3, 3)
		}

		if (this.game.cooking) {
			return
		}

		if (this.game.input.activePointer.leftButton.isDown && this.game.canPick) {
			console.log("hasSelectedSprite" + this.game.hasSelectedSprite)
			console.log("SelectedSprite" + this.game.selectedSprite)
			for(let i=0; i<this.maxItems; i++) {
				if (this.inventory[i].click()) {
					break
				}
			}

		}
		
		if  (this.game.hasSelectedSprite == true) {
			this.game.selectedSprite.sprite.x = this.game.input.x
			this.game.selectedSprite.sprite.y = this.game.input.y

		}

	}

	
	render() {
		this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00")
	}
}

export default Main