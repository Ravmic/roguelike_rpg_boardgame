class StatsUpdate {
    constructor(player = null) {
        this.currentPlayer = player
        this.healthBarFill = document.querySelector(`.player-stats__bar-fill.player${this.currentPlayer.nr}`)
        this.healthStat = document.querySelector(`.player-stats__bar-stat.player${this.currentPlayer.nr}`)
        this.reviveItem = document.querySelector(`.player-stats__revive.player${this.currentPlayer.nr}`)
        this.potionStack = document.querySelector(`.player-stats__potions.player${this.currentPlayer.nr}`)
        this.currentPotions = [...document.querySelectorAll(`.player-stats__potions.player${this.currentPlayer.nr} img`)]
        this.newPotionEl = []   //elements added to array for seting addEventListener later

    }

    healthChange(hpValue, maxHp) {
        const healthBarWidth = this.healthBarFill.offsetWidth
        const barPosition = getComputedStyle(this.healthBarFill).left
        const positionPercent = (parseFloat(barPosition) / healthBarWidth) * 100
        this.healthPercent = Math.round(hpValue / maxHp * 100)

        if (this.currentPlayer.lives + hpValue >= maxHp) {
            //Heal when hp > 100%
            this.healthBarFill.style.left = '0%'
            this.healthStat.textContent = `${maxHp}/${maxHp}`
        } else if ((this.currentPlayer.lives + hpValue <= 0)) {
            //When hp <= 0
            this.healthBarFill.style.left = '-110%'
            this.healthStat.textContent = `${0}/${maxHp}`

        } else {
            //Heal or DealDmg
            this.healthBarFill.style.left = `${positionPercent + this.healthPercent}%`
            this.healthStat.textContent = `${this.currentPlayer.lives + hpValue}/${maxHp}`
        }

    }

    reviveChange(getRevive = false) {

        if (getRevive === 1) { //1 if you found revive
            if (this.currentPlayer.revive) return //when player have revive return

            this.reviveItem.textContent = "yes"
            this.currentPlayer.revive = true
        } else if (getRevive === false || getRevive === -1) {
            this.reviveItem.textContent = "no"  //when loosing it or using it
            this.currentPlayer.revive = false

        }

    }

    potionChange(potionValue) {
        if (potionValue > 0) {
            for (let i = 0; potionValue > i; i++) {
                const potionEl = document.createElement('img')
                potionEl.setAttribute('class', 'player-stats__potion')
                potionEl.setAttribute('key', this.currentPlayer.nr)
                potionEl.src = "images/potion.svg"
                potionEl.alt = 'potion'
                this.potionStack.appendChild(potionEl)
                this.currentPlayer.potions.push("hp")
                this.newPotionEl.push(potionEl)
            }
        }
        else if (potionValue < 0) {
            if (this.currentPlayer.potions <= 0) return
            for (let i = 0; (potionValue * -1) > i; i++) {
                this.currentPotions[i].remove()
                this.currentPlayer.potions.splice(0, 1)
            }

        }
    }

}

export default StatsUpdate