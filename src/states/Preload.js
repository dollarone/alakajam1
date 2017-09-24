class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		this.game.load.spritesheet('logo-tiles', 'assets/gfx/logo-tiles.png', 17, 16)
		this.game.load.spritesheet('items', 'assets/gfx/items.png', 48, 32)
		this.game.load.spritesheet('cauldron', 'assets/gfx/cauldron.png', 140, 175)
		this.game.load.spritesheet('punter', 'assets/gfx/punter.png', 150, 300)
		this.game.load.image('background', 'assets/gfx/back.png')
		this.game.load.image('bubble', 'assets/gfx/bubble.png')
		this.game.load.audio('dollarone', 'assets/sfx/dollarone.ogg')
		this.game.load.image('onehourgamejamlogo', 'assets/gfx/onehourgamejamlogo.png')
		this.game.load.audio('onehourgamejamsplash', 'assets/sfx/onehourgamejamsplash.ogg')
	}

	create() {
		this.state.start('Main')
		//this.game.state.start("Logo", true, false, "#98FB98")
	}

}

export default Preload
