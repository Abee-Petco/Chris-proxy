// require('newrelic');
const express = require('express');
const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic('./client/'));

app.get('/product', (req, res) => {
  const { itemID } = req.query;
  const itemIdNumber = Number.parseInt(itemID, 10);

  if (itemIdNumber < 100 || itemIdNumber > 10000100 || itemIdNumber === undefined) {
    res.status(404).send('itemID invalid');
  } else {
    res.sendFile(`${__dirname}/client/index.html`, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.end();
      }
    });
  }
});

app.listen(3000);
