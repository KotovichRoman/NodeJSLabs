const express = require('express');
const m0603 = require('./m0603');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    const fromEmail = 'ksuna228@mail.ru';
    const toEmail = 'ksuna6233@gmail.com';
    const password = 'CPMgunEAHyvCCuMqgYfW';

    m0603.send(fromEmail, password, toEmail,  'Hello from m0603 module!');

    res.send("ok");
});

app.listen(3001, () => {
    console.log('Server started ');
});

