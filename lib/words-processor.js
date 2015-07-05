var _ = require('lodash');

module.exports = function WordsProcessor(storage) {
  var set = 'words';

  this.processText = processText;

  function calculateScores(words) {
    var scores = {};

    _.forEach(words, function (word) {
      var score = scores[word] || 0;
      scores[word] = score + 1;
    });

    return scores;
  }

  function processText(text) {
    var words = tokenize(text);
    var scoreByWord = calculateScores(words);

    _.forEach(scoreByWord, function (score, word) {
      storage.incrementMemberScore(set, word, score);
    });
  }

  function tokenize(text) {
    return text.replace(/[^a-zA-Z- ]+/g, '').split(/\s+/);
  }
};
