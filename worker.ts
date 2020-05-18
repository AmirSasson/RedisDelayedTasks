import { QueueService } from "./queue.service";

const qService = new QueueService();

const run = true;

async function bootstrap() {
    try {
        await qService.initialize();
    } catch (error) {
        console.error(error);
    }
    executionWorker();
}

async function executionWorker() {

    while (run) {
        try {
            const msg: any = await qService.receiveMsg();
            console.log(`[${new Date().toISOString()}] ${msg.message}`); // THE JOB
        } catch {
            await sleep(10);
        }
    }
}

async function sleep(ms: number) {
    return new Promise((res) => {
        setTimeout(() => { res(); }, ms);
    });

}

bootstrap().then(() => {
    // setInterval(() => {
    //     execute("hi" + new Date().getTime(), (Math.random() * 3) % 4);
    // }, 500);

});
