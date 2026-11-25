import { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "./models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, "config", "config.env") });

const sampleDoctors = [
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@hospital.com",
    phone: "9822011223",
    nic: "111122223333",
    dob: new Date("1985-05-15"),
    gender: "Female",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Pediatrics",
    docAvatar: {
      public_id: "doc_avatar_priya",
      url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Rajesh",
    lastName: "Kulkarni",
    email: "rajesh.kulkarni@hospital.com",
    phone: "9822011224",
    nic: "111122223334",
    dob: new Date("1982-08-20"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Pediatrics",
    docAvatar: {
      public_id: "doc_avatar_rajesh",
      url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Vikram",
    lastName: "Joshi",
    email: "vikram.joshi@hospital.com",
    phone: "9822011225",
    nic: "111122223335",
    dob: new Date("1980-03-10"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Orthopedics",
    docAvatar: {
      public_id: "doc_avatar_vikram",
      url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Amit",
    lastName: "Mehta",
    email: "amit.mehta@hospital.com",
    phone: "9822011226",
    nic: "111122223336",
    dob: new Date("1978-11-25"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Cardiology",
    docAvatar: {
      public_id: "doc_avatar_amit",
      url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Rohan",
    lastName: "Verma",
    email: "rohan.verma@hospital.com",
    phone: "9822011227",
    nic: "111122223337",
    dob: new Date("1983-07-19"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Neurology",
    docAvatar: {
      public_id: "doc_avatar_rohan",
      url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Suresh",
    lastName: "Rao",
    email: "suresh.rao@hospital.com",
    phone: "9822011228",
    nic: "111122223338",
    dob: new Date("1975-09-12"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Oncology",
    docAvatar: {
      public_id: "doc_avatar_suresh",
      url: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Alok",
    lastName: "Gupta",
    email: "alok.gupta@hospital.com",
    phone: "9822011229",
    nic: "111122223339",
    dob: new Date("1986-04-18"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Radiology",
    docAvatar: {
      public_id: "doc_avatar_alok",
      url: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Deepak",
    lastName: "Chopra",
    email: "deepak.chopra@hospital.com",
    phone: "9822011230",
    nic: "111122223340",
    dob: new Date("1988-12-05"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Physical Therapy",
    docAvatar: {
      public_id: "doc_avatar_deepak",
      url: "https://images.unsplash.com/photo-1594824813580-779838fb0fd0?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Tanvi",
    lastName: "Shah",
    email: "tanvi.shah@hospital.com",
    phone: "9822011231",
    nic: "111122223341",
    dob: new Date("1991-02-14"),
    gender: "Female",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "Dermatology",
    docAvatar: {
      public_id: "doc_avatar_tanvi",
      url: "https://images.unsplash.com/photo-1594824813580-779838fb0fd0?auto=format&fit=crop&q=80&w=300",
    },
  },
  {
    firstName: "Manish",
    lastName: "Bansal",
    email: "manish.bansal@hospital.com",
    phone: "9822011232",
    nic: "111122223342",
    dob: new Date("1984-06-30"),
    gender: "Male",
    password: "doctorpassword123",
    role: "Doctor",
    doctorDepartment: "ENT",
    docAvatar: {
      public_id: "doc_avatar_manish",
      url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    },
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    });
    console.log("Connected to MongoDB for doctor seeding...");

    for (const docData of sampleDoctors) {
      const existing = await User.findOne({ email: docData.email });
      if (!existing) {
        await User.create(docData);
        console.log(`Created doctor: ${docData.firstName} ${docData.lastName} (${docData.doctorDepartment})`);
      } else {
        console.log(`Doctor already exists: ${docData.email}`);
      }
    }

    console.log("=========================================");
    console.log("Doctors seeded successfully!");
    console.log("=========================================");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();
