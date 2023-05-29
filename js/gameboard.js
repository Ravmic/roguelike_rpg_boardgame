export class Gameboard {
    constructor(size) {
        this.gameboardEl = document.querySelector('.gameboard')
        this.mapSize = size
        this.currentBlockNr = 0
        this.rowNumbers = parseInt(this.mapSize / 12)

        this.mapGenerator()
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
        } else if (value === 4) {
            return "hell"
        }
    }

    mapGenerator() {
        //generate rows
        for (let i = 0; this.rowNumbers > i; i++) {
            const row = document.createElement('div')
            row.setAttribute('class', "gameboard__row")
            //generate blocks
            for (let i = 0; 12 > i; i++) {
                const block = document.createElement('div')
                block.setAttribute('class', "gameboard__row--block")
                block.setAttribute('key', this.currentBlockNr)
                let area = ""


                const randomAreaNr = Math.floor(Math.random() * 5)
                area = this.landscapeSelect(randomAreaNr)

                //marking "start" and "finnish" block
                if (this.currentBlockNr === 0) {
                    area = "start"
                }
                else if (this.currentBlockNr === this.mapSize - 1) {
                    area = "win"
                }

                block.setAttribute('area', area)
                block.classList.add(area)

                const blockNr = document.createElement('p')
                blockNr.textContent = this.currentBlockNr

                //marking "start" and "finnish" block
                if (this.currentBlockNr === 0) {
                    blockNr.textContent = "start"
                } else if (this.currentBlockNr === this.mapSize - 1) {
                    blockNr.textContent = "win"
                }


                this.currentBlockNr++
                block.appendChild(blockNr)
                row.appendChild(block)
            }

            this.gameboardEl.appendChild(row)
        }

    }
}