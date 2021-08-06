const fs = require('fs');

class MrphCrypt {
  static async crypt(words, lang) {
    const tokens = this.createTokens(words);

    let cryptedString = '';

    for (const token of tokens) {
      if (cryptedString) {
        cryptedString += ' ' + (await MrphCrypt.getWordByToken(token, lang));
      } else {
        cryptedString = await MrphCrypt.getWordByToken(token, lang);
      }
    }

    return cryptedString;
  }

  /*
   * Creates an array of tokens
   * a token is three letters of a word, if a letter is missing during division, the token remains with the same length and will be full
   * an example of an array of tokens of the word 'Hello'
   * ['Hel', 'lo']
   * */
  static createTokens(words) {
    let tokens = [];
    const splitPattern = new RegExp(/\(?\S{3}\)?/g);

    for (const word of words.split(' ')) {
      const dividedByPattern = word.match(splitPattern);
      const remainderLetters = word.replace(splitPattern, '');

      if (dividedByPattern && !remainderLetters) {
        tokens = tokens.concat(dividedByPattern);
      }

      if (dividedByPattern && remainderLetters) {
        tokens = tokens.concat(dividedByPattern, remainderLetters);
      }

      if (!dividedByPattern && remainderLetters) {
        tokens = tokens.concat(remainderLetters);
      }
    }

    return tokens;
  }

  /*
   * Create a template to search for specific words by tokens
   * example: token "hel"
   * will find all words from the base with the same letters, regardless of the position in the word
   * example: ['hello', 'help']
   * @return random word of array
   * */
  static getWordByToken(token, lang) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${lang === 'ru' ? 'ru' : 'en'}.txt`, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }

        const searchByTokenPattern = new RegExp(`(.{1,}${token}|${token})(.+|)`, 'g');

        const matchingWords = data.match(searchByTokenPattern);
        const randomIndex = Math.floor(Math.random() * matchingWords?.length);

        matchingWords?.length ? resolve(matchingWords[randomIndex]) : resolve('dose');
      });
    });
  }
}

module.exports = MrphCrypt;
