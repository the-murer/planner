import mongoose from "mongoose";

interface Meets extends mongoose.Document {
  name: string;
  local?: string;
  timeOfDay?: string;
  weekDay?: string;
  form: mongoose.Document[];
  companyId: string;
}

const MeetSchema = new mongoose.Schema<Meets>({
  name: {
    type: String,
    required: true,
  },
  local: {
    type: String,
  },
  timeOfDay: {
    type: String,
  },
  weekDay: {
    type: String,
  },
  form: {
    type: [mongoose.Schema.Types.Mixed],
  },
  companyId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Meet ||
  mongoose.model<Meets>("Meet", MeetSchema);
