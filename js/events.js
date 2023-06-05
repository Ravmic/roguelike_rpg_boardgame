import { Forest } from "./forestEv"
import { Village } from "./villageEv"
import { Swamp } from "./swampEv"
import { Mountain } from "./mountainEv"
import { Graveyard } from "./graveyardEv"
import { DragonsCave } from "./dragonsCaveEv"
import { Temple } from "./templeEv"

export class Events {
    constructor(player, blockValue, duelPlayerIndex) {
        this.currentPlayer = player
        this.currentLandscape = blockValue
        this.duelPlayerIndex = duelPlayerIndex

        this.eventEl = document.querySelector(".screen__text")
        this.commentEl = document.querySelector(".screen__comment")
        this.hpValue = null
        this.reviveValue = false
        this.event = ""
        this.eventComment = ""
        this.commentType = ""
        this.potionsValue = 0
        this.eventRun()
    }
    eventRun() {
        const eventLuck = Math.floor(Math.random() * 12)
        let landscapeEv = null

        if (this.currentLandscape === "forest") {
            landscapeEv = new Forest(eventLuck)
        } else if (this.currentLandscape === "village") {
            landscapeEv = new Village(eventLuck)
        } else if (this.currentLandscape === "swamp") {
            landscapeEv = new Swamp(eventLuck)
        } else if (this.currentLandscape === "mountain") {
            landscapeEv = new Mountain(eventLuck, this.currentPlayer)
        } else if (this.currentLandscape === "graveyard") {
            landscapeEv = new Graveyard(eventLuck, this.currentPlayer)
        } else if (this.currentLandscape === "dragonsCave") {
            landscapeEv = new DragonsCave(eventLuck, this.currentPlayer)
        } else if (this.currentLandscape === "temple") {
            landscapeEv = new Temple(eventLuck, this.currentPlayer)
        } else if (this.currentLandscape === "rest") {
            landscapeEv = this.rest(eventLuck)
        } else if (this.currentLandscape === "duel") {
            landscapeEv = this.duel(eventLuck, this.duelPlayerIndex)
        }


        this.hpValue = landscapeEv.hp
        this.event = landscapeEv.randomEv
        this.commentType = landscapeEv.commentType
        this.eventComment = landscapeEv.comment
        this.reviveValue = landscapeEv.revive
        this.potionsValue = landscapeEv.potionsValue

        this.defeatedPlayer = landscapeEv.defPlayer

        this.showEvent()
    }

    showEvent() {
        this.eventEl.textContent = this.event
        this.commentEl.setAttribute('class', `screen__comment ${this.commentType}`)

        if (this.commentType === "vgood") {
            this.commentEl.textContent = this.eventComment
        } else if (this.commentType === "good") {
            this.commentEl.textContent = `You gained ${this.hpValue > 0 ? `${this.hpValue}hp points.` : ""}${this.reviveValue ? `a relic!` : ""}`
        }
        else if (this.commentType === "neutral") {

            this.commentEl.textContent = `Nothing has happened...`

        } else if (this.commentType === "bad") {

            this.commentEl.textContent = `You've lost ${this.hpValue * -1}hp points`

        } else if (this.commentType === "vbad") {

            this.commentEl.textContent = this.eventComment
        }

    }


    rest(luck) {
        const restEv = {
            hp: 0,
            randomEv: "",
            commentType: "",
        }
        //good
        if (luck < 4) {
            restEv.hp = 1
            restEv.commentType = "good"
            restEv.randomEv = "The night was quiet, and I slept pretty well."
        }  //neutral
        else if (luck >= 4 && luck < 8) {
            restEv.hp = 0
            restEv.commentType = "neutral"
            restEv.randomEv = "Sudden noises constantly wake me up. I couldn't close my eyes even once."
        } //bad
        else if ((luck >= 8)) {
            restEv.hp = -1
            restEv.commentType = "bad"
            restEv.randomEv = "What a horrible night! Someone was trying to rob me. I had to fight..."
        }

        return restEv
    }


    duel(luck, oponentIndex) {

        console.log(this.currentPlayer)
        const duelEv = {
            hp: 0,
            randomEv: "",
            commentType: "",
            comment: "",
            defPlayer: "",
        }

        if (luck < 5) {
            duelEv.hp = -2
            duelEv.commentType = "vgood"
            duelEv.randomEv = "Your opponent didn't stand a chance against you"
            duelEv.comment = `You just win fight against other player`
            duelEv.defPlayer = oponentIndex

        }
        else if ((luck >= 5)) {
            duelEv.hp = -3
            duelEv.commentType = "vbad"
            duelEv.randomEv = "your opponent turned out to be stronger and smarter."
            duelEv.comment = `You got defeated`
            duelEv.defPlayer = this.currentPlayer.nr
        }

        return duelEv
    }



}