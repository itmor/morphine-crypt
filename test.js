const MrphCrypt = require('./mrphcrypt');

MrphCrypt.crypt('Hello world', 'en')
.then(cryptedString => console.log(`Crypted string: ${cryptedString}`));

MrphCrypt.crypt('Привет мир', 'ru')
.then(cryptedString => console.log(`Зашифрованная строка: ${cryptedString}`));