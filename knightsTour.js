/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GUI() {
    var visited = [];
    var possibleDestination = [];
    var num_visited;    
    var width;
    var height;
    var origin;

    class Cell { // criar coordenadas para armazenar destinos possíveis
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    function coordinates(cell) { //recebe objeto td e retorna objeto cll com coordenadas dele
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    function calculateDestinations(horsePosition) { // recebe objeto Cell com coordenadas do cavalo

        // zerando array possibleDestination
        while (possibleDestination.length !== 0) {
            possibleDestination.pop();
        }
        for (let i = 0; i < height; ++i) {
            possibleDestination[i] = [];
            for (let j = 0; j < width; ++j) {
                possibleDestination[i].push(0);
            }
        }
        let endOfGame = true;
        let table = document.querySelector("table");
        let rows = table.rows;
        for (let i = 0; i < rows.length; ++i) {
            for (let j = 0; j < rows[i].cells.length; ++j) {
                let cell = rows[i].cells[j];
                cell.className = "notADestination"; // coloca todos os tds com borda preta, a princípio
                if (visited[i][j] === 0) { // coloca destinos possíveis com borda vermelha
                    if ((((horsePosition.x + 1) === i) && ((horsePosition.y + 2) === j)) || (((horsePosition.x + 1) === i) && ((horsePosition.y - 2) === j)) || (((horsePosition.x - 1) === i) && ((horsePosition.y + 2) === j)) || (((horsePosition.x - 1) === i) && ((horsePosition.y - 2) === j)) || (((horsePosition.x + 2) === i) && ((horsePosition.y + 1) === j)) || (((horsePosition.x + 2) === i) && ((horsePosition.y - 1) === j)) || (((horsePosition.x - 2) === i) && ((horsePosition.y + 1) === j)) || ((horsePosition.x - 2) === i) && ((horsePosition.y - 1) === j)) { // se a posição está a uma coluna e duas linhas ou a duas colunas e uma linha da do cavalo E nao foi visitada, marque como possivel de chegar e torne vermelho
                        cell.className = "destination";
                        possibleDestination[i][j] = 1;
                        endOfGame = false;
                    }
                } // coloca os tds visitados com borda azul
                else {
                    cell.className = "visited";
                }
            }
        }
        return endOfGame;
    }
    
    function createBoard() {

        num_visited = 0;
        width  = document.getElementById("width").value;
        height = document.getElementById("height").value;
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // tira todas as linhas e colunas, caso existam

        // criando array bidimensional visited com todas as posições com valor zero
        while (visited.length !== 0) {
            visited.pop();
        }
        for (let i = 0; i < height; ++i) {
            visited[i] = [];
            for (let j = 0; j < width; ++j) {
                visited[i][j] = 0;
            }
        }
        for (let i = 0; i < height; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < width; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                td.onclick = play;
            }
            tbody.appendChild(tr);
        }
        setMessage("Selecione a Posição Inicial do Cavalo para Jogar!");

    }
    function setMessage(newMessage) {
        let message = document.getElementById("message");
        message.textContent = newMessage;
    }

    function setHorsePosition(position) { // cria imagem do cavalo se não existir
        let img = document.querySelector("img");
        if (img === null) {
            img = document.createElement("img");
            img.src = `cavalo.png`;
        }
        position.appendChild(img);
    }
    function play() {
        let cell = coordinates(this); //calcula coordenadas da célula, retorna objeto Cell
        let dr = cell.x;
        let dc = cell.y;
        let endOfGame;        
        if (num_visited==0 || ((visited[dr][dc] === 0) && (possibleDestination[dr][dc] === 1))) { //se é a primeira jogada ou é uma jogada possível
            setHorsePosition(this); // move o cavalo ou coloca ele na primeira posição
            endOfGame =calculateDestinations(cell); // marca células possíveis para mover cavalo 
            visited[dr][dc] = 1; // marcar local visitado;                      
            if(num_visited > 0){ // a partir da segunda jogada, colocar número da visita na célula de origem
                origin.innerHTML = num_visited;
            }
            ++num_visited; // incrementa número de visitas
            if (num_visited === (width * height))  // se visitou tudo, ganhou
                setMessage("Você GANHOU!!");
            else if (endOfGame) { // se não tem mais pra onde ir, perdeu
                setMessage("Você PERDEU! Tente novamente.");
            }else{  
                origin = this;  // marca nova célula de origem
                setMessage("Selecione uma célula com borda vermelha (não visitada) para mover o cavalo!");  // mostra mensagem pra continuar a jogar
            }     
        }
    }

    function init() {

        width = 8;
        height = 8;
        num_visited = 0;
        let tbody = document.querySelector("tbody");
        //inicializando array visited 

        for (let i = 0; i < height; ++i) {
            visited[i] = [];
            for (let j = 0; j < width; ++j) {
                visited[i][j] = 0;
            }
        }
        for (let i = 0; i < 8; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 8; j++) {
                let td = document.createElement("td");
                td.onclick = play;
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
        let widthField = document.getElementById("width");
        let heightField = document.getElementById("height");
        widthField.oninput = createBoard;
        heightField.oninput = createBoard;
        let button = document.getElementById("clean"); // botar maxleght e min leght nos input
        button.onclick = createBoard;
        setMessage("Selecione a Posição Inicial do Cavalo para Jogar!");
    }
    return {init};
}

window.onload = function () {
    let gui = GUI();
    gui.init();
};


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


