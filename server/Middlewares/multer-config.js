//***** GESTION DES IMAGES DES POSTS ******//
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathRoute = req.route.path;
        // Identification de la destination selon le endpoint utilisé par l'utilisateur
        if (pathRoute === '/modifyprofile/:id') cb(null, 'images/user');
        if (pathRoute === '/' || pathRoute === '/:id') cb(null, 'images/post');
      },
      
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');