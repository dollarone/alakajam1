class Item {

	constructor(game, id, x, y){
		this.game = game
		this.sprite = this.game.add.sprite(x, y, 'items')
        this.sprite.anchor.setTo(0.5, 0.5)
        this.sprite.frame = id
        //this.sprite.sendToBack()
        this.orgX = x
        this.orgY = y
        this.count = 1
        this.pickable = true
        this.name = "sock"
        this.id = id
        switch (this.id) {
            case 1: this.name = "banana"
                    break
            case 2: this.name = "rubber duck"
                    break
            case 3: this.name = "handcuffs"
                    break
            case 4: this.name = "four-leaf clover"
                    break
            case 5: this.name = "condom"
                    break
            case 6: this.name = "soda can"
                    break
            case 7: this.name = "pizza slice"
                    break
            case 8: this.name = "rose"
                    break
        
        }

    	this.sprite.angle = 0
//    	this.sprite.body.setSize(1,1,0,0);

	}

    setSelectedSprite(spr) {
        if (this.game.canPick) {
            this.game.selectedSprite = spr
            this.game.canPickCountdown = this.game.canPickCountdownMax
            this.game.canPick = false
            this.game.hasSelectedSprite = true
        }
    }

    click() {
//        console.log("name:" + this.name + " pickable:" + this.pickable)
        if (this.pickable && (this.game.input.x > (this.sprite.x - this.sprite.width/2)) &&
            (this.game.input.x < (this.sprite.x + this.sprite.width/2)) &&
            (this.game.input.y > (this.sprite.y - this.sprite.height/2)) &&
            (this.game.input.y < (this.sprite.y + this.sprite.height/2))) {
            if (this.game.hasSelectedSprite == true) {
                // if in cauldron
                if ((this.game.input.x > (this.game.cauldron.sprite.x - this.game.cauldron.sprite.width/2)) &&
                    (this.game.input.x < (this.game.cauldron.sprite.x + this.game.cauldron.sprite.width/2)) &&
                    (this.game.input.y > (this.game.cauldron.sprite.y - this.game.cauldron.sprite.height/2)) &&
                    (this.game.input.y < (this.game.cauldron.sprite.y + this.game.cauldron.sprite.height/2))) {
                    
                    this.pickable = false
                    this.sprite.visible = false
                    this.sprite.angle = 0
                    this.game.cauldron.add(this.game.selectedSprite)
                    this.game.selectedSprite = null
                    this.game.hasSelectedSprite = false
                    this.game.canPick = true
                    if (this.game.selectedSprite == this) {

                    }
                }
                else {
                    this.game.selectedSprite.sprite.x = this.game.selectedSprite.orgX
                    this.game.selectedSprite.sprite.y = this.game.selectedSprite.orgY
                    this.game.selectedSprite.sprite.angle = 0
                    this.game.selectedSprite = null
                    this.game.hasSelectedSprite = false
                    this.game.canPick = true

                }
                
            }
            else if (this.pickable == true) {

                //console.log("picking " + this.name + " canPick:" + this.game.canPick)
                this.setSelectedSprite(this)
            }
            return true
        }
	}

}

export default Item