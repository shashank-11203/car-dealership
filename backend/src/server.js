const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });