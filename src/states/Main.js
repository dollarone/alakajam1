import Item from 'objects/Item'
import Cauldron from 'objects/Cauldron'
import Order from 'objects/Order'

class Main extends Phaser.State {

	startMusic() {
		this.loopMusic.loopFull()
	}

	create() {

		this.loopMusic = this.game.add.audio('loop')
	    
		this.splashMusic = this.game.add.audio('intro')
	    this.splashMusic.play()
	    this.splashMusic.onStop.add(this.startMusic, this)

	    this.game.sfx_drop1 = this.game.add.audio('drop1')
	    this.game.sfx_drop2 = this.game.add.audio('drop2')
	    this.game.sfx_drop3 = this.game.add.audio('drop3')
	    this.game.sfx_drop4 = this.game.add.audio('drop4')
	    this.game.sfx_cooking = this.game.add.audio('cooking')
	    this.game.sfx_select = this.game.add.audio('select')
	    this.game.sfx_done = this.game.add.audio('done')

		this.game.stage.backgroundColor = '#190d0b'
		this.step = 0
		this.speed = 0
        this.gameover = false

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    	this.rKey.onDown.add(this.restart, this)

    	this.background = this.game.add.sprite(0, 0, 'background')

		this.game.cookingLabel = this.add.text(235, 230, 'C O O K I N G', { fontSize: '32px'})
		this.game.cookingLabel.anchor.setTo(0.5, 0.5)
		this.game.cookingLabel.visible = false
    	this.topShelfY = 75
    	this.shelfStartX = 162


    	this.inventory = []
		this.maxItems = 5
    	for (let i=0; i<3; i++) {
    		this.inventory.push(new Item(this.game, i, this.shelfStartX + i*48, this.topShelfY))
	   		this.inventory.push(new Item(this.game, 27, this.shelfStartX + i*20 + 200, 250))
    	}
    	this.inventory.push(new Item(this.game, 26, this.shelfStartX + 10*32+16, 250))
    	this.inventory.push(new Item(this.game, 25, this.shelfStartX + 11*32+8, 250))
  		this.inventory.push(new Item(this.game, 5, 45, 50))

		this.inventory.push(new Item(this.game, 17, this.shelfStartX + 20, 180))
		this.inventory.push(new Item(this.game, 11, this.shelfStartX + 120, 180))
		this.inventory.push(new Item(this.game, 11, this.shelfStartX + 139, 178))
		this.inventory.push(new Item(this.game, 6, this.shelfStartX + 380, 178))
		this.inventory.push(new Item(this.game, 6, this.shelfStartX + 400, 176))
		this.inventory.push(new Item(this.game, 12, this.shelfStartX + 360, 176))
		this.inventory.push(new Item(this.game, 12, this.shelfStartX + 330, 176))
		this.inventory.push(new Item(this.game, 12, this.shelfStartX + 344, 177))

    	this.inventory.push(new Item(this.game, 8, this.shelfStartX + 8*48, this.topShelfY+1))
    	this.inventory.push(new Item(this.game, 8, this.shelfStartX + 8*48 + 5, this.topShelfY+1))
    	this.inventory.push(new Item(this.game, 8, this.shelfStartX + 8*48 + 10, this.topShelfY+2))
		this.inventory.push(new Item(this.game, 1, this.shelfStartX - 4 + 1*48, this.topShelfY))
		this.inventory.push(new Item(this.game, 1, this.shelfStartX - 8 + 1*48, this.topShelfY))

		this.inventory.push(new Item(this.game, 6, 40, 140))
		this.inventory.push(new Item(this.game, 7, 65, 130))
		this.inventory.push(new Item(this.game, 4, 53, 227))
		this.inventory.push(new Item(this.game, 14, 50, 295))
		
		this.inventory.push(new Item(this.game, 20, 15, 167))
		this.inventory.push(new Item(this.game, 3, 18, 246))
		this.inventory.push(new Item(this.game, 13, 18, 308))
		this.inventory.push(new Item(this.game, 23, 18, 80))

		this.inventory.push(new Item(this.game, 10, 123, 285))

   		this.inventory.push(new Item(this.game, 19, this.shelfStartX + 3*48, this.topShelfY))
   		this.inventory.push(new Item(this.game, 16, this.shelfStartX + 4*48, this.topShelfY))
		this.inventory.push(new Item(this.game, 16, this.shelfStartX + 4*48+3, this.topShelfY+1))
		this.inventory.push(new Item(this.game, 16, this.shelfStartX + 4*48+6, this.topShelfY-3))
		this.inventory.push(new Item(this.game, 16, this.shelfStartX + 4*48+9, this.topShelfY))

   		this.inventory.push(new Item(this.game, 21, this.shelfStartX + 5*48, this.topShelfY))
   		this.inventory.push(new Item(this.game, 24, this.shelfStartX + 6*48, this.topShelfY))
   		this.inventory.push(new Item(this.game, 22, this.shelfStartX + 7*48, this.topShelfY))

 	  	this.game.cauldron = new Cauldron(this.game, 218, 308)

		this.order = new Order(this.game, "Love potion", "Hi, I'd like a potion\nthat would instantly get\na person in love with me.\nAsking for a friend.")
		this.order.defineIngredient("rose", 3)
		this.order.defineIngredient("perfume", 3)
		this.order.defineIngredient("chocolate", 3)
		this.order.defineIngredient("banana", -1)
		this.order.defineIngredient("condom", -3)
		this.order.defineIngredient("broken mirror", -10)
		this.order.defineIngredient("mouse trap", -10)
		this.order.defineIngredient("red wine", 1)
		this.order.defineIngredient("candle", 1)
		this.order.defineIngredient("pizza slice", -3)
		this.order.defineIngredient("warm gun", -10)
		this.order.defineIngredient("handcuffs", -5)
		this.order.defineIngredient("battery", -1)
		this.order.defineIngredient("sock", -1)
		this.order.defineIngredient("skull", -10)

		this.gold = this.game.add.sprite(554, -5, 'items')
		this.gold.frame = 30
		this.gold.anchor.setTo(0.5, 0.5)
		this.game.money = 200
		this.moneyLabel = this.add.text(600, 18, this.game.money, { fontSize: '20px', fill: '#aaa'})
		this.moneyLabel.anchor.setTo(0.5, 0.5)

	    this.strikes = this.game.add.graphics(539, 31)
    	this.strikes.lineStyle(2, 0x111, 1)
    	this.strikes.beginFill(0x000, 0.5)
	    this.strikes.drawRect(0, 0, 100, 30)
	    this.strikes.visible = false

		this.strike1 = this.game.add.sprite(560, 27, 'items')
		this.strike1.frame = 31
		this.strike1.anchor.setTo(0.5, 0.5)
		this.strike1.visible = false

		this.strike2 = this.game.add.sprite(590, 27, 'items')
		this.strike2.frame = 31
		this.strike2.anchor.setTo(0.5, 0.5)
		this.strike2.visible = false

		this.strike3 = this.game.add.sprite(620, 27, 'items')
		this.strike3.frame = 31
		this.strike3.anchor.setTo(0.5, 0.5)
		this.strike3.visible = false
		this.fails = 0


		this.bubble = this.game.add.sprite(435, 145, 'bubble')
		this.bubble.anchor.setTo(0.5, 0.5)
		this.bubble.visible = false
		this.bubbleLabel = this.add.text(430, 145, '', { fontSize: '12px'})
		this.bubbleLabel.anchor.setTo(0.5, 0.5)


		this.game.input.mouse.capture = true

		this.game.nameLabel = this.add.text(218, 230, '', { fontSize: '12px'})
		this.game.nameLabel.anchor.setTo(0.5, 0.5)
		this.game.nameLabel.visible = false


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
		this.waitForStep = 20
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

		this.desk = this.game.add.sprite(474, 320, 'desk')
		this.desk.anchor.setTo(0.5, 0.5)

		this.inventory.push(new Item(this.game, 9, 435, 217))
		
		this.inventory.push(new Item(this.game, 15, 462, 217))
		this.maxItems = this.inventory.length

		this.punter = this.game.add.sprite(730, 270, 'punter')
		this.punter.anchor.setTo(0.5, 0.5)

		this.gameoverLabel = this.add.text(this.game.world.width/2, this.game.world.height/2, 
			'Sadly the auhorities shut down your shop due to complaints.\n           Your days as a modern-day Alchemist are over!\n                                          GAME OVER', { fontSize: '20px', fill: '#aaa'})
		this.gameoverLabel.anchor.setTo(0.5, 0.5)
		this.gameoverLabel.visible = false

	    this.introBlur = this.game.add.graphics(20, 20)
    	this.introBlur.lineStyle(2, 0x111, 1)
    	this.introBlur.beginFill(0x000, 0.8)
	    this.introBlur.drawRect(0, 0, 600, 350)
	    this.introBlur.visible = false

		this.gamestartLabel = this.add.text(this.game.world.width/2, 200, 
			'                             You are a modern-day alchemist. \n     You conjure up potions for everyday ills and special thrills. ' +
			"\n   You've just opened up your shop, and in order to boost sales" + "\nyou've decided to let the customer decide the cost of each potion." +
			'\n\n                       Once a customer has made their order,\n       drag three ingredients into the cauldron to cook a potion.' +
			'\n\n     The goal is simply to turn your shop into a successful one!' +
			'\nHow much money can you make before you run out of ingredients?' +
			'\n\n                                              Good luck!', { fontSize: '18px', fill: '#aaa'})
		this.gamestartLabel.anchor.setTo(0.5, 0.5)
		this.gamestartLabel.visible = false



// 	  	this.game.time.advancedTiming = true
 	}

