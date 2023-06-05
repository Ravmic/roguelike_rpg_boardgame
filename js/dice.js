import "../public/sounds/roll-effect.mp3"
export class Dice {
    constructor(maxValue) {
        this.diceEl = document.querySelector(".dice")
        this.diceBtn = document.querySelector(".dice-btn")
        this.diceValue = null
        this.rollTime = 1500
        this.diceMaxValue = maxValue

    }

    rollSound() {
        const rollSound = new Audio("./sounds/roll-effect.mp3")
        rollSound.play()
        rollSound.volume = 0.2
    }

    reset(value) {
        this.diceBtn.classList.remove(`active`)
        this.diceEl.classList.remove(`active`)
        this.diceEl.classList.remove(`roll${value}`)
    }

    rollDice = () => {
        this.rollSound()
        const diceValue = Math.floor(Math.random() * this.diceMaxValue + 1)
        this.diceValue = 2
        this.diceAnimation(diceValue)

    }

    diceAnimation(value) {
        this.diceEl.classList.add(`roll${value}`)
        this.diceEl.classList.add(`active`)
        this.diceBtn.classList.add(`active`)

        setTimeout(() => { this.reset(value) }, this.rollTime)
    }
}

