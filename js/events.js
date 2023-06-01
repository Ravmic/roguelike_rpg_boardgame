import { Forest } from "./forestEv"
import { Village } from "./villageEv"

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
        }
        else if (this.currentLandscape === "village") {
            landscapeEv = new Village(eventLuck)
        }

        this.hpValue = landscapeEv.hp
        this.event = landscapeEv.randomEv
        this.commentType = landscapeEv.commentType
        this.eventComment = landscapeEv.comment
        this.reviveValue = landscapeEv.revive
        this.potionsValue = landscapeEv.potions


        // console.log(this.hpValue, this.reviveValue, this.event)

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

        }

    }




}