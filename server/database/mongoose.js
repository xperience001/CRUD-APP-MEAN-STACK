const mongoose = require("mongoose");

const connection_url = `mongodb+srv://admin:nADLjblQQUpHBvic@cluster0.alatk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

module.exports = mongoose;
