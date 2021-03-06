class Item {

	constructor(game, id, x, y){
		this.game = game
	    this.sprite = this.game.add.sprite(x, y, 'items')
        this.sprite.frame = id
        this.sprite.anchor.setTo(0.5, 0.5)
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
            case 9: this.name = "double espresso"
                    break
            case 10: this.name = "mouse trap"
                    break
            case 11: this.name = "battery"
                    break
            case 12: this.name = "energy drink"
                    break
            case 13: this.name = "balloon"
                    break
            case 14: this.name = "chocolate"
                    break
            case 15: this.name = "silver spoon"
                    break
            case 16: this.name = "candle"
                    break
            case 17: this.name = "perfume"
                    break
            case 18: this.name = ""
                    break
            case 19: this.name = ""
                    break
            case 20: this.name = "scrabble letter"
                    break
            case 21: this.name = "skull"
                    break
            case 22: this.name = "broken mirror"
                    break
            case 23: this.name = "warm gun"
                    break
            case 24: this.name = "apple"
                    break
            case 25: this.name = "cognac"
                    break
            case 26: this.name = "red wine"
                    break
            case 27: this.name = "water"
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
                    this.game.nameLabel.visible = false
                    this.game.canPickCountdown = this.game.canPickCountdownMax
                    this.game.canPick = false


                    switch (this.game.rnd.integerInRange(1,4)) {
                        case 1: this.game.sfx_drop1.play()
                        break
                        case 2: this.game.sfx_drop2.play()
                        break
                        case 3: this.game.sfx_drop3.play()
                        break
                        case 4: this.game.sfx_drop4.play()
                        break
                    }
                    if (this.game.selectedSprite == this) {

                    }
                }
                else {
                    this.game.selectedSprite.sprite.x = this.game.selectedSprite.orgX
                    this.game.selectedSprite.sprite.y = this.game.selectedSprite.orgY
                    this.game.selectedSprite.sprite.angle = 0
                    this.game.selectedSprite = null
                    this.game.nameLabel.visible = false
                    this.game.hasSelectedSprite = false
                    this.game.canPickCountdown = this.game.canPickCountdownMax
                    this.game.canPick = false


                }
                
            }
            else if (this.pickable == true) {
                this.game.sfx_select.play()
                //console.log("picking " + this.name + " canPick:" + this.game.canPick)
                this.setSelectedSprite(this)
                this.game.nameLabel.text = this.name
                this.game.nameLabel.visible = true
                
            }
            return true
        }
	}

}

export default Item