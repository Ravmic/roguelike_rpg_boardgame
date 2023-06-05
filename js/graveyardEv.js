export class Graveyard {
    constructor(luck, player) {
        this.currentPlayer = player
        this.luck = luck
        this.vgoodEv = [`After I thrust my sword through the necromancer, he shattered into pieces. ${this.currentPlayer.revive ? "The wind blew them away and nothing was left from him." : "In the shards of his bones, a shiny golden object caught my eye..."}`]
        this.neutralEv = ['A thick fog obscures the entire view', 'I cant see anything', `It's really cold here`, `I saw plenty of open graves. Luckly everyone of them is empty`, 'I decapitated few of those seletons, but they keep getting up! I need to run from this place', `I have bad feelings about this place...`]
        this.badEv = ['I was fighting a horde of skeleton soldiers, but my sword was doing nothing to them. They fell apart, but suddenly kept getting back up!', ` I can't defeat those skeletons. Its like some powerful magic controls them...`, `I tried to fight back those skeletons, but theres too many of them...`, `Fighting the giant spider didn't go as I planned. I sliced it in half, but then hundreds of little spiders started coming out of its body.`]
        this.vbadEv = [`The necromancer cursed me! I feel like im rotting inside but I can't die...`]

        this.hp = null
        this.revive = null
        this.randomEv = ""
        this.commentType = ""
        this.comment = ""
        this.randomizeEvent()
    }

    randomizeEvent() {
        //vgood
        if (this.luck < 1) {
            const randomTxtEv = Math.floor(Math.random() * this.vgoodEv.length)
            this.hp = 1
            this.randomEv = this.vgoodEv[randomTxtEv]

            if (this.currentPlayer.revive) {
                this.commentType = "neutral"
            } else {
                this.revive = 1
                this.comment = `You just found a relic!!!`
                this.commentType = "vgood"
            }


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