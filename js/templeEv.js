class Temple {
    constructor(luck, player) {
        this.currentPlayer = player
        this.luck = luck
        this.vgoodEv = [`I entered the temple and saw a blinding beam of light striking from the ceiling. Suddenly, an angel came from the sky and reached its hand out to me. ${this.currentPlayer.revive ? " I felt blessed." : " It gave me golden relic."}`]
        this.goodEv = ['I met a friendly priest that helped me heal my wounds', `I enter the temple and kneel before a holy statue. I have been praying for a long time for strength and luck on my journey.`, `The gods heard me, brought me relief!`]
        this.neutralEv = [`there's no one here...`, `This temple is empty`, `Sadly, this temple was destroyed long time ago...`]
        this.vbadEv = [`I entered the temple and saw a mysterious figure behind the altar. Suddenly, the doors behind me locked, and the figure reached its hand in my direction. I passed out. When I woke up, there was no one there${this.currentPlayer.revive ? ", and I couldn't find my relic!" : "."}`]

        this.hp = null
        this.revive = null
        this.randomEv = ""
        this.commentType = ""
        this.comment = ""
        this.randomizeEvent()
    }

    randomizeEvent() {
        //vgood
        if (this.luck < 2) {
            const randomTxtEv = Math.floor(Math.random() * this.vgoodEv.length)

            this.randomEv = this.vgoodEv[randomTxtEv]
            this.commentType = "vgood"

            if (this.currentPlayer.revive) {
                this.hp = 4
                this.comment = `You have been healed for ${this.hp}hp points!!`
            } else {
                this.revive = 1
                this.comment = 'You just found a relic!!!'
            }

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
            this.hp = 3
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        }
        //vbad
        else if (this.luck >= 11) {
            const randomTxtEv = Math.floor(Math.random() * this.vbadEv.length)

            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"
            if (this.currentPlayer.revive) {
                this.revive = -1
                this.comment = "You just lost you relic!"
            } else {
                this.comment = `?????`
                this.hp = -1
            }

        }

    }
}

export default Temple