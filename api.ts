
import bodyParser from "body-parser";
import express from "express";
import { QueueService } from "./queue.service";

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const MAX_DELAY_SEC = 9999999;

app.post("/", async (req, res) => {
    if (!req.body.msg ||
        !req.body.execTimeUnixMS ||
        Number(req.body.execTimeUnixMS) < new Date().getTime() ||
        ((Number(req.body.execTimeUnixMS) - new Date().getTime()) / 1000) > MAX_DELAY_SEC
    ) {
        res.status(400).send();
    } else {
        const delaySec = (Number(req.body.execTimeUnixMS) - new Date().getTime()) / 1000;
        await qService.sendMessage(JSON.stringify({ msg: req.body.msg }), delaySec);
        res.status(201).send();
    }
});

const qService = new QueueService();
qService.initialize().then(() => {
    app.listen(port, () => console.log(`api app listening at http://localhost:${port}`));
});
