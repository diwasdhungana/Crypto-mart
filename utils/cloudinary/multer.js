import multer from "multer";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(
      {
        message: "File type not supported",
      },
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter: filefilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
export default upload;
