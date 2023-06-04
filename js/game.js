import { Dice } from "./dice"
import { StatsUpdate } from "./statsUpdate"
import { Events } from "./events"

export class Game {
    constructor(playersList, lives, firstPlayer) {
        //map
        this.mapEl = document.querySelectorAll('.gameboard__row--block')

        //Players
        this.playersList = [...playersList]
        this.currentPlayerIndex = firstPlayer
        this.currentPlayerOb = this.playersList[this.currentPlayerIndex]
        this.maxHp = parseInt(lives)
        this.hpValue = 0
        this.currentPlayerStatEl = document.querySelector('.currentPlayer')
        this.currentPlayerStatEl.textContent = this.currentPlayerIndex + 1

        //potions
        this.potionEl = document.querySelectorAll('.player-stats__potion')

        //alert
        this.warnEl = document.querySelector(".game__warning")
        this.warnBg = document.querySelector(".game__popup-bg")
        this.warnWait = document.querySelector('.game__popup-img')
        this.warnMessage = document.querySelector(".game__warning-message")

        //Win/loose Screen
        this.finishScreen = document.querySelector(".game__msg-board")
        this.finishMessage = document.querySelector(".game__msg-board-message ")

        //dice
        this.dice = new Dice(6)
        this.moves = null
        this.turnFlag = true
        this.init()

    }

    flagChange() {
        this.turnFlag = !this.turnFlag
        setTimeout(() => { this.turnFlag = !this.turnFlag }, this.dice.rollTime)
    }

    displayWarn(message) {
        this.warnMessage.innerHTML = message
        this.warnEl.classList.add("active")
        this.warnBg.classList.add("active")
    }

    loadScreenToggle() {
        this.warnBg.classList.toggle("active")
        this.warnWait.classList.toggle('active')
    }


    playerMove() {
        const currentPlayerEl = document.querySelector(`[player-number="${this.currentPlayerIndex}"]`)
        this.currentPlayerOb.position += this.moves
        if (this.currentPlayerOb.position >= this.mapEl.length - 1) {
            this.currentPlayerOb.position = this.mapEl.length - 1
            this.mapEl[this.mapEl.length - 1].appendChild(currentPlayerEl)
        } else { this.mapEl[this.currentPlayerOb.position].appendChild(currentPlayerEl) }

    }

    restTurn() {
        if (this.turnFlag) {
            this.flagChange()
            this.loadScreenToggle()
        } else return

        //delays to execute functions for loading effect
        setTimeout(() => {
            const events = new Events(this.currentPlayerOb, "rest")
            this.hpValue = events.hpValue
            this.hpControl()
        }, this.dice.rollTime / 2)



        setTimeout(() => {
            this.nextTurn()
            this.loadScreenToggle()
        }, this.dice.rollTime)

    }

    potionHeal(e) {

        if (e.target.getAttribute("key") === this.currentPlayerIndex.toFixed()) {

            if (this.currentPlayerOb.lives >= this.maxHp) {
                this.displayWarn("You have full health")
            } else {
                this.hpValue = 2
                this.currentPlayerOb.potions.splice(0, 1)
                this.hpControl()
                e.target.remove()
                this.nextTurn()
            }
        } else {
            this.displayWarn("Its not your potion!")
        }

    }

    hpControl() {
        if (this.hpValue > 0) { //when healing
            const statsUpdate = new StatsUpdate(this.currentPlayerOb)
            statsUpdate.healthChange(this.hpValue, this.maxHp)
            this.currentPlayerOb.lives += this.hpValue


            //animation
            const hpAnimation = document.querySelector(`.fa-caret-up.player${this.currentPlayerIndex}`)
            hpAnimation.classList.add('active')
            hpAnimation.innerHTML = `<p>${this.hpValue}</p>`
            setTimeout(() => hpAnimation.classList.remove('active'), 500)

            if (this.currentPlayerOb.lives > this.maxHp) {
                this.currentPlayerOb.lives = this.maxHp
            }

        } else if (this.hpValue < 0) { //when loosing health
            const statsUpdate = new StatsUpdate(this.currentPlayerOb)
            statsUpdate.healthChange(this.hpValue, this.maxHp)
            this.currentPlayerOb.lives += this.hpValue

            //animation
            const hpAnimation = document.querySelector(`.fa-caret-down.player${this.currentPlayerIndex}`)
            hpAnimation.classList.add('active')
            hpAnimation.innerHTML = `<p>${this.hpValue}</p>`
            setTimeout(() => hpAnimation.classList.remove('active'), 500)

            //when player hp < 0
            if (this.currentPlayerOb.lives <= 0) {
                this.currentPlayerOb.lives = 0
                //check if player has revive
                if (this.currentPlayerOb.revive) {
                    statsUpdate.reviveChange()  //removing revive 
                    this.hpValue = this.maxHp
                    this.displayWarn(`Player ${this.currentPlayerIndex + 1} has revived!`)
                    return this.hpControl()

                } else {
                    const currentPlayerEl = document.querySelector(`[player-number="${this.currentPlayerIndex}"]`)
                    currentPlayerEl.remove()
                    this.playersList.splice(this.currentPlayerIndex, 1, "")
                }
                //check if everyone is dead 
                if (this.playersList.filter(player => player === "").length >= this.playersList.length) {
                    this.finishMessage.textContent = `Everyone is Dead! YOU LOOSE!`
                    this.finishScreen.classList.add("active")
                    //warn if one player is dead
                } else {
                    this.displayWarn(`Player ${this.currentPlayerIndex + 1} is dead `)
                }
            }
        }
    }

