import mongoose from "mongoose";
import cloudinary from "cloudinary";
import Product from "./backend/models/Product.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateImages() {
  try {
    await mongoose.connect(
      "mongodb+srv://azushop_user:Gobaby123.@cluster0.cduzgxn.mongodb.net/huxnStore?retryWrites=true&w=majority"
    );

    const products = await Product.find();
    for (const product of products) {
      if (product.image.startsWith("http")) {
        console.log(`Skipping ${product.name}: Already a Cloudinary URL`);
        continue;
      }

      const imageName = path.basename(product.image);
      const prefixedImageName = `Image${imageName}`;
      const localPaths = [
        path.join(
          "/Users/philiahammond/Desktop/Azushop/frontend/public/images/shop",
          imageName
        ),
        path.join(
          "/Users/philiahammond/Desktop/Azushop/frontend/public/images/shop",
          prefixedImageName
        ),
        path.join(__dirname, "../frontend/public/images/shop", imageName),
      ];

      let foundPath = null;
      for (const localPath of localPaths) {
        if (fs.existsSync(localPath)) {
          foundPath = localPath;
          break;
        }
      }

      if (foundPath) {
        const result = await cloudinary.uploader.upload(foundPath, {
          folder: "azushop",
          resource_type: "image",
        });
        product.image = result.secure_url;
        await product.save();
        console.log(`Updated ${product.name} with URL: ${result.secure_url}`);
      } else {
        console.log(
          `File not found for ${product.name}: ${localPaths.join(", ")}`
        );
      }
    }
    console.log("Migration complete");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    mongoose.connection.close();
  }
}

migrateImages();
