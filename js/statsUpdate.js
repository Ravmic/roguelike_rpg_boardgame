export class StatsUpdate {
    constructor(player = null, maxHp = 0, value = 0, reviveValue = false) {
        this.currentPlayer = player
        this.value = value
        this.maxHp = maxHp
        this.reviveValue = reviveValue
        this.healthPercent = Math.round(this.value / this.maxHp * 100)
        this.healthBarFill = document.querySelector(`.player-stats__bar-fill.player${player.nr}`)
        this.healthStat = document.querySelector(`.player-stats__bar-stat.player${player.nr}`)
        this.reviveItem = document.querySelector(`.player-stats__revive.player${player.nr}`)

    }

    healthChange() {
        const healthBarWidth = this.healthBarFill.offsetWidth
        const barPosition = getComputedStyle(this.healthBarFill).left
        const positionPercent = (parseFloat(barPosition) / healthBarWidth) * 100

        if (this.currentPlayer.lives + this.value >= this.maxHp) {
            //Heal when hp > 100%
            this.healthBarFill.style.left = '0%'
            this.healthStat.textContent = `${this.maxHp}/${this.maxHp}`
        } else if ((this.currentPlayer.lives + this.value <= 0)) {
            //When hp <= 0
            this.healthBarFill.style.left = '100%'
            this.healthStat.textContent = `${0}/${this.maxHp}`

        } else {
            //Heal or DealDmg
            this.healthBarFill.style.left = `${positionPercent + this.healthPercent}%`
            this.healthStat.textContent = `${this.currentPlayer.lives + this.value}/${this.maxHp}`
        }

    }

}