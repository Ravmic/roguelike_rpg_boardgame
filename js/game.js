import { Dice } from "./dice"
import { StatsUpdate } from "./statsUpdate"
import { Events } from "./events"

export class Game {
    constructor(playersList, lives, firstPlayer) {
        //map
        this.mapEl = document.querySelectorAll('.gameboard__row--block')

        //Players
        this.playersList = [...playersList]
        this.playersEl = document.querySelectorAll('.player')
        this.currentPlayerIndex = firstPlayer
        this.currentPlayerOb = this.playersList[this.currentPlayerIndex]
        this.maxHp = parseInt(lives)
        this.hpValue = 0
        this.currentPlayerStatEl = document.querySelector('.currentPlayer')
        this.currentPlayerStatEl.textContent = this.currentPlayerIndex + 1

        //potions
        this.potionEl = document.querySelectorAll('.player-stats__potion')

        //alert/informations
        this.warnEl = document.querySelector(".game__warning")
        this.warnBg = document.querySelector(".game__popup-bg")
        this.warnWait = document.querySelector('.game__popup-img')
        this.warnMessage = document.querySelector(".game__warning-message")

        //popup - win/loose or duel
        this.popupEl = document.querySelector('.game__warning--popup')
        this.popupMsgEl = document.querySelector(".game__warning--popup-message")


        //dice
        this.dice = new Dice(6)
        this.moves = null
        this.turnFlag = true
        this.init()

    }


    displayWarn(message) {
        this.warnMessage.innerHTML = message
        this.warnEl.classList.add("active")
        this.warnBg.classList.add("active")
    }

    loadScreenOn() {
        this.warnBg.classList.add("active")
        this.warnWait.classList.add('active')
    }
    loadScreenOff() {
        this.warnBg.classList.remove("active")
        this.warnWait.classList.remove('active')
    }

    gameEndPopup(message) {
        this.popupEl.classList.add('active')
        this.warnBg.classList.add("active")
        this.popupMsgEl.classList.add('endingBoard')
        this.popupMsgEl.textContent = message

    }

    playerMove() {
        this.currentPlayerOb.position += this.moves
        if (this.currentPlayerOb.position >= this.mapEl.length - 1) {
            this.currentPlayerOb.position = this.mapEl.length - 1
            this.mapEl[this.mapEl.length - 1].appendChild(this.playersEl[this.currentPlayerIndex])
        } else { this.mapEl[this.currentPlayerOb.position].appendChild(this.playersEl[this.currentPlayerIndex]) }

    }

