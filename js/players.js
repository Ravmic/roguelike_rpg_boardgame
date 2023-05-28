export class Players {
    constructor(players = 1, lives = 5) {
        this.playersArray = []
        this.players = players
        this.lives = lives

        this.generatePlayers()
    }

    generatePlayers() {
        for (let i = 0; this.players > i; i++) {
            const player = {
                lives: this.lives,
                position: 0,
                currentArea: "forest",
                revive: false,
            }
            this.playersArray.push(player)
        }
    }


}

