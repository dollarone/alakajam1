class Boot extends Phaser.State {

	preload() {

	}

	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
		 //for Canvas, modern approach
		//Phaser.Canvas.setSmoothingEnabled(this.game.context, false)
		 //also for Canvas, legacy approach
		PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST //for WebGL
		this.game.state.start("Preload")
	}

}

export default Boot