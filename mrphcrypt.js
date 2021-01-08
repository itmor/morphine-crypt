const fs = require('fs');

class MrphCrypt {
    static async crypt(words, lang) {
        const tokens = this.createTokens(words);

        let cryptedString = '';

        for (const token of tokens) {
            cryptedString ? cryptedString += ' ' + await MrphCrypt.getWordByToken(token, lang) : cryptedString = await MrphCrypt.getWordByToken(token, lang);
        }

        return cryptedString;
    }

    static createTokens(words) {
        let tokens = [];

        for (const word of words.split(' ')) {
            const pattern = new RegExp(/\(?\S{3}\)?/g);
            const dividedByPattern = word.match(pattern);
            const remiderLatters = word.replace(pattern, '');

            if (dividedByPattern && !remiderLatters) {
                tokens = tokens.concat(dividedByPattern);
            }

            if (dividedByPattern && remiderLatters) {
                tokens = tokens.concat(dividedByPattern, remiderLatters);
            }

            if (!dividedByPattern && remiderLatters) {
                tokens = tokens.concat(remiderLatters);
            }
        }

        return tokens;
    }

    static getWordByToken(token, lang) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${lang === 'ru' ? 'ru' : 'en'}.txt`, 'utf8', (error, data) => {
                if (error) {
                    reject(error);
                }

                const pattern = new RegExp(`(.{1,}${token}|${token})(.{1,}|)`, 'g');
                const matchingWords = data.match(pattern);

                matchingWords ? resolve(matchingWords[Math.floor(Math.random() * matchingWords.length)]) : resolve(token);
            });
        });
    }
}

module.exports = MrphCrypt; 