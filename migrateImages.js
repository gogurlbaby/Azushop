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
  await mongoose.connect("mongodb://127.0.0.1:27017/huxnStore");

  const products = await Product.find();
  for (const product of products) {
    const imageName = product.image.split("/").pop(); // e.g., computer.svg
    const localPath = path.join(
      "/Users/philiahammond/Desktop/Azushop/frontend/public/images/shop",
      imageName
    );
    if (fs.existsSync(localPath)) {
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "azushop",
        resource_type: "image",
      });
      product.image = result.secure_url;
      await product.save();
      console.log(`Updated ${product.name} with URL: ${result.secure_url}`);
    } else {
      console.log(`File not found for ${product.name}: ${localPath}`);
    }
  }
  console.log("Migration complete");
  mongoose.connection.close();
}

migrateImages().catch(console.error);
