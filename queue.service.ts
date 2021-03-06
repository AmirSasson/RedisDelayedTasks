import redis from "redis";
import RedisSMQ, * as rsmq from "rsmq";

const client = redis.createClient({
    retry_strategy(options) {
        return Math.min(options.attempt * 100, 3000);
    },
});

client.on("error", (error) => {
    console.error(error);
});

const QUEUE_NAME = "execQ";
export class QueueService {
    public queueManager: RedisSMQ;
    private hasInitialized = false;
    constructor() {
        this.queueManager = new rsmq.default({ client });
    }
    public async initialize(): Promise<any> {
        if (!this.hasInitialized) {
            try {
                await this.queueManager.createQueueAsync({ qname: QUEUE_NAME });
            } catch (error) {
                if (!error.name || error.name !== "queueExists") {
                    console.error(error);
                }
            }
            this.hasInitialized = true;
        }
    }
    public async sendMessage(msg: string, delay: number) {
        await this.queueManager.sendMessageAsync({ qname: QUEUE_NAME, message: JSON.stringify({ msg }), delay });
    }
    public async receiveMsg(): Promise<RedisSMQ.QueueMessage> {
        return new Promise(async (res, rej) => {
            try {
                const msg: any = await this.queueManager.receiveMessageAsync({ qname: QUEUE_NAME, vt: 10 * 1000 });
                if (msg.message) {
                    res(msg as RedisSMQ.QueueMessage);
                } else {
                    rej("no messages");
                }
            } catch (error) {
                console.error(error);
                rej("connection error");
            }

        });
    }
}
