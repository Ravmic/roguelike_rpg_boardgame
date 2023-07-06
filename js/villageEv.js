class Village {
    constructor(luck) {

        this.luck = luck
        this.goodEv = [`Oh look! I found a golden coin! Now I'll buy something to eat.`, 'After countering bandits attack, people praised me and gave me food and shelter', 'People here loved me after I helped them with bears attacking them.']

        this.neutralEv = ['This place looks weird', "Nothing to do in this vilage...", "This vilage was under bandits attack. Good thing I managed to pass unnoticed", "The market is very crowded today.", "I talked to a innkeeper but he dosn't have any jobs right now", "The locals don't seem very welcoming"]

        this.badEv = [`There were too many bandits! I couldn't defeat them all. I must return...`, `A group of drunk vilagers attacked me. It wasn't difficult to defeat them, but they left me with a few bruises.`, `People there definetly don't like strangers. They welcomed me by throwing rocks and bottles at me`, ` couldn't find a place to sleep. I guess I'll have to rest outside`]

        this.hp = null
        this.randomEv = ""
        this.commentType = ""
        this.randomizeEvent()
    }

    randomizeEvent() {
        //good
        if (this.luck < 4) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = 1
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        } //neutral
        else if (this.luck >= 4 && this.luck < 8) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 8) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -2
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }

    }
}

export default Village