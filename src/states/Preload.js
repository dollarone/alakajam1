class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		this.game.load.spritesheet('logo-tiles', 'assets/gfx/logo-tiles.png', 17, 16)
		this.game.load.spritesheet('items', 'assets/gfx/items.png', 48, 64)
		this.game.load.spritesheet('cauldron', 'assets/gfx/cauldron.png', 140, 175)
		this.game.load.spritesheet('punter', 'assets/gfx/punter.png', 150, 300)
		this.game.load.image('bubble', 'assets/gfx/bubble.png')
		this.game.load.image('desk', 'assets/gfx/desk.png')
		this.game.load.image('background', 'assets/gfx/back-shelves.png')
		this.game.load.audio('dollarone', 'assets/sfx/dollarone.ogg')
		this.game.load.audio('intro', 'assets/sfx/intro.ogg')
		this.game.load.audio('loop', 'assets/sfx/loop.ogg')
		this.game.load.audio('drop1', 'assets/sfx/drop1.ogg')
		this.game.load.audio('drop2', 'assets/sfx/drop2.ogg')
		this.game.load.audio('drop3', 'assets/sfx/drop3.ogg')
		this.game.load.audio('drop4', 'assets/sfx/drop4.ogg')
		this.game.load.audio('cooking', 'assets/sfx/cooking.ogg')
		this.game.load.audio('select', 'assets/sfx/select.ogg')
		this.game.load.audio('done', 'assets/sfx/done.ogg')

	}

	create() {
		
		this.game.state.start("Logo", true, false, '#190d0b')
	}

}

export default Preload
