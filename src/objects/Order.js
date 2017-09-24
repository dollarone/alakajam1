class Order {

    constructor(game, name, description){
	   this.game = game
        this.name = name
        this.description = description
        this.ingredients = {}
        this.gold = 0
        this.result = ""
    }

    defineIngredient(name, value) {
        this.ingredients[name] = value
    }

    cook(ingredient1, ingredient2, ingredient3) {
        let sum = 0
        if (ingredient1 in this.ingredients) {
            sum += this.ingredients[ingredient1]
        }
        if (ingredient2 in this.ingredients) {
            sum += this.ingredients[ingredient2]
        }
        if (ingredient3 in this.ingredients) {
            sum += this.ingredients[ingredient3]
        }
        this.gold = sum
        return sum
    }

}


export default Order