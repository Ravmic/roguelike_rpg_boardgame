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
                nr: i,
                lives: parseInt(this.lives),
                position: 0,
                currentArea: "start",
                revive: false,
                potions: ["hp", "hp",]
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
        <h2 class="player-stats__title player-stats__title--main">Player ${index + 1} <i
            class="player-stats__animation fa-solid fa-caret-down player${index}">
            <p></p>
        </i>
        <i class="player-stats__animation fa-solid fa-caret-up player${index}">
            <p></p>
        </i>
        </h2>
     <div class="player-stats__life player-stats--flex">
        <p class="player-stats__title">Life:</p>
        <div class="player-stats__bar">
            <p class="player-stats__bar-stat player${index}">${this.lives}/${this.lives}</p>
            <div class="player-stats__bar-fill player${index}"></div>
        </div>
     </div>
    <div class="player-stats__revive player-stats--flex">
        <p class="player-stats__title">Has revive:</p>
        <p class="player-stats__revive  player${index}">${this.playersArray[index].revive ? "yes" : "no"}</p>
    </div>`

            //potion on game start
            const potionStack = document.createElement('div')
            const potionTitle = document.createElement('p')

            potionStack.setAttribute('class', "player-stats__potions player-stats--flex")
            potionStack.setAttribute('key', index)
            potionTitle.textContent = "Potions:"
            potionTitle.setAttribute('class', 'player-stats__title')
            potionStack.appendChild(potionTitle)
            this.playersArray[index].potions.forEach(potion => {
                const potionEl = document.createElement('img')
                potionEl.setAttribute('class', 'player-stats__potion')
                potionEl.src = "images/potion.svg"
                potionEl.alt = 'potion'
                potionStack.appendChild(potionEl)
                statsWrap.appendChild(potionStack)
            })




            statsEl.appendChild(statsWrap)
        })

    }
}

