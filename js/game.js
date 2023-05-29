import { Dice } from "./dice"
import { GameStart } from "./index"


export class Game {
    constructor(playersList, lives) {
        //map
        this.mapEl = document.querySelectorAll('.gameboard__row--block')

        //Players
        this.playersList = playersList
        this.currentPlayer = 0
        this.maxLife = lives
        this.currentPlayerStatEl = document.querySelector('.currentPlayer')
        this.currentPlayerStatEl.textContent = this.currentPlayer + 1

        //potions
        this.potionEl = document.querySelectorAll('.player-stats__potion')

        //alert
        this.warnEl = document.querySelector(".game__warning")
        this.warnMessage = document.querySelector(".game__warning-message")

        //dice
        this.moves = null
        this.turnFlag = true
        console.log(this.playersList)
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

    heal(e) {
        if (e.target.parentElement.getAttribute("key") !== this.currentPlayer.toFixed()) {
            this.warnMessage.textContent = "Its not your potion!"
            this.warnEl.classList.add("active")

        } else {
            this.playersList[this.currentPlayer].lives += 2
            this.playersList[this.currentPlayer].potions.splice(0, 1)
            e.target.remove()
            if (this.playersList[this.currentPlayer].lives > this.maxLife) {

                this.playersList[this.currentPlayer].lives = this.maxLife
                console.log(this.playersList[this.currentPlayer])
            }

            this.nextTurn()
        }

    }

    nextTurn() {

        this.currentPlayer++
        this.currentPlayerStatEl.textContent++
        if (this.currentPlayer >= this.playersList.length) {
            this.currentPlayer = 0
            this.currentPlayerStatEl.textContent = 1
        }
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
            this.warnMessage.textContent = `PLAYER ${this.currentPlayer} WINS! `
            this.warnEl.classList.add("active")

            this.playersList = []
            document.querySelector('.gameboard').innerHTML = ""


        }

        //nextTurn
        this.nextTurn()
    }

    init() {
        document.querySelector('.dice-btn').addEventListener('click', () => this.startTurn())
        this.potionEl.forEach(el => el.addEventListener('click', (e) => this.heal(e)))
    }
}
