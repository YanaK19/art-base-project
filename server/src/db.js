import mongoose from "mongoose";
const MONGO_CONNECTION = "mongodb+srv://Artist:artbase@ninjacluster.mq6wo.mongodb.net/ArtBase?retryWrites=true&w=majority";

export default (async function connect() {
  try {
    await mongoose.connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
})();