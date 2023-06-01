export class Temple {
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
    }

    randomizeEvent() {
        //vgood
        if (this.luck < 2) {
            const randomTxtEv = Math.floor(Math.random() * this.vgoodEv.length)
            this.hp = 2
            this.randomEv = this.vgoodEv[randomTxtEv]
            this.commentType = "vgood"
            this.revive = 1
            this.comment = 'You just found a relic!!!'
        } //neutral
        else if (this.luck >= 2 && this.luck < 5) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        }
        //good
        else if (this.luck >= 5 && this.luck < 11) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = 5
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        }
        //vbad
        else if (this.luck >= 11) {
            const randomTxtEv = Math.floor(Math.random() * this.vbadEv.length)
            this.hp = 0
            this.revive = -1
            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"
            this.comment = "You just lost you relic!"

        }

    }
}