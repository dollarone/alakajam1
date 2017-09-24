import Item from 'objects/Item'
import Cauldron from 'objects/Cauldron'
import Order from 'objects/Order'

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#98FB98'
		this.step = 0
		this.speed = 0
        this.gameover = false

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    	this.rKey.onDown.add(this.restart, this)

    	this.background = this.game.add.sprite(0, 0, 'background')

		this.game.cookingLabel = this.add.text(218, 230, 'C O O K I N G', { fontSize: '32px'})
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

		this.order = new Order(this.game, "Love potion", "Hi, I'd like a potion\nthat would instantly get\na person in love with me.\nAsking for a friend.")
		this.order.defineIngredient("rose", 1)
		this.order.defineIngredient("banana", -3)
		console.log("cooking : " + this.order.cook("rose","banana","condom"))

		this.punter = this.game.add.sprite(730, 270, 'punter')
		this.punter.anchor.setTo(0.5, 0.5)

		this.bubble = this.game.add.sprite(435, 145, 'bubble')
		this.bubble.anchor.setTo(0.5, 0.5)
		this.bubble.visible = false
		this.bubbleLabel = this.add.text(430, 145, '', { fontSize: '12px'})
		this.bubbleLabel.anchor.setTo(0.5, 0.5)


		this.game.input.mouse.capture = true


		this.game.hasSelectedSprite = false
		this.game.selectedSprite = null
		this.game.canPick = true
		this.game.canPickCountdown = 0
		this.game.canPickCountdownMax = 10


		this.game.cookingCountdown = 0
		this.game.cookingCountdownMax = 30
		this.game.cooking = false

		this.textLength = 100
		this.game.gamestate = 0
		// 0 = start; tutorial/instructions running
		// 1 = tutorial done/game start
		// 10 = customer enters
		// 20 = customer has animated in; bubble; places order; normal game mode enabled
		// 25 = bubble dies; 
		// 30 = cooking
		// 40 = cooking finished; outcome; gold added or gameover
		// 45 = customer going out
		// 50 = customer out; waiting a small amount of time; spawn new customer or salesman


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

		if (this.step == 2) {
			this.game.gamestate = 1
		}
		if (this.step == 3) {
			this.game.gamestate = 10
		}

		if (this.game.gamestate == 50 && this.step == this.waitForStep) {
				this.game.gamestate = 10
				this.punter.frame = 0 // TODO: add more
				//new : this.order ...
				// or spawn salesman
		}
		if (this.game.gamestate == 45 && this.step == this.waitForStep) {
				this.bubble.visible = false
				this.bubbleLabel.visible = false
				this.game.gamestate = 25
		}

		if (this.game.gamestate == 20 && this.step == this.waitForStep) {
				this.bubble.visible = false
				this.bubbleLabel.visible = false
				this.game.gamestate = 25
		}


		if (this.game.gamestate == 42 && this.step == this.waitForStep) {
				this.bubble.visible = false
				this.bubbleLabel.visible = false
				this.game.gamestate = 45
		}

		if (this.game.gamestate == 40 && this.step == this.waitForStep) {
				this.bubbleLabel.text = this.order.result
				this.bubble.visible = true
				this.bubbleLabel.visible = true
				this.waitForStep = this.step + this.textLength
				this.game.gamestate = 42
		}

		if (this.punter.x > 580 && this.step % 1 == 0 && this.game.gamestate == 10) {
			this.punter.x -= 1
		}
		if (this.punter.x < 730 && this.step % 1 == 0 && this.game.gamestate == 45) {
			this.punter.x += 1
		}
		if (this.punter.x == 730 && this.game.gamestate == 45) {
			this.game.gamestate = 50
			this.waitForStep = this.step + 30
		}
		if (this.punter.x == 580 && this.game.gamestate == 10) {
			this.game.gamestate = 20
			this.bubbleLabel.text = this.order.description
			this.bubble.visible = true
			this.waitForStep = this.step + this.textLength
		}

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
			let potionQuality = this.order.cook(this.game.cauldron.item1.name, this.game.cauldron.item2.name, this.game.cauldron.item3.name)
			let result = ""
			switch (potionQuality) {
				case 0: result = "This has no effect!\nYou're clearly just making\nit up! No money from me!"

			}
			this.waitForStep = this.step + 30
			this.order.result = result
			this.game.cooking = false
			this.game.cookingLabel.visible = false
			this.game.cauldron.reset()
			this.game.gamestate = 40
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
//			console.log("hasSelectedSprite" + this.game.hasSelectedSprite)
//			console.log("SelectedSprite" + this.game.selectedSprite)
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