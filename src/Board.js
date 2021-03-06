// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
    // time complexity: O(n). One loop over rows
      if (this.rows().length === 0) {
        return false;
      }
      var row = this.get(rowIndex);
      var pieceFound = false;
      for (var i = 0; i < row.length; i++) {
        if (row[i] && !pieceFound) {
          pieceFound = true;
        } else if (row[i]) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
    // time complexity: O(n^2). Calls hasRowConflictAt n times.
      if (this.rows().length === 0) {
        return false;
      }
      var length = this.get(0).length;
      for (var i = 0; i < length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // time complexity: O(n). One loop over cols
      if (this.rows().length === 0) {
        return false;
      }
      var length = this.rows().length;
      var pieceFound = false;
      for (var i = 0; i < length; i++) {
        var row = this.get(i);
        if (row[colIndex] && !pieceFound) {
          pieceFound = true;
        } else if (row[colIndex]) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // time complexity: O(n^2). Calls hasColConflictAt n times.
      if (this.rows().length === 0) {
        return false;
      }
      var length = this.rows().length;
      for (var i = 0; i < length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    /*
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
    */
    // [0,   1,  2, 3]
    // [-1,  0,  1, 2]
    // [-2, -1,  0, 1]
    // [-3, -2, -1, 0]

    // 0: [0,0], [1,1]...
    // 1: [0,1], [1,2]...
    // 2: [0,2], [1,3]
    // [1,2]

    //

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // time complexity: O(n). One loop over diagonals.
      if (this.rows().length === 0) {
        return false;
      }
      var diagonalLength = this.rows().length - Math.abs(majorDiagonalColumnIndexAtFirstRow);
      var pieceFound = false;
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        var column = majorDiagonalColumnIndexAtFirstRow;
        for (var i = 0; i < diagonalLength; i++) {
          var row = this.get(i);
          if (row[column] && !pieceFound) {
            pieceFound = true;
          } else if (row[column]) {
            return true;
          }
          column++;
        }
      } else {
        var rowNumber = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        for (var i = 0; i < diagonalLength; i++) {
          var row = this.get(rowNumber);
          if (row[i] && !pieceFound) {
            pieceFound = true;
          } else if (row[i]) {
            return true;
          }
          rowNumber++;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // time complexity: O(n^2). Two loops over diagonals.
      if (this.rows().length === 0) {
        return false;
      }
      var length = this.rows().length;
      for (var i = -1 * length; i < length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },


    /*_getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    }, */

    // 0, 1, 2, 3
    // 1, 2, 3, 4
    // 2, 3, 4, 5
    // 3, 4, 5, 6
    // if n < this.rows().length: start at col 0 & row n
    // else: start at col n - (this.rows().length - 1) & last row


    // minorDiag.. = 4
    // let row =
    // col--, row++
    // diag 0: len 1
    // diag 1: len 2
    // diag 2: len 3
    // diag 3: len 4
    // diag 4: len 3
    // diag 5: len 2
    // diag 6: len 1

    // [0,0], [0,1], [0,2], [0,3]
    // [1,0], [1,1], [1,2]

    /*  [0, 0, 1, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0] */

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // time complexity: O(n). One loop over diagonals.
      if (this.rows().length === 0) {
        return false;
      }
      if (minorDiagonalColumnIndexAtFirstRow < this.rows().length) {
        var rowNumber = minorDiagonalColumnIndexAtFirstRow;
      } else {
        var rowNumber = this.rows().length - 1;
      }
      var columnNumber = minorDiagonalColumnIndexAtFirstRow - rowNumber;
      var pieceFound = false;

      while (rowNumber >= 0 && columnNumber < this.rows().length) {
        var row = this.get(rowNumber);
        if (row[columnNumber] && !pieceFound) {
          pieceFound = true;
        } else if (row[columnNumber]) {
          return true;
        }
        columnNumber++;
        rowNumber--;
      }


      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // time complexity: O(n^2). Two loops over diagonals.
      var length = this.rows().length;
      for (var i = 0; i < (length - 1) * 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
