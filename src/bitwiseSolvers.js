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

/***************************
 * BITWISE HELPER FUNCTIONS
***************************/
var hasAnyRooksConflictsBitwise = function(nPlaced, boardArray) {
  // assumes you are building the board from the right (board elements = 0)

  let n = boardArray.length;
  let target = Math.pow(2, nPlaced) - 1;
  let total = 0;
  for (let i = 0; i < boardArray.length; i += 2) {
    total += boardArray[i] ^ boardArray[i + 1];
  }
  return target !== total;
};

var hasAnyDiagonalConflictsBitwise = function(boardArray) {
  // i represents the element you're looking at
  // j is the other element (to compare it to)
  // k is j - i

  // bot left-top right conflict occurs if boardArray[i] * 2^k === boardArray[j];
  // top left-bot right conflict occurs if boardArray[i] === boardArray[j] * 2 ^ k
  // loop over each element in array
  for (let i = 0; i < boardArray.length; i++) {
    // compare boardArray[i] * 2^k to board[j]
    for (let j = i + 1; j < boardArray.length; j++) { // i = 0, j = 1: k = 1
      let k = j - i;
      // if equal, break, return true
      if (boardArray[i] * Math.pow(2, k) === boardArray[j] || boardArray[i] === boardArray[j] * Math.pow(2, k)) {
        return true;
      }
    }
  }
  // return false
  return false;
};


window.findNRooksSolutionBitwise = function(n) {

  let solution;
  // function recurse(rowNumber, currentBoard)
  var recurse = function(rowNumber, currentBoard) {
    if (rowNumber === n) {
      solution = currentBoard;
      return;
    }

    if (currentBoard[rowNumber] === 0) {
      currentBoard[rowNumber] = 1;
    }
    // while hasAnyRooksConflicts(board--n integers)
    while (hasAnyRooksConflictsBitwise(rowNumber + 1, currentBoard) && currentBoard[rowNumber] <= Math.pow(2, n)) {
      // shift that piece
      currentBoard[rowNumber] = currentBoard[rowNumber] << 1;
    }

    // recurse(rowNumber + 1, currentBoard)
    recurse(rowNumber + 1, currentBoard);
  };
  recurse(0, board);
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // time complexity: O(n). One function call per n.
  let baseCases = [1, 1, 2];
  if (n < 3) {
    return baseCases[n];
  }
  var solutionCount = n * countNRooksSolutions.call(window, n - 1); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

/*
window.findNRooksSolutionBitwise = function(n) {
    if (currentBoard[rowNumber] === 0) {
      currentBoard[rowNumber] = 1;
    }
    // while hasAnyRooksConflicts(board--n integers)
    while (hasAnyRooksConflictsBitwise(rowNumber + 1, currentBoard) && currentBoard[rowNumber] <= Math.pow(2, n)) {
      // shift that piece
      currentBoard[rowNumber] = currentBoard[rowNumber] << 1;
    }

    // recurse(rowNumber + 1, currentBoard)
    recurse(rowNumber + 1, currentBoard);
  }
  recurse(0, board);
  return solution;

};
*/

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolutionBitwise = function(n) {
  // time complexity: O(c^n). Number of branches/loops grows exponentially
  var validBoards = [];

  var findSolution = function(rowNumber, copyOfBoard) {

    if (rowNumber === n) {
      var boardArray = copyOfBoard.rows().map(function(row) {
        return row.map((element) => {
          return element;
        });
      });
      validBoards.push(boardArray);
      return true;
    }
    if (copyOfBoard[rowNumber] === 0) {
      copyOfBoard[rowNumber] = 1;
    }

    while (hasAnyRooksConflictsBitwise(rowNumber + 1, copyOfBoard)
    || hasAnyDiagonalConflictsBitwise(copyOfBoard)
    && copyOfBoard[rowNumber] <= Math.pow(2, n)) {
      // shift that piece
      copyOfBoard[rowNumber] = copyOfBoard[rowNumber] << 1;
    }

    findSolution(rowNumber + 1, copyOfBoard);
  };

  var board = [];
  for (let i = 0; i < n; i++) {
    board[i] = 0;
  }
  findSolution(0, board);
  var solution = validBoards[0];
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutionsBitwise = function(n) {

};



