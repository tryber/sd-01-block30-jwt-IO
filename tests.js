// const fs = require('fs').promises;
// const path = require('path');
// const multer = require('multer');
// const express = require('express');

// let directory = 'api';
// const dirBuf = Buffer.from('api');

// let files = fs.readdirSync(directory);
// console.log(files)

// fs.readdir(dirBuf, (err, files) => {
//   console.log(files)
// })

// const app = express();
// const upload = multer({ dest: path.resolve(__dirname, 'uploads' )});
// const storage = multer.diskStorage({
//   destination: path.resolve(__dirname, 'uploads' ),
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   }
// });

// const storage =  multer.memoryStorage();
// const upload = multer({ storage });


// app.post('/', upload.single('image'), async (req, res) => {
//   // console.log(req.file);
//   // console.log(req.body);

//   const newFileName = path.resolve(__dirname, 'uploads', req.body.image);
//   await fs.writeFile(newFileName, req.file.buffer);
//   res.end();
// });

// app.listen(3001, () => {
//   console.log('Rodando na porta 3001')
// });
