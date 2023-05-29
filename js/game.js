import { Dice } from "./dice"
import { GameStart } from "./index"


export class Game {
    constructor(playersList, lives) {
        //map
        this.mapEl = document.querySelectorAll('.gameboard__row--block')

        //Players
        this.playersList = [...playersList]
        this.currentPlayer = 0
        this.maxLife = parseInt(lives)
        this.hpValue = 0
        this.currentPlayerStatEl = document.querySelector('.currentPlayer')
        this.currentPlayerStatEl.textContent = this.currentPlayer + 1

        console.log(this.playersList)
        //potions
        this.potionEl = document.querySelectorAll('.player-stats__potion')

        //alert
        this.warnEl = document.querySelector(".game__warning")
        this.warnMessage = document.querySelector(".game__warning-message")

        //dice
        this.dice = new Dice()
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

    skipTurn() {
        this.hpValue = -1
        this.hpControl()
        this.nextTurn()
    }

    potionHeal(e) {
        if (e.target.parentElement.getAttribute("key") !== this.currentPlayer.toFixed()) {
            this.warnMessage.textContent = "Its not your potion!"
            this.warnEl.classList.add("active")

        } else {
            this.hpValue = 2
            this.hpControl()
            this.playersList[this.currentPlayer].potions.splice(0, 1)
            e.target.remove()
            this.nextTurn()
        }

    }


    hpControl() {// CHANGE WHEN YOU ITRODUCE EVENTS AND LOOSING HP
        if (this.hpValue > 0) { //when healing
            const hpAnimation = document.querySelector(`.fa-caret-up.player${this.currentPlayer}`)
            hpAnimation.classList.add('active')
            hpAnimation.innerHTML = `<p>${this.hpValue}</p>`
            this.playersList[this.currentPlayer].lives += this.hpValue

            setTimeout(() => hpAnimation.classList.remove('active'), 500)

            if (this.playersList[this.currentPlayer].lives > this.maxLife) {
                this.playersList[this.currentPlayer].lives = this.maxLife
                console.log(this.playersList[this.currentPlayer])
            }
        } else { //when loosing health

            const hpAnimation = document.querySelector(`.fa-caret-down.player${this.currentPlayer}`)
            hpAnimation.classList.add('active')
            hpAnimation.innerHTML = `<p>${this.hpValue}</p>`
            this.playersList[this.currentPlayer].lives += this.hpValue

            setTimeout(() => hpAnimation.classList.remove('active'), 500)

            if (this.playersList[this.currentPlayer].lives <= 0) {

                this.warnMessage.textContent = `Player ${this.currentPlayer + 1} is dead `
                this.warnEl.classList.add("active")
                const playerNow = document.querySelector(`[data-number="${this.currentPlayer}"]`)
                playerNow.remove()
                this.playersList.splice(this.currentPlayer, 1, "")


            }

        }
    }

    checkIfAlive() {
        //Checking if everyone is dead
        const checkIfAlive = this.playersList.filter(player => player === "")
        if (checkIfAlive.length >= this.playersList.length) {
            this.warnMessage.textContent = `Everyone is Dead! YOU LOOSE!`
            this.warnEl.classList.add("active")
        } else {
            this.nextTurn()
        }
    }

    nextTurn() {

        this.currentPlayer++
        this.currentPlayerStatEl.textContent++
        //Player counter loop
        if (this.currentPlayer >= this.playersList.length) {
            this.currentPlayer = 0
            this.currentPlayerStatEl.textContent = 1
        }
        if (this.playersList[this.currentPlayer] === "") {
            this.checkIfAlive()
        }
    }

    startTurn() {
        if (this.turnFlag) {
            this.flagChange()
        } else return

        //dice roll
        this.dice.rollDice()
        this.moves = this.dice.diceValue

        //player move
        this.playerMove()

        if (this.playersList[this.currentPlayer].position >= this.mapEl.length - 1) {
            this.warnMessage.textContent = `PLAYER ${this.currentPlayer + 1} WINS! `
            this.warnEl.classList.add("active")
            this.playersList = []
            document.querySelector('.gameboard').innerHTML = ""
        }

        //nextTurn
        this.nextTurn()
    }

    init() {
        document.querySelector('.dice-btn').addEventListener('click', () => this.startTurn())
        this.potionEl.forEach(el => el.addEventListener('click', (e) => this.potionHeal(e)))
        document.querySelector('.skip-turn__btn').addEventListener('click', () => this.skipTurn())
    }
}
