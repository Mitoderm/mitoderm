import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      default: "",
      trim: true
    },

    area: {
      type: String,
      enum: ["צפון", "מרכז", "דרום"],
      required: true,
      default: "מרכז"
    },

    profession: {
      type: String,
      default: "",
      trim: true
    },

    contact: {
      type: String,
      required: true,
      trim: true
    },

    instagram: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Doctor ||
  mongoose.model("Doctor", DoctorSchema);
