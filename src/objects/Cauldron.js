class Cauldron {

	constructor(game, x, y){
		this.game = game;
		this.sprite = this.game.add.sprite(x, y, 'cauldron')
		this.sprite.anchor.setTo(0.5, 0.5)
        this.sprite.animations.add('bubble', [0,1,2,3,4], 10, true)
        this.sprite.animations.play('bubble')

		this.item1 = this.game.add.sprite(x-23, y-12, 'items')
		this.item1.anchor.setTo(0.5, 0.5)
		this.item2 = this.game.add.sprite(x, y-38, 'items')
		this.item2.anchor.setTo(0.5, 0.5)
		this.item3 = this.game.add.sprite(x+29, y-12, 'items')
		this.item3.anchor.setTo(0.5, 0.5)
		this.itemCount = 0
		this.item1.visible = false
		this.item2.visible = false
		this.item3.visible = false
		this.item1.alpha = 0.4
		this.item2.alpha = 0.4
		this.item3.alpha = 0.4
		this.item1name = ""
		this.item2name = ""
		this.item3name = ""

		
	}
	update() {

	}
	add(item) {
		if (this.itemCount == 0) {
			this.item1.frame = item.sprite.frame
			this.item1name = item.name
			this.item1.visible = true
		}
		else if (this.itemCount == 1) {
			this.item2.frame = item.sprite.frame
			this.item2name = item.name
			this.item2.visible = true
		}
		else if (this.itemCount == 2) {
			this.item3.frame = item.sprite.frame
			this.item3name = item.name
			this.item3.visible = true
			this.game.cookingCountdown = this.game.cookingCountdownMax
			this.game.cooking = true
			this.game.cookingLabel.visible = true
			this.game.gamestate = 30
			this.game.sfx_cooking.play()

		}
		this.itemCount += 1


	}

	reset() {
		this.itemCount = 0
		this.item1.visible = false
		this.item2.visible = false
		this.item3.visible = false		
	}
}


export default Cauldron