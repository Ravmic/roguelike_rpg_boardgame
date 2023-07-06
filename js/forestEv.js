class Forest {
    constructor(luck) {

        this.luck = luck
        this.goodEv = ['You were walking down the forest and you found healing herbs.', 'At the end of the road You met friendly druid that heals small wounds.', 'Your trained eye saw a bag hanging on the tree. Turns out it was small food suplies!', "You successfully managed to hunt down a squirrel.", "After a long journey, I found something to eat.", 'A pack of wolves ran away after I killed one of them. Looks like today I have something good to eat']

        this.neutralEv = ['Its very windy today...', 'I saw somthing moving in the bush. Turns out it was just a bird', "This road is getting very boring.", "I see nothing on the horizon.", "A large boar come on the road, but I scared him away"]

        this.badEv = ['At the end of the road, I was attacked by bandits.', "I tried to hunt a wild boar, but it attacked me", "I managed to kill the bear, but he left some scars.", "My stomach hurts... I shouldn't eat that mushroom I found earlier...", "After I ate those berries I cant see on my left eye!"]

        this.hp = null
        this.randomEv = ""
        this.commentType = ""
        this.randomizeEvent()
    }

    randomizeEvent() {
        //good
        if (this.luck < 3) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = 1
            this.randomEv = this.goodEv[randomTxtEv]
            this.commentType = "good"

        } //neutral
        else if (this.luck >= 3 && this.luck < 6) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 6) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -1
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }

    }
}

export default Forest 