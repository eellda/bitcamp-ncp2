const game = {
  xTurn: true, //x, y 턴
  xState: [],
  oState: [],
  winningStates: [ //승리 조건
      // 가로
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],

      // 세로
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],

      // 대각선
      ['0', '4', '8'],
      ['2', '4', '6']
  ]
}

// 클릭 이벤트
document.addEventListener('click', event => { //grid-cell 에게 클릭 이벤트 적용시키기 위함
  const target = event.target // 모든 event는 target 프로퍼티를 가짐
  const isCell = target.classList.contains('grid-cell') // 지정한 클래스가 존재하는지
  const isDisabled = target.classList.contains('disabled') // 지정한 클래스가 존재하는지
  // 셀을 클릭 했는지, 아직 안했는지

  if (isCell && !isDisabled) { //isCell이 참이고 isDisabled이 거짓 이면
    // 셀 클릭
    const cellValue = target.dataset.value //타겟의 data의 value를 불러옴 

    game.xTurn === true ? game.xState.push(cellValue) : game.oState.push(cellValue) // xTurn의 dat type이 true 면 삼항연산자 
    // xTurn을 사용해 x, o인지 확인후 셀에 적용 
    target.classList.add('disabled') // disabled에 클래스 추가 
    target.classList.add(game.xTurn ? 'x' : 'o')

    game.xTurn = !game.xTurn // true에서 false로 변환 

  }

  if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) { // 모든 grid-cell 이 비활성화 되면 
    document.querySelector('.game-over').classList.add('visible') // .game-over 클래스 + visible 클래스 
    document.querySelector('.game-over-text').textContent = 'Draw!' // Draw 텍스트 출력 
  }
  // 클릭한 셀이 총 9개면 무승부 결과
  
  game.winningStates.forEach(winningState => { // 비동기
    const xWins = winningState.every(state => game.xState.includes(state))
    const oWins = winningState.every(state => game.oState.includes(state))
  
    if (xWins || oWins) { // 승리하면 
        document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled')) // 모든셀 비활성화 
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = xWins ? 'X win!' : 'O win!' // 승리 문구 
    }
  })
  // o,xstate가 winningStates에 포함되있는지 판단

  document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('.game-over').classList.remove('visible')
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('disabled', 'x', 'o')
    })
  
    game.xTurn = true
    game.xState = []
    game.oState = []
    //초깃값
  })
})
// 재시작
//https://www.webtips.dev/tic-tac-toe-in-javascript
