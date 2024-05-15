import express from 'express';
import { deleteUser, getUser,updateUser } from '../Controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import path from'path';
import multer from 'multer';
const router=express.Router();
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Files will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Appending a timestamp to avoid filename conflicts
    }
  });
  const upload = multer({ storage: storage });
router.get('/test',getUser)
router.post('/update/:id', upload.single('avatar'),verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)


export default router