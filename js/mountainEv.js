class Mountain {
    constructor(luck, player) {
        this.currentPlayer = player
        this.luck = luck
        this.vgoodEv = ['Cyclops swung his club in my direction, but he missed. I jumped on his head, and while he was trying to throw me off, I stabbed him in the eye. His body dropped dead, and as he lay on the ground, I found a potion in his pocket!']
        this.goodEv = [`Minotaurs can't match me! After I slain three of them, I found some healing herbs in one of their pockets.`, `I successfully hunted some deer! I'm in for quite a feast`, `In the tracts of mountain flora I found a few interesting flowers that can help me now`, `I was walking through the field, and suddenly I saw an abandoned camp. The fire was still smoldering, and there was some leftover meat roasting.`]
        this.neutralEv = ['There was a nice view up there', 'Lots of rocks, not many life forms...', 'nothing to do here', 'I thought I saw a deer in the distance, but it was a rock.']
        this.badEv = [`Usualy I dont have problems fighting minotaurs, but there was too many of them`, 'I was running away from a cyclops, but suddenly it started throwing rocks at me!', 'I was walking peacefully when suddenly I saw a giant herd of bison running at me! I tried to hide, but one of them trampled me.']
        this.vbadEv = [`I found a cyclops on the way, and I tried to fight him. I didn't realize that there were five of them! I quickly ran away from that place, but while I was running, ${this.currentPlayer.potions.length > 0 ? "I lost my potion!" : "I fell in to the pit!"}`]

        this.hp = null
        this.potionsValue = 0
        this.randomEv = ""
        this.commentType = ""
        this.comment = ""
        this.randomizeEvent()
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

        } //good
        else if (this.luck >= 1 && this.luck < 3) {
            const randomTxtEv = Math.floor(Math.random() * this.goodEv.length)
            this.hp = 2
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
            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"

            if (this.currentPlayer.potions.length > 0) {

                this.potionsValue = -1
                this.comment = "You lost a potion!"
            } else {
                this.hp = -4
                this.comment = `You lost ${this.hp * -1}hp points!`
            }


        }

    }
}

export default Mountain 