	restart() {
		this.game.state.restart()
	}

	endgame() {
		this.gameover = true
	}

	update() {
//		console.log("state " + this.game.gamestate)
		this.step += 1

		if (this.step == this.waitForStep && this.game.gamestate == 0) {
			this.game.gamestate = 1
			this.introBlur.visible = true
			this.gamestartLabel.visible = true
			this.waitForStep = this.step + this.textLength * 2
		}
		if (this.step == this.waitForStep && this.game.gamestate == 1) {
			this.game.gamestate = 10
			this.gamestartLabel.visible = false
			this.introBlur.visible = false
		}

		if (this.game.gamestate == 50 && this.step == this.waitForStep) {
				this.game.gamestate = 10

				this.punter.frame = this.game.rnd.integerInRange(0, 1)
				this.punterSpeed = 2

				let orderType = this.game.rnd.integerInRange(0, 7)

				switch (orderType) {
					case 0:
						this.order = new Order(this.game, "Flying potion", "I wanna fly like a bird!\nCan you make a potion?\nThat'd be awesome!")
						this.order.defineIngredient("balloon", 5)
						this.order.defineIngredient("energy drink", 5)
						this.order.defineIngredient("chocolate", -1)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("mouse trap", -1)
						this.order.defineIngredient("red wine", -1)				
						this.order.defineIngredient("pizza slice", -3)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", -3)
						this.order.defineIngredient("battery", -1)
						this.order.defineIngredient("sock", -1)
						this.order.defineIngredient("skull", -10)
						break
					case 1:
						this.order = new Order(this.game, "Love potion", "I need love in my life!\nCan you help me?\nYou're my last hope!")
						this.order.defineIngredient("rose", 3)
						this.order.defineIngredient("perfume", 3)
						this.order.defineIngredient("chocolate", 3)
						this.order.defineIngredient("banana", -1)
						this.order.defineIngredient("condom", -3)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("mouse trap", -10)
						this.order.defineIngredient("red wine", 1)
						this.order.defineIngredient("candle", 1)
						this.order.defineIngredient("pizza slice", -3)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", -5)
						this.order.defineIngredient("battery", -1)
						this.order.defineIngredient("sock", -1)
						this.order.defineIngredient("skull", -10)
					break
					case 2:
						this.order = new Order(this.game, "Luck potion", "I wanna win the lottery,\nbut I'm not very lucky.\nCan you make me lucky?")
						this.order.defineIngredient("four-leaf clover", 10)
						this.order.defineIngredient("skull", -10)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", -5)
					break
					case 3:
						this.order = new Order(this.game, "Potion of youth", "I'm getting old.\nI wanna be young again!\nDo you have a\npotion of youth?")
						this.order.defineIngredient("rubber duck", 3)
						this.order.defineIngredient("skull", -10)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", -5)
						this.order.defineIngredient("chocolate", 1)
						this.order.defineIngredient("balloon", 1)
						break
					case 4:
						this.order = new Order(this.game, "Lust potion", "I need help...\nEven viagra doesn't!\nseem to affect me.\nGot anything?")
						this.order.defineIngredient("rubber duck", 1)
						this.order.defineIngredient("skull", -10)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", 3)
						this.order.defineIngredient("red wine", 1)
						this.order.defineIngredient("candle", 1)
						this.order.defineIngredient("banana", 1)
						this.order.defineIngredient("energy drink", 1)
						this.order.defineIngredient("condom", 1)
						this.order.defineIngredient("battery", 1)
						this.order.defineIngredient("perfume", 1)
						break
					case 5:
						this.order = new Order(this.game, "Energy potion", "I'm feeling so tired\nthese days. If only\nthere was a potion\nfor instant energy. Is there?")
						this.order.defineIngredient("battery", 3)
						this.order.defineIngredient("skull", -10)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", -5)
						this.order.defineIngredient("energy drink", 3)
						this.order.defineIngredient("water", 1)
						this.order.defineIngredient("apple", 1)
						this.order.defineIngredient("banana", 1)
						this.order.defineIngredient("double espresso", 5)
						break
					case 6:
						this.order = new Order(this.game, "Sleeping potion", "Help! I can't sleep!\nNothing helps!\nI am desperate, you hear?\nDESPERATE!")
						this.order.defineIngredient("cognac", 1)
						this.order.defineIngredient("skull", -10)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("warm gun", -10)
						this.order.defineIngredient("handcuffs", -5)
						this.order.defineIngredient("double espresso", -5)
						this.order.defineIngredient("energy drink", -5)
						this.order.defineIngredient("chocolate", 1)
						break
					case 7:
						this.order = new Order(this.game, "Happiness potion", "I'm so unhappy.\nNothing makes me laugh.\nCan you sort it out?")
						this.order.defineIngredient("warm gun", 10)
						this.order.defineIngredient("skull", -10)
						this.order.defineIngredient("broken mirror", -10)
						this.order.defineIngredient("handcuffs", -1)
						this.order.defineIngredient("rubber duck", 3)
						this.order.defineIngredient("double espresso", 1)
						this.order.defineIngredient("red wine", -1)
						this.order.defineIngredient("cognac", -1)
						this.order.defineIngredient("chocolate", 1)
						break
				}

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
			this.bubble.visible = false
			this.bubbleLabel.visible = false
			this.game.gamestate = 101

		}

		if (this.game.gamestate == 42 && this.step == this.waitForStep) {
				this.bubble.visible = false
				this.bubbleLabel.visible = false
				this.game.gamestate = 45
		}

		if (this.game.gamestate == 40 && this.step == this.waitForStep) {
				this.game.sfx_cooking.stop()
				this.game.sfx_done.play()
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
			this.game.gamestate == 40 || this.game.gamestate == 42 || this.game.gamestate == 1 || this.game.gamestate == 20 || this.game.gamestate == 0)) {
			this.step = this.waitForStep -2
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
			this.game.nameLabel.x = this.game.input.x 
			this.game.nameLabel.y = this.game.input.y + 40


		}

	}

	
	render() {
		//this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00")
	}
}

export default Main