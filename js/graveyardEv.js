export class Graveyard {
    constructor(luck, player) {
        this.currentPlayer = player
        this.luck = luck
        this.vgoodEv = ['After I thrust my sword through the necromancer, he shattered into pieces. In the shards of his bones, a shiny golden object caught my eye...']
        this.goodEv = ['good']
        this.neutralEv = ['neutral']
        this.badEv = ['bad']
        this.vbadEv = [`The necromancer cursed me! I feel like im rotting inside but I can't die...`]

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
        if (this.luck < 1) {
            const randomTxtEv = Math.floor(Math.random() * this.vgoodEv.length)
            this.hp = 1
            this.randomEv = this.vgoodEv[randomTxtEv]
            this.commentType = "vgood"
            this.revive = 1
            this.comment = `You just found a relic!!!`

        } //neutral
        else if (this.luck >= 1 && this.luck < 6) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 6 && this.luck < 11) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -3
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }//vbad
        else if (this.luck >= 11) {
            const randomTxtEv = Math.floor(Math.random() * this.vbadEv.length)

            this.hp = Math.round(this.currentPlayer.lives / 2) * -1
            if (this.currentPlayer <= 1) this.hp = 0
            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"
            this.comment = "You lost half of Your current hp points!"

        }

    }
}