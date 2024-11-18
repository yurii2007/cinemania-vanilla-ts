const express = require('express');
const path = require('path');

const app = express();

const router = express.Router();

app.use(express.static('build'));

router.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(router);

app.listen(3000, () => {
  console.log('listen on 3000');
});
