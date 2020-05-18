
import bodyParser from "body-parser";
import express from "express";
import { QueueService } from "./queue.service";

// parse various different custom JSON types as JSON
const app = express();
app.use(bodyParser.json({ type: "application/*+json" }));

const port = 3000;

app.post("/", async (req, res) => {
    if (!req.body.msg || !req.body.execTime) {
        res.status(400).send();
    } else {
        await qService.sendMessage(JSON.stringify({ msg: req.body.msg }), Number(req.body.delay));
        res.status(201).send();
    }
});

const qService = new QueueService();
qService.initialize().then(() => {
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
});
