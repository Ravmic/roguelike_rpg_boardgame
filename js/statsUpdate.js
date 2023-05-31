export class StatsUpdate {
    constructor(player = null) {
        this.currentPlayer = player
        this.healthBarFill = document.querySelector(`.player-stats__bar-fill.player${this.currentPlayer.nr}`)
        this.healthStat = document.querySelector(`.player-stats__bar-stat.player${this.currentPlayer.nr}`)
        this.reviveItem = document.querySelector(`.player-stats__revive.player${this.currentPlayer.nr}`)
        this.potionStack = document.querySelector(`.player-stats__potions.player${this.currentPlayer.nr}`)

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
            this.healthBarFill.style.left = '100%'
            this.healthStat.textContent = `${0}/${maxHp}`

        } else {
            //Heal or DealDmg
            this.healthBarFill.style.left = `${positionPercent + this.healthPercent}%`
            this.healthStat.textContent = `${this.currentPlayer.lives + hpValue}/${maxHp}`
        }

    }


    reviveChange(getRevive = false) {

        if (getRevive) { //true if you got revive
            if (this.currentPlayer.revive) return //when player have revive

            this.reviveItem.textContent = "yes"
            this.currentPlayer.revive = true
        } else {
            this.reviveItem.textContent = "no" //when dont have- fn use it
            this.currentPlayer.revive = false

        }




    }
    //NOT WORKING PROPERLY! you need to assign all elements to eventlistener everytime
    // addPotion(potionValue) {
    //     if (potionValue > 0) {
    //         for (let i = 1; potionValue >= i; i++) {
    //             const potionEl = document.createElement('img')
    //             potionEl.setAttribute('class', 'player-stats__potion')
    //             potionEl.src = "images/potion.svg"
    //             potionEl.alt = 'potion'
    //             this.potionStack.appendChild(potionEl)
    //             this.currentPlayer.potions.push("hp")
    //         }

    //     }
    // }

}