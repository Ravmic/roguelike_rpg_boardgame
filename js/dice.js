export class Dice {
    constructor() {
        this.diceEl = document.querySelector(".dice")
        this.diceBtn = document.querySelector(".dice-btn")
        this.diceValue = null
        this.rotation = 0

        this.rollDice()
    }

    reset(value) {
        this.diceBtn.classList.remove(`active`)
        this.diceEl.classList.remove(`roll${value}`)
    }

    rollDice = () => {
        const diceValue = Math.floor(Math.random() * 6 + 1)

        this.diceAnimation(diceValue)
        this.diceValue = diceValue

    }

    diceAnimation(value) {
        this.rotation += 180
        this.diceEl.style.transform = `rotate(${this.rotation}deg)`
        this.diceEl.classList.add(`roll${value}`)
        this.diceBtn.classList.add(`active`)

        setTimeout(() => { this.reset(value) }, 2000)
    }
}

