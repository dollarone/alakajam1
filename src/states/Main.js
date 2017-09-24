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
		this.order.defineIngredient("rose", -1)
		this.order.defineIngredient("banana", 10)
//		console.log("cooking : " + this.order.cook("rose","banana","condom"))

	    var graphics = this.game.add.graphics(539, 1)
    	graphics.lineStyle(2, 0x111, 1)
    	graphics.beginFill(0x000, 0.5)
	    graphics.drawRect(0, 0, 100, 30)

		this.gold = this.game.add.sprite(554, 17, 'items')
		this.gold.frame = 9
		this.gold.anchor.setTo(0.5, 0.5)
		this.game.money = 200
		this.moneyLabel = this.add.text(600, 18, this.game.money, { fontSize: '20px'})
		this.moneyLabel.anchor.setTo(0.5, 0.5)

	    this.strikes = this.game.add.graphics(539, 31)
    	this.strikes.lineStyle(2, 0x111, 1)
    	this.strikes.beginFill(0x000, 0.5)
	    this.strikes.drawRect(0, 0, 100, 30)
	    this.strikes.visible = false

		this.strike1 = this.game.add.sprite(560, 47, 'items')
		this.strike1.frame = 10
		this.strike1.anchor.setTo(0.5, 0.5)
		this.strike1.visible = false

		this.strike2 = this.game.add.sprite(590, 47, 'items')
		this.strike2.frame = 10
		this.strike2.anchor.setTo(0.5, 0.5)
		this.strike2.visible = false

		this.strike3 = this.game.add.sprite(620, 47, 'items')
		this.strike3.frame = 10
		this.strike3.anchor.setTo(0.5, 0.5)
		this.strike3.visible = false
		this.fails = 0

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

		this.textLength = 150
		this.game.gamestate = 0
		this.waitForStep = 1
		this.punterSpeed = 1
		// 0 = start; tutorial/instructions running
		// 1 = tutorial done/game start
		// 10 = customer enters
		// 20 = customer has animated in; bubble; places order; normal game mode enabled
		// 25 = bubble dies; 
		// 30 = cooking
		// 40 = cooking finished; outcome; gold added or gameover
		// 45 = customer going out
		// 50 = customer out; waiting a small amount of time; spawn new customer or salesman

		this.gameoverLabel = this.add.text(this.game.world.width/2, this.game.world.height/2, 
			'Sadly the auhorities shut down your shop due to complaints.\n           Your days as a modern-day Alchemist are over!\n                                          GAME OVER', { fontSize: '20px'})
		this.gameoverLabel.anchor.setTo(0.5, 0.5)
		this.gameoverLabel.visible = false

		this.gamestartLabel = this.add.text(this.game.world.width/2, this.game.world.height/2 - 50, 
			'                             You are a modern-day alchemist. \n     You conjure up potions for everyday ills and special thrills. ' +
			"\n   You've just opened up your shop, and in order to boost sales" + "\nyou've decided to let the customer decide the cost of each potion." +
			'\n                                               Good luck!', { fontSize: '20px'})
		this.gamestartLabel.anchor.setTo(0.5, 0.5)
		this.gamestartLabel.visible = false


 	  	this.game.time.advancedTiming = true
 	}

	restart() {
		this.game.state.restart()
	}

	endgame() {
		this.gameover = true
	}

	update() {
		console.log("state " + this.game.gamestate)
		this.step += 1

		if (this.step == 20 && this.game.gamestate == 0) {
			this.game.gamestate = 1
			this.gamestartLabel.visible = true
			this.waitForStep = this.step + this.textLength * 2
		}
		if (this.step == this.waitForStep && this.game.gamestate == 1) {
			this.game.gamestate = 10
			this.gamestartLabel.visible = false
		}

		if (this.game.gamestate == 50 && this.step == this.waitForStep) {
				this.game.gamestate = 10
				this.punter.frame = 1 // TODO: add more
				this.punterSpeed = 2

				this.order = new Order(this.game, "Flying potion", "I wanna fly like a bird!\nCan you make a potion?\nThat'd be awesome!")
				this.order.defineIngredient("rose", 1)
				this.order.defineIngredient("banana", -3)
				//new : this.order ...
				// or spawn salesman
		}
		if (this.game.gamestate == 45 && this.step == this.waitForStep) {
				this.bubble.visible = false
				this.bubbleLabel.visible = false
				this.game.gamestate = 50
		}

		if (this.game.gamestate == 20 && this.step == this.waitForStep) {
				this.bubble.visible = false
				this.bubbleLabel.visible = false
				this.game.gamestate = 25
		}


		if (this.game.gamestate == 100 && this.step == this.waitForStep) {
			this.gameover = true
			this.gameoverLabel.visible = true
			this.game.gamestate = 101

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
				this.game.money += this.order.gold
				this.moneyLabel.text = this.game.money
				if (this.fails == 1) {
					this.strikes.visible = true
					this.strike1.visible = true
				}
				else if (this.fails == 2) {
					this.strike2.visible = true
				}
				else if (this.fails == 3) {
					this.strike3.visible = true
					this.game.gamestate = 100
				}

		}

		if (this.punter.x > 580 && this.game.gamestate == 10) {
			this.punter.x -= this.punterSpeed
		}
		if (this.punter.x < 730 && this.game.gamestate == 45) {
			this.punter.x += 2
		}
		if ((this.punter.x == 730 || this.punter.x == 731) && this.game.gamestate == 45) {
			this.game.gamestate = 50
			this.waitForStep = this.step + 10
		}
		if ((this.punter.x == 580 || this.punter.x == 581) && this.game.gamestate == 10) {
			this.game.gamestate = 20
			this.bubbleLabel.text = this.order.description
			this.bubble.visible = true
			this.bubbleLabel.visible = true
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
			//console.log("cooking with " + this.game.cauldron.item1name + "," +  this.game.cauldron.item2name + "," + this.game.cauldron.item3name)
			let potionQuality = this.order.cook(this.game.cauldron.item1name, this.game.cauldron.item2name, this.game.cauldron.item3name)
			let result = ""
			this.waitForStep = this.step + 30
			this.game.cooking = false
			this.game.cookingLabel.visible = false
			this.game.cauldron.reset()
			this.game.gamestate = 40

			switch (potionQuality) {
				case 0: result = "This has no effect!\nYou're clearly just making \nit up! No money from me!"
						break
				case 1: 
				case 2: result = "Hmm.. very minimal\neffect - are you new?\nAnyway, I'll take it. \nHere's $" + this.order.gold + "."
						break
				case 3: 
				case 4: 
				case 5: 
				case 6: 
				case 7: 
				case 8: 
				case 9: result = "Very nice potion,\njust what I need!\nHere's $" + this.order.gold + "!"
						break
				case 10:
				case 11:
				case 12:
				case 13:
				case 14: result = "Excellent!\nVery good stuff indeed!\nHere's $" + this.order.gold + "!"
						break
				case 15: 
				case 16:
				case 17:
				case 18:
				case 19:
				case 20: result = "AMAZING!\nThis is beyond genius!\nTake all my money! $" + this.order.gold + "!"
						break
				default: // negative
						result = "Yuuurgh, what's this?\nAre you trying to kill me? \nI will report this to the\nauthorities!"
						this.fails += 1
			}
			this.order.result = result
		}

		if (this.game.input.activePointer.leftButton.isDown && (
			this.game.gamestate == 40 || this.game.gamestate == 42 || this.game.gamestate == 1 || this.game.gamestate == 20)) {
			this.step = this.waitForStep -1
		}

		if (this.gameover || this.game.gamestate < 10) {
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