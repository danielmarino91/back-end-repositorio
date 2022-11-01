import multer from 'multer';
import { User } from '../dbmodels/dbsConfig.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})

const validateData = (req, file, cb) => {
    const newPhone = req.body.phone;
    const newEmail = req.body.email;
    const newUser = req.body.username;
    req.session.fileError = '';

    User.findOne({ $or: [{ username: newUser }, { email: newEmail }, { phone: newPhone }] })
        .then(user => {
            if (user) {
                cb(null, false)
            } else if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return req.session.fileError = 'Subi una imagen con los formatos permitidos( JPG, JPEG y/o PNG)';
            }
        })
}

export const upload = multer({ storage: storage, fileFilter: (req, file, cb) => validateData(req, file, cb) });