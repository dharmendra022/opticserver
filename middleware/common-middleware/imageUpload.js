import multer from 'multer';
import express from "express";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// const singleUpload = multer({ storage }).single('mediaKey');
const singleUpload = multer({ storage }).single('mediaKey');
const upload = multer({ storage }).array('mediaKey', 10);
export { upload, singleUpload };
