
import { QueueService } from "./queue.service";

const qService = new QueueService();

async function bootstrap() {
    await qService.initialize();
}

bootstrap().then(() => {
    setInterval(async () => {
        await qService.sendMessage(`YO  ${new Date().getTime()}`, (Math.random() * 3) % 4);
    }, 5000);
});
