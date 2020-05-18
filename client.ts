
import redis from "redis";
import RedisSMQ, * as rsmq from "rsmq";

const client = redis.createClient();

client.on("error", (error) => {
    console.error(error);
});

// client.set("key", "value", redis.print);
// client.get("key", redis.print);
const run = true;
const queueManager = new rsmq.default({ client });
async function bootstrap() {
    try {
        const p1 = await queueManager.createQueueAsync({ qname: "execQ" });
    } catch (error) {
        console.error(error);
    }
}

async function execute(msg: string, delay: number) {
    await queueManager.sendMessageAsync({ qname: "execQ", message: JSON.stringify({ msg }), delay });
}

bootstrap().then(() => {
    setInterval(() => {
        execute("hi" + new Date().getTime(), (Math.random() * 3) % 4);
    }, 500);

});
