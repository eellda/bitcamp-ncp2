window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display_player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let isGameAxtive = true;

    const PlayerX_Win = 'PlayerX_Win';
    const PlayerO_Win = 'PlayerO_Win';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8]
    ];

    function handleResultValication() {
        let roundWin = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === '' || b === '') {
                roundWin = true;
                break;
            }
        }

    if (roundWin) {
            announce(currentPlayer === 'X' ? PlayerX_Win : PlayerO_Win);
            isGameAxtive = false;
            return;
        }
    if (!board.includes(''))
    announce(TIE);
    }


    const announce = (type) => {
        switch(type){
            case PlayerO_Win:
                announcer.innerHTML = '플레이어 <span class="playerO">O</span> 승리';
                break;
            case PlayerX_Win:
                announcer.innerHTML = '플레이어 <span class="playerO">X</span> 승리';
                break;
            case TIE:
                announcer.innerHTML = '무승부';
        }
        announcer.classList.remove('hide');
    };

    const isvalidaction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isvalidaction(tile) && isGameAxtive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValication();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameAxtive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('플레이어X');
            tile.classList.remove('플레이어O');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    
   resetButton.addEventListener('click', resetBoard); 
});