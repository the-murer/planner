import mongoose from "mongoose";

interface Forms extends mongoose.Document {
  name: string;
  sector: string;
  answers: mongoose.Document[];
  userId: string;
  meetId: string;
  companyId: string;
}

const FormSchema = new mongoose.Schema<Forms>({
  name: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  answers: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  meetId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Form ||
  mongoose.model<Forms>("Form", FormSchema);
