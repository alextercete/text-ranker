var _ = require('lodash');

module.exports = function LettersProcessor(storage) {
  var set = 'letters';

  this.processText = processText;

  function calculateScores(letters) {
    var scores = {};

    _.forEach(letters, function (letter) {
      var score = scores[letter] || 0;
      scores[letter] = score + 1;
    });

    return scores;
  }

  function processText(text) {
    var letters = sanitize(text);
    var scoreByLetter = calculateScores(letters);

    _.forEach(scoreByLetter, function (score, letter) {
      storage.incrementMemberScore(set, letter, score);
    });
  }

  function sanitize(text) {
    return text.toLowerCase().replace(/[^a-z]+/g, '');
  }
};
