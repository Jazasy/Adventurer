const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/test", (req, res)=>{
    res.json("server is responsing");
})

const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));