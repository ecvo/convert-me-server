const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
const zipper = require('zip-local');
const { spawn } = require('child_process');

const app = express();
const PORT = 8000;

app.use('/', express.static(__dirname + '/dist'));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

app.post('/upload', async function (req, res) {
  console.log(JSON.stringify(req.body));

  const userId = req.body.userId;
  console.log('userId =', userId);
  console.log('req.files >>>', req.files);

  const createDirectory = (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
  };

  const userIdDirectory = `./data/${userId}`;
  const uploadsDirectory = `./data/${userId}/uploads`;
  const outputDirectory = `./data/${userId}/output`;

  createDirectory(userIdDirectory);
  createDirectory(uploadsDirectory);
  createDirectory(outputDirectory);

  setTimeout(() => {
    const sampleFile = req.files.sampleFile;
    const files = [].concat(sampleFile);
    const uploadPath = `${__dirname}/data/${userId}/uploads/`;

    for (let i = 0; i < files.length; i++) {
      files[i].name = i + '.docx';

      files[i].mv(uploadPath + files[i].name, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    const pyProg = spawn('python', ['script.py']);
    console.log('converted');

    setTimeout(() => {
      const zipPath = `${__dirname}/data/${userId}/output/1.zip`;
      zipper.sync.zip(`${__dirname}/data/${userId}/output/`).compress().save(zipPath);
    }, 3000);
  }, 5000);

  const file = `${__dirname}/data/${userId}/output/1.zip`;

  setTimeout(() => {
    res.sendFile(file);
  }, 10000);
});

app.listen(PORT, function () {
  console.log('Express server listening on port', PORT);
});
