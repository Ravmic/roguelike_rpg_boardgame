export class Mountain {
    constructor(luck) {

        this.luck = luck
        this.vgoodEv = ['vgood']
        this.goodEv = ['good']
        this.neutralEv = ['neutral']
        this.badEv = ['bad']
        this.vbadEv = ['vbad']

        this.hp = null
        this.potionsValue = 0
        this.randomEv = ""
        this.commentType = ""
        this.comment = ""
        console.log(this.luck)
        this.randomizeEvent()
    }

    randomizeEvent() {
        //vgood
        if (this.luck < 1) {
            const randomTxtEv = Math.floor(Math.random() * this.vgoodEv.length)
            this.hp = 1
            this.randomEv = this.vgoodEv[randomTxtEv]
            this.commentType = "vgood"
            this.potionsValue = 1
            this.comment = `WOW! You gained ${this.potionsValue} potion and ${this.hp}hp points!`

        } //good
        else if (this.luck >= 1 && this.luck < 3) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = 1
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        }//neutral
        else if (this.luck >= 3 && this.luck < 7) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 7 && this.luck < 11) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -3
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }//vbad
        else if (this.luck >= 11) {
            const randomTxtEv = Math.floor(Math.random() * this.vbadEv.length)
            this.hp = -2
            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"
            this.potionsValue = -1
        }

    }
}