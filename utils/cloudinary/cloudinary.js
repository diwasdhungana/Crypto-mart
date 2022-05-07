import cloudinary from "cloudinary";

cloudinary.config = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

exports.upload = () => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.secure_url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: "product",
        use_filename: true,
      }
    );
  });
};
