export class Gameboard {
    constructor(size) {
        this.gameboardEl = document.querySelector('.gameboard')
        this.mapSize = size
        this.currentBlockNr = 1
        this.rowNumbers = parseInt(this.mapSize / 12)


    }

    landscapeSelect(value) {
        if (value === 0) {
            return "forest"
        } else if (value === 1) {
            return "city"
        } else if (value === 2) {
            return "swamp"
        } else if (value === 3) {
            return "castle"
        }
        else if (value === 4) {
            return "hell"
        }
    }

    mapGenerator() {

        for (let i = 0; this.rowNumbers > i; i++) {
            const row = document.createElement('div')
            row.setAttribute('class', "gameboard__row")

            for (let i = 0; 12 > i; i++) {
                const block = document.createElement('div')
                block.setAttribute('class', "gameboard__row--block")
                let area = ""

                if (this.currentBlockNr === 1) {
                    area = "start"
                }
                else {
                    const randomAreaNr = Math.floor(Math.random() * 5)
                    area = this.landscapeSelect(randomAreaNr)
                }

                console.log(area)
                block.setAttribute('area', area)
                block.classList.add(area)


                block.textContent = this.currentBlockNr
                this.currentBlockNr++
                row.appendChild(block)
            }

            this.gameboardEl.appendChild(row)
        }

    }
}