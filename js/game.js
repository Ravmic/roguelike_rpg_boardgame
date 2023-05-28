import { Dice } from "./dice"


export class Game {
    constructor(playersList, mapSize) {
        //map
        this.mapSize = mapSize
        //Players Array
        this.playersList = playersList
        console.log(this.playersList, this.mapSize)
        this.currentPlayer = 0
        //dice
        this.dice = new Dice()
        this.moves = null
        this.diceFlag = true

        this.init()
    }

    flagChange() {
        this.diceFlag = !this.diceFlag
        setTimeout(() => { this.diceFlag = !this.diceFlag }, 2000)
    }


    init() {
        document.querySelector('.dice-btn').addEventListener('click', () => {
            if (this.diceFlag) {
                this.flagChange()
            } else return
            this.dice.rollDice()
            this.moves = this.dice.diceValue
            // console.log(this.moves)
        })

    }
}
