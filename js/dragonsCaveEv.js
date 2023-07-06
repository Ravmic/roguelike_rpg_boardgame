class DragonsCave {
    constructor(luck, player) {
        this.currentPlayer = player
        this.luck = luck
        this.vgoodEv = [`I was hiding behind stone pillars while the dragon tried to kill me. After it stopped breathing fire, I ran in its direction and swung my sword through its neck. The beast was dead! I searched its chamber and found a ${this.potionsValue > 1 ? `${this.potionsValue} potions!` : `${this.potionsValue} potion!`}`]
        this.neutralEv = ['"This place smells like sulfur', `I'm really lucky that I didn't find any dragons.`, 'The pounding of its tail is audible from miles away.',]
        this.badEv = [`His claws was masive! I barely dodge it, but I couln't hide from the tale`, `A red wyvern dropped from the cave ceiling right on me. My armor blocked most of the damage, but it gave me some serious burns.`, `I had a hard time fighting those wyvern. I still feel its teeth piercing my armor.`, `Suddenly, the walls around me started to break, and lava started leaking through the cracks. I barely escaped the place, but I burned myself badly...`]
        this.vbadEv = [`I couldn't escape... As the dragon saw me, he spit a giant stream of fire in my direction. Hiding in the cave corridor was my only hope...`]

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
            this.hp = 0
            this.randomEv = this.vgoodEv[randomTxtEv]
            this.commentType = "vgood"
            this.potionsValue = 2
            this.comment = `You just found a ${this.potionsValue > 1 ? `${this.potionsValue} potions!` : `${this.potionsValue} potion!`}`

        } //neutral
        else if (this.luck >= 1 && this.luck < 2) {
            const randomTxtEv = Math.floor(Math.random() * this.neutralEv.length)
            this.hp = 0
            this.randomEv = this.neutralEv[randomTxtEv]
            this.commentType = "neutral"

        } //bad
        else if (this.luck >= 2 && this.luck < 10) {
            const randomTxtEv = Math.floor(Math.random() * this.badEv.length)
            this.hp = -3
            this.randomEv = this.badEv[randomTxtEv]
            this.commentType = "bad"
        }//vbad
        else if (this.luck >= 10) {
            const randomTxtEv = Math.floor(Math.random() * this.vbadEv.length)

            this.hp = (this.currentPlayer.lives - 1) * -1

            this.randomEv = this.vbadEv[randomTxtEv]
            this.commentType = "vbad"
            this.comment = "You got left with 1hp point"

        }

    }
}

export default DragonsCave