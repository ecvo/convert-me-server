const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');
const zipper = require('zip-local');


const PORT = 8000;
app.use('/', express.static(__dirname + 'dist'));

app.use(fileUpload());

app.post('/upload', async function (req, res) {
  console.dir(req.ip)
  let sampleFile;
  let uploadPath;


  console.log(`req.files >>>`,req.files) // eslint-disable-line

  const directory = __dirname + '/uploads';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

  const directory1 = __dirname + '/output';

  fs.readdir(directory1, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory1, file), err => {
        if (err) throw err;
      });
    }
  });

    setTimeout(() => {
      sampleFile = req.files.sampleFile;
      files = [].concat(sampleFile);
      
      uploadPath = __dirname + '/uploads/';
  
      for (let i = 0; i < files.length; i++) {
        files[i].name = (i+1) + '.docx'
  
        files[i].mv(uploadPath + files[i].name, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
      }
      const { spawn } = require('child_process');
      const pyProg = spawn('python', ['script.py']);
      console.log(`converted`);
    }, 1000);
});

app.get('/download', async function (req, res) {

  //zip all /output files to .zip
  zipper.sync.zip("./output").compress().save("./output/1.zip");
  //throw output to client-side
  const file = `${__dirname}/output/1.zip`;
  res.sendFile(file);
});

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});