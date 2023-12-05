const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.j2nushr.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((error) => {
    console.error(error.message);
  });