    restTurn() {
        this.loadScreenOn()

        //delays to execute functions for loading effect
        setTimeout(() => {
            const events = new Events(this.currentPlayerOb, "rest")
            this.hpValue = events.hpValue
            this.hpControl()
            //check if you die and everyone else is dead -- Add this after every hpControl
            if (this.playersList.filter(player => player === "").length >= this.playersList.length) {
                return this.gameEndPopup(`Everyone is Dead! YOU LOOSE!`)
            }

            setTimeout(() => {
                this.nextTurn()
                this.loadScreenOff()
            }, this.dice.rollTime / 2)

        }, this.dice.rollTime / 2)





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
                    this.playersEl[this.currentPlayerIndex].remove()
                    this.playersList.splice(this.currentPlayerIndex, 1, "")

                }
                //check if someone is alive- if not return go to next condutional statemenst (in startTurn()) that will display endgame message
                if (this.playersList.filter(player => player === "").length < this.playersList.length) {
                    this.displayWarn(`Player ${this.currentPlayerIndex + 1} is dead `)
                } else return
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
            this.nextTurn()
        }
    }

    duelEvents(e) {
        setTimeout(() => {
            this.popupEl.classList.remove('active')
            if (e.target.getAttribute('player-number')) {
                console.log()
                const playerIndex = this.currentPlayerIndex
                const duel = new Events(this.currentPlayerOb, "duel", e.target.getAttribute('player-number'))
                this.hpValue = duel.hpValue
                this.currentPlayerIndex = parseInt(duel.defeatedPlayer)
                this.currentPlayerOb = this.playersList[this.currentPlayerIndex]
                this.hpControl()

                this.currentPlayerIndex = playerIndex
                this.currentPlayerOb = this.playersList[this.currentPlayerIndex]

            } else {
                this.randomEvents()
                this.hpControl()
            }


            setTimeout(() => {
                this.nextTurn()
                this.loadScreenOff()
            }, this.dice.rollTime / 2)
        }, this.dice.rollTime / 2)
    }

    encounterPlayer() {
        const playersOnBlock = [...this.mapEl[this.currentPlayerOb.position].querySelectorAll(`div`)]
        const otherPlayersEl = playersOnBlock.splice(0, playersOnBlock.length - 1)
        console.log(otherPlayersEl[0].getAttribute('player-number'))
        this.popupEl.classList.add('active')
        this.popupMsgEl.textContent = `You met other ${playersOnBlock > 1 ? "travelers!" : "traveler!"} do you want to attack him or go too location?`
        const btnPanel = document.createElement('div')
        const duelBtns = []
        btnPanel.setAttribute('class', ' game__warning--popup-btnPanel')
        otherPlayersEl.forEach(player => {
            const playerKey = player.getAttribute('player-number')
            const btn = document.createElement("button")
            btn.setAttribute("player-number", playerKey)
            btn.setAttribute('class', ' game__warning--popup-btn popup--duelBtn')
            btn.textContent = `Attack player ${parseInt(playerKey) + 1}`
            duelBtns.push(btn)
            btnPanel.appendChild(btn)
        })
        const eventBtn = document.createElement("button")
        eventBtn.textContent = 'Go to location'
        eventBtn.setAttribute('class', "game__warning--popup-btn popup--eventBtn")
        btnPanel.appendChild(eventBtn)
        this.popupMsgEl.appendChild(btnPanel)

        duelBtns.forEach(btn => btn.addEventListener('click', (e) => this.duelEvents(e)))

        //when you click on 'go to location' btn
        eventBtn.addEventListener('click', (e) => this.duelEvents(e))
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
        this.loadScreenOn()

        //dice roll
        this.dice.rollDice()
        this.moves = this.dice.diceValue

        //delays to execute functions after dice animation time
        setTimeout(() => {
            //player move
            this.playerMove()
            //check if player is on last block
            if (this.currentPlayerOb.position >= this.mapEl.length - 1) {
                return this.gameEndPopup(`PLAYER ${this.currentPlayerIndex + 1} WINS!`)
            }

            if ([...this.mapEl[this.currentPlayerOb.position].childNodes].length > 2) {
                return this.encounterPlayer()
            }

            this.randomEvents()
            this.hpControl()
            //check if everyone is dead
            if (this.playersList.filter(player => player === "").length >= this.playersList.length) {
                return this.gameEndPopup(`Everyone is Dead! YOU LOOSE!`)
            }

            //next turn
            setTimeout(() => {

                this.nextTurn()
                this.loadScreenOff()
            }, this.dice.rollTime / 2)

        }, this.dice.rollTime / 2)



    }


    newGame() {
        const popupBtn = document.querySelector('.game__warning--popup-btn')
        document.querySelector('.game__warning--popup-title').textContent = `Greetings ${this.playersList.length > 1 ? "travelers!" : "traveler!"}`
        document.querySelector('.game__warning--popup-await').textContent = `An amazing jorney ${this.playersList.length > 1 ? "awaits" : "await"} You!`

        if (this.playersList.length > 1) {
            this.displayWarn(`Player nr ${this.currentPlayerIndex + 1} starts the game!`)
        }

        this.warnBg.classList.add("active")
        this.popupEl.classList.add("active")
        popupBtn.addEventListener('click', () => {
            this.popupEl.classList.remove('active')
            this.warnBg.classList.remove('active')
            popupBtn.remove()
        })
    }

    init() {
        this.newGame()

        document.querySelector('.dice-btn').addEventListener('click', () => this.startTurn())
        this.potionEl.forEach(el => el.addEventListener('click', (e) => this.potionHeal(e)))
        document.querySelector('.rest-turn__btn').addEventListener('click', () => this.restTurn())

    }
}

