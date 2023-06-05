import "../sass/style.scss"
import { Players } from "./players"
import { Game } from "./game"
import { Gameboard } from "./gameboard"
import { Sounds } from "./sounds"

export class GameStart {
    constructor() {
        this.playersBtns = document.querySelectorAll(".menu__settings--players .menu__settings-btn")
        this.livesBtns = document.querySelectorAll(".menu__settings--lives .menu__settings-btn")
        this.sizeBtns = document.querySelectorAll(".menu__settings--mapSize .menu__settings-btn")
        this.warnBtn = document.querySelector(".fa-xmark")
        this.warnEl = document.querySelector(".game__warning")
        this.warnBg = document.querySelector(".game__popup-bg")
        this.startGameBtn = document.querySelector('.start')
        this.playersSelected = null
        this.livesSelected = null
        this.sizeSelected = null

        this.playersBtns.forEach(btn => btn.addEventListener('click', (e) => this.playerSelect(e)))
        this.livesBtns.forEach(btn => btn.addEventListener('click', (e) => this.livesSelect(e)))
        this.sizeBtns.forEach(btn => btn.addEventListener('click', (e) => this.mapSizeSelect(e)))
        this.warnBtn.addEventListener('click', () => this.closeWarn())
        this.startGameBtn.addEventListener('click', () => this.startGame(this.playersSelected, this.livesSelected, this.sizeSelected))

    }
    //close warn
    closeWarn() {
        this.warnEl.classList.remove("active")
        this.warnBg.classList.remove("active")
    }

    // menu button selectors
    mapSizeSelect(e) {
        this.sizeBtns.forEach(player => player.classList.remove('active'))
        e.target.classList.add("active");
        this.sizeSelected = e.target.getAttribute("key")

    }

    playerSelect(e) {
        this.playersBtns.forEach(player => player.classList.remove('active'))
        e.target.classList.add("active");
        this.playersSelected = e.target.getAttribute("key")

    }
    livesSelect(e) {
        this.livesBtns.forEach(player => player.classList.remove('active'))
        e.target.classList.add("active");
        this.livesSelected = e.target.getAttribute("key")

    }


    //Game init 
    startGame(playersNr, lives, mapSize) {
        if (playersNr && lives && mapSize) {
            //menu slie animation
            document.querySelector(".game__menu-wrapper").classList.add('active')

            //play music
            const sounds = new Sounds()

            //generating map
            new Gameboard(mapSize)

            //generating players
            const newPlayersList = new Players(playersNr, lives).playersArray

            //draw first player
            const firstPlayer = Math.floor(Math.random() * playersNr)

            //initialize main game module
            new Game(newPlayersList, lives, firstPlayer)

        } else {
            this.warnEl.classList.add("active")
            this.warnBg.classList.add("active")
        }


    }
}

new GameStart()


// const newPlayersList = new Players(5, 10).playersArray

// new Game(newPlayersList)

