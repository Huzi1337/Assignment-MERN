import mongoose from "mongoose";
import createApp from "./app.js";

const databaseURL =
  "mongodb+srv://brainhub:SM8M7jyc9-UPT8M@bigbadcluster.2sp4mjp.mongodb.net/logs?retryWrites=true&w=majority";

const PORT = 8000;

const app = createApp();

mongoose
  .set("strictQuery", false)
  .connect(databaseURL)
  .then(() => {
    app.listen(PORT, () => console.log(`Live on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
