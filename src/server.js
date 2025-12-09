require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const overrideRoutes  = require("./routes/overrideRoutes");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");
const uploadRoutes = require("./routes/uploadRoutes");

app.use(cors()); 


app.use(requestLogger);
app.use(express.json());





// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/override", overrideRoutes );
app.use("/api/upload", uploadRoutes);

app.use((req ,res)=>{
    res.status(404).json({success: false, message:"Router not found"});
})
app.use(errorHandler);
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch(err => console.error(err));
