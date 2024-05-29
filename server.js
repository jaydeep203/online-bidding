const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const {PrismaClient} = require("@prisma/client");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const PORT=8000;

dotenv.config();
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.use("/users", authRoutes);
app.use("/users", userRoutes);

app.use("/items", itemRoutes);
app.use("/items", bidRoutes);
app.use('/notifications', notificationRoutes);

app.get("/", (req, res)=>{
    res.json({
        message:"working..."
    });
});

app.post("/post", async(req, res)=>{
    const {name, email}= req.body;
    const user = await prisma.user.create({
        data:{ name, email}
    });
    res.json(user);
});

app.listen(PORT, (req, res) => {
    console.log("Website is working on http://localhost:"+PORT);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});