const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage : fileStorageEngine});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const imgPath = path.resolve(__dirname, `../images/${id}.png`);
  res.sendFile(imgPath);
});
router.post('/', upload.single('image'), (req, res) => {
  res.sendStatus(201);
});

module.exports = router;
