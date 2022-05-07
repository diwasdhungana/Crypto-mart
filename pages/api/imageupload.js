import nc from "next-connect";
import upload from "../../utils/cloudinary/multer";
import cloudinary from "../../utils/cloudinary/cloudinary";
import fs from "fs";

const handler = nc();

handler.use("/api/imageupload", upload.array("image"), (req, res) => {
  const uploader = async (path) => {
    const result = await cloudinary.uploads(path, "images");
  };

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    res.status(200).json({ message: "success", urls });
  } else {
    res.status(404).json({ message: "not found" });
  }
});

export default handler;
