import "../sass/style.scss"
import { Players } from "./players"
import { Game } from "./game"
import { Gameboard } from "./gameboard"


class GameStart {
    constructor() {
        this.playersBtns = document.querySelectorAll(".menu__settings-title--players .menu__settings-btn")
        this.livesBtns = document.querySelectorAll(".menu__settings-title--lives .menu__settings-btn")
        this.sizeBtns = document.querySelectorAll(".menu__settings-title--mapSize .menu__settings-btn")
        this.warningBtn = document.querySelector(".fa-xmark")
        this.warningEl = document.querySelector(".menu__warning")
        this.startGameBtn = document.querySelector('.start')
        this.playersSelected = null
        this.livesSelected = null
        this.sizeSelected = null

        this.playersBtns.forEach(btn => btn.addEventListener('click', (e) => this.playerSelect(e)))
        this.livesBtns.forEach(btn => btn.addEventListener('click', (e) => this.livesSelect(e)))
        this.sizeBtns.forEach(btn => btn.addEventListener('click', (e) => this.mapSizeSelect(e)))
        this.warningBtn.addEventListener('click', () => this.warningEl.classList.remove("active"))
        this.startGameBtn.addEventListener('click', () => this.startGame(this.playersSelected, this.livesSelected, this.sizeSelected))

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
            document.querySelector(".game__menu-wrapper").classList.add('active')

            //generating map
            new Gameboard(mapSize)

            //generating players
            const newPlayersList = new Players(playersNr, lives).playersArray


            //initialize main game module
            new Game(newPlayersList, mapSize)

        } else {
            this.warningEl.classList.add("active")
        }


    }
}

new GameStart()


// const newPlayersList = new Players(5, 10).playersArray

// new Game(newPlayersList)

