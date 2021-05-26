const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const zipper = require('zip-local');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


const PORT = 8000;
app.use('/', express.static(__dirname + '/dist'));

app.use(express.json());       
app.use(bodyParser.json());
app.use(fileUpload());

app.post('/upload', async function (req, res) {
  let sampleFile;
  let uploadPath;
  
  console.log(JSON.stringify(req.body));

  const userId = req.body.userId;

      console.log('used_id = ',userId)
      
      console.log(`req.files >>>`,req.files) // eslint-disable-line

  /*const directory = __dirname + `/data/`;

  fs.rmdir(directory, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log(`${directory} is deleted!`);
});*/ //delete

    const dir = './data/' + userId
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const dir1 = './data/' + userId + '/uploads'
    if (!fs.existsSync(dir1)) {
      fs.mkdirSync(dir1);
    }

    const dir2 = './data/' + userId + '/output'
    if (!fs.existsSync(dir2)) {
      fs.mkdirSync(dir2);
    }


    setTimeout(() => {
      sampleFile = req.files.sampleFile;
      files = [].concat(sampleFile);

      uploadPath = __dirname + `/data/${userId}` + '/uploads/';
  
      for (let i = 0; i < files.length; i++) {
        files[i].name = i + '.docx'
  
        files[i].mv(uploadPath + files[i].name, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
      }
      const { spawn } = require('child_process');
      const pyProg = spawn('python', ['script.py']);
      console.log(`converted`);
      setTimeout(() => {
        zipper.sync.zip(__dirname + '/data/'+`/${userId}/output/`).compress().save(__dirname + '/data/'+`/${userId}/output/1.zip`); //zip all /output files to .zip
      }, 3000);
    }, 1000);
    const file = `${__dirname}/data/${userId}/output/1.zip`;
    setTimeout(() => {
      res.sendFile(file);
    }, 5000);
});

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});