import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema(
  {
    category: {
      type: Number,
      enum: [990, 480, 180],
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String, 
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

eventSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);