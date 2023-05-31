import { Forest } from "./forestEv"

export class Events {
    constructor(player, blockValue) {
        this.currentPlayer = player
        this.currentLandscape = blockValue
        this.eventEl = document.querySelector(".screen__text")
        this.commentEl = document.querySelector(".screen__comment")
        // this.randomMultipyer = 
        this.hpValue = null
        this.reviveValue = false
        this.event = ""
        this.eventComment = ""
        this.commentType = ""
        this.eventRun()
    }
    eventRun() {
        //random number from 0 to 11 (12 numb)
        const eventLuck = Math.floor(Math.random() * 11)
        let landscapeEv = null

        if (this.currentLandscape === "forest") {
            landscapeEv = new Forest(eventLuck)

        }

        this.hpValue = landscapeEv.hp
        this.reviveValue = landscapeEv.revive
        this.event = landscapeEv.randomEv
        this.commentType = landscapeEv.commentType

        // console.log(this.hpValue, this.reviveValue, this.event)

        this.showEvent()
    }


    showEvent() {
        this.eventEl.textContent = this.event
        if (this.commentType === "good") {
            this.commentEl.setAttribute('class', 'screen__comment green')
            if (this.hpValue === null && this.reviveValue) {
                this.commentEl.textContent = `You gained a relic!`

            } else {
                this.commentEl.textContent = `You gained ${this.hpValue}hp points${this.reviveValue ? " and relic!" : "!"}`
            }

        } else if (this.commentType === "neutral") {
            this.commentEl.setAttribute('class', 'screen__comment gray')
            this.commentEl.textContent = `Nothing has happened...`

        } else if (this.commentType === "bad") {
            this.commentEl.setAttribute('class', 'screen__comment red')
            this.commentEl.textContent = `You've lost ${this.hpValue * -1}hp points`

        }

    }




}