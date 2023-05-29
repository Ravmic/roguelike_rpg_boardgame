import { Dice } from "./dice"


export class Game {
    constructor(playersList) {
        //map
        this.mapEl = document.querySelectorAll('.gameboard__row--block')

        //Players
        this.playersList = playersList
        console.log(this.mapEl)
        this.currentPlayer = 0
        this.currentPlayerStatEl = document.querySelector('.currentPlayer')
        this.currentPlayerStatEl.textContent = this.currentPlayer + 1

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
        const playerNow = document.querySelector(`[data-number="${this.currentPlayer}"]`)
        this.playersList[this.currentPlayer].position += this.moves

        if (this.playersList[this.currentPlayer].position >= this.mapEl.length - 1) {
            this.mapEl[this.mapEl.length - 1].appendChild(playerNow)
        } else { this.mapEl[this.playersList[this.currentPlayer].position].appendChild(playerNow) }

    }

    startTurn() {
        if (this.turnFlag) {
            this.flagChange()
        } else return

        //dice roll
        this.moves = new Dice().diceValue

        //player move
        this.playerMove()



        if (this.playersList[this.currentPlayer].position >= this.mapEl.length - 1) {
            alert(`WYGRAŁ GRACZ NR${this.currentPlayer + 1}!!!`)
        }
        //next player
        this.currentPlayer++
        this.currentPlayerStatEl.textContent++
        if (this.currentPlayer >= this.playersList.length) {
            this.currentPlayer = 0
            this.currentPlayerStatEl.textContent = 1
        }

    }

    init() {
        document.querySelector('.dice-btn').addEventListener('click', () => this.startTurn())

    }
}
