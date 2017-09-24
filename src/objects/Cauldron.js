class Cauldron {

	constructor(game, x, y){
		this.game = game;
		this.sprite = this.game.add.sprite(x, y, 'cauldron')
		this.sprite.anchor.setTo(0.5, 0.5)
        this.sprite.animations.add('bubble', [0,1,2,3,4], 10, true)
        this.sprite.animations.play('bubble')

		this.item1 = this.game.add.sprite(x-23, y, 'items')
		this.item1.anchor.setTo(0.5, 0.5)
		this.item2 = this.game.add.sprite(x, y-26, 'items')
		this.item2.anchor.setTo(0.5, 0.5)
		this.item3 = this.game.add.sprite(x+29, y, 'items')
		this.item3.anchor.setTo(0.5, 0.5)
		this.itemCount = 0
		this.item1.visible = false
		this.item2.visible = false
		this.item3.visible = false
		this.item1.alpha = 0.4
		this.item2.alpha = 0.4
		this.item3.alpha = 0.4

		
	}
	update() {

	}
	add(item) {
		if (this.itemCount == 0) {
			this.item1.frame = item.sprite.frame
			this.item1.visible = true
		}
		else if (this.itemCount == 1) {
			this.item2.frame = item.sprite.frame
			this.item2.visible = true
		}
		else if (this.itemCount == 2) {
			this.item3.frame = item.sprite.frame
			this.item3.visible = true
			this.game.cookingCountdown = this.game.cookingCountdownMax
			this.game.cooking = true
			this.game.cookingLabel.visible = true

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