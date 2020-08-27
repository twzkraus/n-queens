/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var board = new Board({'n': n});
  let piecesPlaced = 0;
  // while piecesPlaced < n
  while (piecesPlaced < n) {
    // loop over each row (first row to start)
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        // toggle this position
        board.togglePiece(i, j);
        // if there is no conflict
        if (!board.hasColConflictAt(i) && !board.hasRowConflictAt(j)) {
          // add one to each row and column
          piecesPlaced++;
          break;
        } else {
        // else
          // toggle back
          board.togglePiece(i, j);
        }
      }
    }
  }

  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // 2: 2, 3: 3 * f(2), 4: 4 * f(3)
  let baseCases = [1, 1, 2];
  if (n < 3) {
    return baseCases[n];
  }
  var solutionCount = n * countNRooksSolutions.call(window, n - 1); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  var validBoards = [];

  var findSolution = function(nextRowNumber, copyOfBoard) {
    if (copyOfBoard.hasAnyQueensConflicts()) {
      return;
    }
    if (nextRowNumber === n) {
      validBoards.push(copyOfBoard.rows());
      return;
    }

    for (var i = 0; i < n; i++) {
      var boardArray = JSON.stringify(copyOfBoard.rows());
      boardArray = JSON.parse(boardArray);
      var newBoard = new Board(boardArray);
      newBoard.togglePiece(nextRowNumber, i);
      findSolution(nextRowNumber + 1, newBoard);
    }
  };

  var board = new Board({n: n});
  findSolution(0, board);
  var solution = validBoards[0];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution || board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var validBoards = [];

  var findSolution = function(nextRowNumber, copyOfBoard) {
    if (copyOfBoard.hasAnyQueensConflicts()) {
      return;
    }
    if (nextRowNumber === n) {
      validBoards.push(copyOfBoard.rows());
      return;
    }

    for (var i = 0; i < n; i++) {
      var boardArray = JSON.stringify(copyOfBoard.rows());
      boardArray = JSON.parse(boardArray);
      var newBoard = new Board(boardArray);
      newBoard.togglePiece(nextRowNumber, i);
      findSolution(nextRowNumber + 1, newBoard);
    }
  };

  var board = new Board({n: n});
  findSolution(0, board);
  console.log(validBoards);
  var solutionCount = validBoards.length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
