export class Sounds {
    constructor() {
        this.audioEl = document.querySelector(".game__music-mp3")
        this.controlBarEl = document.querySelector(".game__music")
        this.controlBarHandle = document.querySelector(".volume-control__handle")
        this.clickCheck = false
        this.handlePosition = 0
        this.volume = null

        this.init()
    }

    isClicked() {
        this.clickCheck = true
    }
    isUnclicked() {
        this.clickCheck = false
    }


    calcOffset(clientX) {
        const position = clientX - this.controlBarEl.offsetLeft

        if (position >= this.controlBarEl.offsetWidth) {
            this.handlePosition = this.controlBarEl.offsetWidth
        } else if (position <= 0) {
            this.handlePosition = 0
        } else {
            this.handlePosition = position
        }
    }

    mouseMove(clientX) {
        this.calcOffset(clientX)
        const percent = this.handlePosition / this.controlBarEl.offsetWidth
        this.controlBarHandle.style.left = `${percent * 100}%`
        this.audioEl.volume = percent
    }

    init() {
        this.audioEl.play()
        this.audioEl.volume = 0.2

        this.controlBarHandle.addEventListener('mousedown', () => this.isClicked())
        window.addEventListener('mouseup', () => this.isUnclicked())
        window.addEventListener('mousemove', (e) => {
            if (this.clickCheck) {
                this.mouseMove(e.clientX)
            }
        }

        )
    }
} 