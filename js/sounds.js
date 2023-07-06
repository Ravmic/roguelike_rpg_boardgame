import "../public/sounds/roll-effect.mp3"

class Sounds {
    constructor() {
        this.audioEl = document.querySelector(".hud__music-mp3")
        this.controlBarEl = document.querySelector(".hud__music")
        this.controlBarHandle = document.querySelector(".volume-control__handle")
        this.clickCheck = false
        this.handlePosition = 0
        this.mainVolume = 0.2
        console.log(this.controlBarEl.offsetLeft)
        this.diceRoll = new Audio('./sounds/roll-effect.mp3')


        this.init()
    }
    //roll sound
    rollSound() {
        this.diceRoll.play()
        this.diceRoll.volume = this.mainVolume / 3
    }

    //play song 
    playSong() {
        this.audioEl.play()
        this.audioEl.volume = this.mainVolume
    }


    //click checker
    isClicked() {
        this.clickCheck = true
    }
    isUnclicked() {
        this.clickCheck = false
    }
    //calculating borders where slider will work
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
        this.mainVolume = percent
        this.audioEl.volume = this.mainVolume
    }
    //Initialize playing song and listening to volume slider
    init() {


        this.controlBarHandle.addEventListener('mousedown', () => this.isClicked())
        window.addEventListener('mouseup', () => this.isUnclicked())
        window.addEventListener('mousemove', (e) => {
            if (this.clickCheck) {
                this.mouseMove(e.clientX)
            }
        }
        )
        this.controlBarHandle.addEventListener('touchstart', () => this.isClicked())
        window.addEventListener('touchend', () => this.isUnclicked())
        window.addEventListener('touchmove', (e) => {
            if (this.clickCheck) {
                this.mouseMove(e.touches[0].clientX)
            }
        }
        )

    }
}

export default Sounds