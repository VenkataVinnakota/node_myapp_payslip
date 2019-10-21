// call all the required packages
const express = require('express');
const csv = require('csv-parse');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { calculator1 } = require('./calculator.js');

// create express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./static/'));
app.use('/views', express.static('./views/'));

// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.csv') {
      return cb(new Error('Only csv files are accepted!'));
    }
    return cb(null, true);
  },
});

// let upload = multer({ dest: 'uploads/'});

// Upload a Single File
app.post('/upload', upload.single('myfile'), (req, res) => {
  const { file } = req;
  const array = [];

  fs.createReadStream(file.path)
    .pipe(csv({
      skip_empty_lines: true,
      skip_lines_with_error: true,
      rtrim: true,
      ltrim: true
    }))
    .on('data', (data) => {
      array.push(data);
    }).on('end', () => {
      res.status(200).send(calculator1(array));
    });
});

// Routes

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/views/index.html`);
});

app.listen(process.env.PORT || 3000);
