const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, './views/images');
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload };
