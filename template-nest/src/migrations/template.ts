// Orders is important, import your models bellow this two lines, NOT above
import mongoose from "mongoose";
mongoose.set("strictQuery", false); // https://mongoosejs.com/docs/guide.html#strictQuery

// Import your models here

// Make any changes you need to make to the database here
export async function up() {
  await this.connect(mongoose);
  // Write migration here
}

// Make any changes that UNDO the up function side effects here (if possible)
export async function down() {
  await this.connect(mongoose);
  // Write migration here
}
