const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    //폴더위치 지정
    destination: (req, file, done) => {
      done(null, './views/images');
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aaa.txt => aaa+&&+129371271654.txt
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
  }),
  // fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload };
