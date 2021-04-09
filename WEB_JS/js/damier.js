(function () {
  "use strict";

  // https://stackoverflow.com/questions/
  // 826782/how-to-disable-text-selection-highlighting
  const CSS_NO_SELECT = {
    "-webkit-touch-callout": "none", /* iOS Safari */
    "-webkit-user-select": "none", /* Safari */
    "-khtml-user-select": "none", /* Konqueror HTML */
    "-moz-user-select": "none", /* Old versions of Firefox */
    "-ms-user-select": "none", /* Internet Explorer/Edge */
    "user-select": "none", /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
  };

  const CSS_CELL = {
    "float": "left",
    "display": "block",
    "width": "30px",
    "height": "30px",
    "text-align": "center",
    "outline": "1px solid purple",
  };

  const CSS_LINE = {
    "display": "inline-block",
    "width": "30px",
    "height": "30px",
    "text-align": "center"
  };

  const CSS_BOARD = {
    "width": "auto",
    "height": "auto",
    "display": "inline-block",
    "padding": "10px",
    "margin": "10px"
  }

  class Cell {
    constructor() {
      this.background = "white";
      this.$display = $("<div />").css(CSS_NO_SELECT).css(CSS_CELL)
        .hover(
        () => { this.$display = this.$display.css("background-color", "lightgrey"); },
        () => { this.$display = this.$display.css("background-color", this.background); }
      );
    }

    changeBackgroundColor(color) {
      this.background = color;
    }

    isEmpty() {
      return (this.$display.text().length ? false : true);
    }

    setContent(Player) {
      this.$display.empty().append(Player ? "0" : "X");
    }

    getContent() {
      return this.$display.text();
    }

    display() {
      return this.$display;
    }
  }

  class Board {
    constructor(width, height) {
      this.Player1 = true;
      this.width = width;
      this.height = height;
      this.cells = [];
      for (let y = 0; y < this.height; y++) {
        let line = [];
        for (let x = 0; x < this.width; x++) {
          let cell = new Cell();
          line.push(cell);
        }
        this.cells.push(line);
      }
      this.updateBoard();
      
    }

    
    updateBoard() {
      for (let y = 0; y < this.height; y++)
        for (let x = 0; x < this.width; x++)
          this.cells[y][x].display().click(() => {
            if (this.cells[y][x].isEmpty()) {
              this.cells[y][x].setContent(this.Player1);
              this.Player1 = !this.Player1;
              this.checkVictory();
            }
            
          });
    }

    display() {
      let $result = $("<div/>").css(CSS_BOARD);
      for (let y = 0; y < this.height; y++) {
        let $line = $("<div/>").css(CSS_LINE);
        for (let x = 0; x < this.width; x++) {
          $line.append(this.cells[y][x].display());
        }
        $result.append($line);
      }
      console.log($result);
      return $result;
    }

    checkVictory() {
      //this.display().click(() => {
      for (let y = 1; y < this.height - 1; y++)
        for (let x = 1; x < this.width - 1; x++)
          for (let ny = -1; ny <= 0; ny++)
            for (let nx = -1; nx <= 1 && (ny == -1 || nx == -1); nx++)
              if (!this.cells[y + ny][x + nx].isEmpty())
                if (this.cells[y + ny][x + nx].getContent() == this.cells[y][x].getContent() && this.cells[y - ny][x - nx].getContent() == this.cells[y][x].getContent()) {
                  console.log("victoire");
                  this.cells[y + ny][x + nx].display().css("background", "pink");
                  this.cells[y - ny][x - nx].display().css("background", "pink");
                  this.cells[y][x].display().css("background", "pink");
                  this.cells[y + ny][x + nx].changeBackgroundColor("pink");
                  this.cells[y - ny][x - nx].changeBackgroundColor("pink");
                  this.cells[y][x].changeBackgroundColor("pink");

                }
                     
      //});
       
    }
  }

  $(() => {
    let width = 10;
    let height = 10;
    let board = new Board(width, height);
    $("body").append(board.display());
  });
})();
