const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, done) => {
      done(null, './views/images');
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
  })

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
    },
  });

module.exports = { storage, upload }
