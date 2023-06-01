export class Swamp {
    constructor(luck) {

        this.luck = luck
        this.goodEv = [`I saw a backpack swinging on the vine. There is not much inside, but I found cured beef.`, 'I found some healing herbs!', `Those leeches wasn't too hard to beat, but there meat taste awful`, 'A dead body appeared before my eyes. It had a bag with some bread']

        this.neutralEv = ['This place looks weird.', "This place smells really bad", "I mannaged to sneak through some giant leeches", "A swamp golem just saw me, but i ran away from him.", 'Those vines looks very suspicious. I need to be very careful.']

        this.badEv = ['I was stuck in the swamp when a horde of imps attacked me. I managed to scare them away, but I get injured.', 'Swamp golem was too strong for me... I needed to run away', 'I killed all those leeches, but there was too many of them.']

        this.hp = null
        this.randomEv = ""
        this.commentType = ""
        console.log(this.luck)
        this.randomizeEvent()
    }

    randomizeEvent() {
        //good
        if (this.luck < 2) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = 1
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        } //neutral
        else if (this.luck >= 2 && this.luck < 5) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 5) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -2
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }

    }
}