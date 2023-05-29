export class Players {
    constructor(players = 1, lives = 5) {
        this.playersArray = []
        this.players = players
        this.lives = lives


        this.generatePlayers()
        this.createPlayersEl()
        this.createPlayerStats()
    }

    generatePlayers() {
        for (let i = 0; this.players > i; i++) {
            const player = {
                lives: parseInt(this.lives),
                position: 0,
                currentArea: "start",
                revive: false,
                potions: [1]
            }
            this.playersArray.push(player)
        }
    }

    createPlayersEl() {
        const startPoint = document.querySelector('.start')
        this.playersArray.forEach((player, index) => {
            const playerEl = document.createElement('div')
            playerEl.classList.add(`player`)
            playerEl.classList.add(`player${index}`)

            playerEl.setAttribute("data-number", index)

            startPoint.appendChild(playerEl)
        })
    }

    createPlayerStats() {
        const statsEl = document.querySelector('.stats__players-stats')
        this.playersArray.forEach((player, index) => {
            const statsWrap = document.createElement('div')
            statsWrap.classList.add('player-stats')

            statsWrap.innerHTML = `
            <h2 class="player-stats__title player-stats__title--main">Player ${index + 1}</h2>
            <div class="player-stats__life player-stats--flex">
                <p class="player-stats__title">Life:</p>
                <div class="player-stats__bar">
                    <div class="player-stats__bar-fill" key="${index}">${this.lives}/${this.lives}</div>
                </div>
            </div>
            <div class="player-stats__revive player-stats--flex">
                <p class="player-stats__title">Has revive:</p>
                <p class="player-stats__revive" key="${index}">no</p>
            </div>
            <div class="player-stats__potions player-stats--flex" key="${index}">  
                <p class="player-stats__title" >Potions:</p>
                <img class="player-stats__potion" src="assets/potion.svg" alt="potion" key="${index}"></img>
             </div>`

            statsEl.appendChild(statsWrap)
        })

    }
}

