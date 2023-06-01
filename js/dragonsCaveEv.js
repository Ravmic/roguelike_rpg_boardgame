export class DragonsCave {
    constructor(luck, player) {
        this.currentPlayer = player
        this.luck = luck
        this.vgoodEv = ['vgood']
        this.goodEv = ['good']
        this.neutralEv = ['neutral']
        this.badEv = ['bad']
        this.vbadEv = [`vbad`]

        this.hp = null
        this.revive = null
        this.randomEv = ""
        this.commentType = ""
        this.comment = ""
        console.log(this.luck)
        this.randomizeEvent()

        console.log(this.luck)
    }

    randomizeEvent() {
        //vgood
        if (this.luck < 1) {
            const randomTxtEv = Math.floor(Math.random() * this.vgoodEv.length)
            this.hp = 0
            this.randomEv = this.vgoodEv[randomTxtEv]
            this.commentType = "vgood"
            this.potionsValue = 1
            this.comment = `You just found a ${this.potionsValue > 1 ? `${this.potionsValue} potions!` : `${this.potionsValue} potion!`}`

        } //neutral
        else if (this.luck >= 1 && this.luck < 2) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 2 && this.luck < 10) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -4
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }//vbad
        else if (this.luck >= 10) {
            const randomTxtEv = Math.floor(Math.random() * this.vbadEv.length)

            this.hp = (this.currentPlayer.lives - 1) * -1

            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"
            this.comment = "You got left with 1hp point"

        }

    }
}