    nextTurn() {

        this.currentPlayerIndex++
        this.currentPlayerOb = this.playersList[this.currentPlayerIndex]
        this.currentPlayerStatEl.textContent++
        //Player counter loop
        if (this.currentPlayerIndex >= this.playersList.length) {
            this.currentPlayerIndex = 0
            this.currentPlayerStatEl.textContent = 1
            this.currentPlayerOb = this.playersList[this.currentPlayerIndex]
        }
        if (this.currentPlayerOb === "") {

            //check if everyone is dead -
            if (this.playersList.filter(player => player === "").length >= this.playersList.length) {
                this.finishMessage.textContent = `Everyone is Dead! YOU LOOSE!`
                this.finishScreen.classList.add("active")

            } else { this.nextTurn() }


        }
    }

    randomEvents = () => {
        const currentArea = this.mapEl[this.currentPlayerOb.position].getAttribute('area')
        if (currentArea === "win" || currentArea === "start") return

        const events = new Events(this.currentPlayerOb, currentArea)
        this.hpValue = events.hpValue

        const statsUpdate = new StatsUpdate(this.currentPlayerOb)
        //adding revive if player doesnt have
        if (events.reviveValue) {
            statsUpdate.reviveChange(events.reviveValue)
        }//adding potions if potionsValue is > 0
        if (events.potionsValue) {
            statsUpdate.potionChange(events.potionsValue)
            statsUpdate.newPotionEl.forEach(potion => potion.addEventListener("click", (e) => this.potionHeal(e)))
        }


    }

    startTurn() {
        if (this.turnFlag) {
            this.flagChange()
            this.loadScreenToggle()

        } else return

        //dice roll
        this.dice.rollDice()
        this.moves = this.dice.diceValue

        //delays to execute functions after dice animation time
        setTimeout(() => {
            //player move
            this.playerMove()

            if (this.currentPlayerOb.position >= this.mapEl.length - 1) {
                this.finishMessage.textContent = `PLAYER ${this.currentPlayerIndex + 1} WINS! `
                this.finishScreen.classList.add("active")
            }

            this.randomEvents()

            this.hpControl()
            console.log(this.currentPlayerOb)
        }, this.dice.rollTime / 2)

        //next turn
        setTimeout(() => {
            this.nextTurn()
            this.loadScreenToggle()
        }, this.dice.rollTime)

    }



    newGame() {
        const greetingEl = document.querySelector('.game--greeting')
        const greetingBtn = document.querySelector('.game--greeting.fa-xmark')
        const greetingsMsgEl = document.querySelector(".game--greeting")
        document.querySelector('.game--greeting-title').textContent = `Greetings ${this.playersList.length > 1 ? "travelers!" : "traveler!"}`
        document.querySelector('.game--greeting-await').textContent = `An amazing jorney ${this.playersList.length > 1 ? "awaits" : "await"} You!`

        if (this.playersList.length > 1) {
            this.displayWarn(`Player nr ${this.currentPlayerIndex + 1} starts the game!`)
        }

        greetingsMsgEl.classList.add("active")
        greetingBtn.addEventListener('click', () => greetingEl.classList.remove('active'))
    }

    init() {
        this.newGame()

        document.querySelector('.dice-btn').addEventListener('click', () => this.startTurn())
        this.potionEl.forEach(el => el.addEventListener('click', (e) => this.potionHeal(e)))
        document.querySelector('.rest-turn__btn').addEventListener('click', () => this.restTurn())

    }
}

