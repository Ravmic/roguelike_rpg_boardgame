import { Dice } from "./dice"


export class Game {
    constructor(playersList) {
        //map
        this.mapEl = document.querySelectorAll('.gameboard__row--block')

        //Players Array
        this.playersList = playersList
        console.log(this.mapEl)
        this.currentPlayer = 0
        //dice

        this.moves = null
        this.turnFlag = true

        this.init()
    }

    flagChange() {
        this.turnFlag = !this.turnFlag
        setTimeout(() => { this.turnFlag = !this.turnFlag }, 2000)
    }

    playerMove() {
        const currentPositon = document.querySelector(`[data-number="${this.currentPlayer}"]`)
        this.playersList[this.currentPlayer].position += this.moves

        if (this.playersList[this.currentPlayer].position >= this.mapEl.length - 1) {
            this.mapEl[this.mapEl.length - 1].appendChild(currentPositon)
        } else { this.mapEl[this.playersList[this.currentPlayer].position].appendChild(currentPositon) }



    }

    startTurn() {
        if (this.turnFlag) {
            this.flagChange()
        } else return

        //dice roll
        this.moves = new Dice().diceValue

        console.log(this.moves)

        //player move
        this.playerMove()

        if (this.playersList[this.currentPlayer].position >= this.mapEl.length - 1) {
            alert(`WYGRAŁ GRACZ NR${this.currentPlayer + 1}!!!`)
        }
        //next player
        this.currentPlayer++
        if (this.currentPlayer >= this.playersList.length) {
            this.currentPlayer = 0
        }

    }

    init() {
        document.querySelector('.dice-btn').addEventListener('click', () => this.startTurn())

    }
}
