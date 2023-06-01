import { Forest } from "./forestEv"
import { Village } from "./villageEv"
import { Swamp } from "./swampEv"
import { Mountain } from "./mountainEv"
import { Graveyard } from "./graveyardEv"
import { DragonsCave } from "./dragonsCaveEv"
import { Temple } from "./templeEv"

export class Events {
    constructor(player, blockValue) {
        this.currentPlayer = player
        this.currentLandscape = blockValue
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
            landscapeEv = new Mountain(eventLuck)
        } else if (this.currentLandscape === "graveyard") {
            landscapeEv = new Graveyard(eventLuck, this.currentPlayer)
        } else if (this.currentLandscape === "dragonsCave") {
            landscapeEv = new DragonsCave(eventLuck, this.currentPlayer)
        } else if (this.currentLandscape === "temple") {
            landscapeEv = new Temple(eventLuck)
        }

        this.hpValue = landscapeEv.hp
        this.event = landscapeEv.randomEv
        this.commentType = landscapeEv.commentType
        this.eventComment = landscapeEv.comment
        this.reviveValue = landscapeEv.revive
        this.potionsValue = landscapeEv.potionsValue

        console.log(this.currentPlayer)
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




}