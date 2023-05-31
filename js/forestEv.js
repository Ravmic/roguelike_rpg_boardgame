export class Forest {
    constructor(luck) {

        this.luck = luck
        this.goodEv = ['You were walking down the forest and you found a magic mushroom!',]
        this.neutralEv = ['You were walking down the forest and you saw homeless man shiting behind tree',]
        this.badEv = ['You were walking down the forest and you smashed your stupid face',]

        this.hp = null
        this.revive = null
        this.randomEv = ""
        this.commentType = ""
        this.randomizeEvent()
    }

    randomizeEvent() {
        //good
        if (this.luck <= 3) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = -2
            this.revive = null
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        } //neutral
        else if (this.luck > 3 && this.luck <= 6) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.revive = true
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck > 6) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -5
            this.revive = false
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }

    }
}