import Sounds from "./sounds"
class Dice {
    constructor(maxValue) {
        this.diceEl = document.querySelector(".dice")
        this.diceBtn = document.querySelector(".dice-btn")
        this.diceValue = null
        this.rollTime = 1500
        this.diceMaxValue = maxValue

        this.rollSound = new Sounds()

    }

    reset(value) {
        this.diceBtn.classList.remove(`active`)
        this.diceEl.classList.remove(`active`)
        this.diceEl.classList.remove(`roll${value}`)
    }

    rollDice = () => {
        this.rollSound.rollSound()
        const diceValue = Math.floor(Math.random() * this.diceMaxValue + 1)
        this.diceValue = diceValue
        this.diceAnimation(diceValue)

    }

    diceAnimation(value) {
        this.diceEl.classList.add(`roll${value}`)
        this.diceEl.classList.add(`active`)
        this.diceBtn.classList.add(`active`)

        setTimeout(() => { this.reset(value) }, this.rollTime)
    }
}

export default Dice