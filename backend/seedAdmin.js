import { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "./models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, "config", "config.env") });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    });
    console.log("Connected to MongoDB for seeding...");

    const existingAdmin = await User.findOne({ role: "Admin" });
    if (existingAdmin) {
      console.log(`Admin already exists: ${existingAdmin.email}`);
      process.exit(0);
    }

    const admin = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@hospital.com",
      phone: "9876543210",
      nic: "123456789012",
      dob: new Date("1990-01-01"),
      gender: "Male",
      password: "adminpassword123",
      role: "Admin",
    });

    console.log("=========================================");
    console.log("Initial Admin created successfully!");
    console.log(`Email: ${admin.email}`);
    console.log("Password: adminpassword123");
    console.log("Role: Admin");
    console.log("=========================================");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
