import mongoose, { Schema, Document } from "mongoose";

// Define an interface for Author
interface Author extends Document {
  name: string;
  // Add other properties of Author if needed
}

// Define a schema for Author
const authorSchema = new Schema<Author>({
  name: { type: String, required: true }
});

// Define a model for Author
const AuthorModel = mongoose.model<Author>("Author", authorSchema);

// Define the Book interface
interface Book extends Document {
  title: string;
  author: Author; // Reference the Author interface
  coverImage: string;
  file: string;
  genre: string;
}

// Define the Book schema
const bookSchema = new mongoose.Schema<Book>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author', // reference to the Author model
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export { Book, Author, AuthorModel };
export default mongoose.model<Book>("Book", bookSchema);
