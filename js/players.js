export class Players {
    constructor(players = 1, lives = 5) {
        this.playersArray = []
        this.players = players
        this.lives = lives


        this.generatePlayers()
        this.createPlayersEl()
    }

    generatePlayers() {
        for (let i = 0; this.players > i; i++) {
            const player = {
                lives: this.lives,
                position: 0,
                currentArea: "start",
                revive: false,
            }
            this.playersArray.push(player)
        }
    }

    createPlayersEl() {
        const startPoint = document.querySelector('.start')
        this.playersArray.forEach((player, index) => {
            const playerEl = document.createElement('div')
            playerEl.classList.add("player")
            playerEl.setAttribute("data-number", index)
            startPoint.appendChild(playerEl)
        })
    }
}

