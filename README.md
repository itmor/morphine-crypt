# morphine-crypt

![](https://i.ibb.co/84sP7kQ/ss.png)

Library for encrypting words.

### Example

```javascript
// ENGLISH 
const MrphCrypt = require('./mrphcrypt');

MrphCrypt.crypt('Hello world', 'en')
.then(cryptedString => console.log(`Crypted string: ${cryptedString}`));

// Crypted string: Helles cowplop clockwork remolds

// RUSSIAN
MrphCrypt.crypt('Hello world', 'ru')
.then(cryptedString => console.log(`Crypted string: ${cryptedString}`));

// Зашифрованная строка: Примаков советизирующий мирных

```
### Argument scheme
MrphCrypt.crypt(String, 'en' | 'ru'));

### How it works?

The word is split into tokens. A token is three letters of a word.
Example.
Word: **Settings**
Tokens array: **['Set' 'tin', 'gs']**

If the word is not divisible by 3 letters, then all the remaining letters will be the last element of the array.

After receiving the tokens, a search is made in the word base, the script searches for word matches with a separate token.
And forms a sentence from these words.

**Example**
Amagan**set**t abac**tin**ally administerin**gs**

