const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const AWS = require("aws-sdk");
const multer = require("multer");
const createMongoClient = require("../util/db.js");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

const s3Delete = (Key) => {
  const params = {
    Bucket: "my-web-application-s3",
    Key,
  };
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (error, data) => {
      if (error) {
        console.error("Error deleting object from S3:", error);
        reject(error);
      } else {
        console.log("Object deleted successfully from S3:", data);
        resolve(data);
      }
    });
  });
};

const s3Upload = (req, res, next) => {
  if (!req.file) {
    return next(new Error("No file uploaded"));
  }
  const { originalname, buffer } = req.file;
  const params = {
    Bucket: "my-web-application-s3",
    Key: Date.now().toString() + "-" + originalname,
    Body: buffer,
    ACL: "public-read",
  };
  s3.upload(params, async (error, data) => {
    if (error) {
      return next(error);
    }
    if (!data || !data.Location) {
      return next(new Error("S3 upload failed or missing 'Location'"));
    }
    req.body.image = data.Location;
    req.imageKey = params.Key; // Store the key for deletion later
    next();
  });
};

// Route to perform addition
router.get("/calculate/submit/:num1/:num2", (req, res) => {
  const Aresult = Number(req.params.num1) + Number(req.params.num2);
  res.json({ result: Aresult });
});

// Route to get all inventory items
router.get("/inventory", async (req, res) => {
  try {
    const db = await createMongoClient();
    const collection = db.collection("inventory");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to add a new inventory item
router.post(
  "/inventory/add",
  upload.single("file"),
  s3Upload,
  async (req, res) => {
    try {
      const db = await createMongoClient();
      const collection = db.collection("inventory");
      let body = req.body;
      const data = await collection.insertOne(body);
      res.json(body);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Route to update an existing inventory item
router.patch("/inventory/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const db = await createMongoClient();
    const collection = db.collection("inventory");
    const body = req.body;
    const updateResult = await collection.updateOne(
      { _id: id },
      { $set: body }
    );
    res.json(updateResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete an existing inventory item
router.delete("/inventory/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const db = await createMongoClient();
    const collection = db.collection("inventory");
    const item = await collection.findOne({ _id: id });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await collection.deleteOne({ _id: id });
    if (item.imageKey) {
      await s3Delete(item.imageKey);
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
