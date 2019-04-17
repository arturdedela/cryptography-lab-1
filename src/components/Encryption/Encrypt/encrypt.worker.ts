import { algorithms } from "../algorithms";
import { IFinishData, IProgressData, isEncryptMessage } from "./types";

const ctx: Worker = self as any;

ctx.addEventListener("message", (e) => {

    if (isEncryptMessage(e.data)) {
        const { file, algorithmName, encryptionKey, mode, options } = e.data;
        const algorithm = algorithms[algorithmName];

        algorithm.setEncryptKey(encryptionKey);

        let prevProgress = 0;
        algorithm.onProgress = (ready: number, total: number) => {
            const curProgress = ready / total * 100;

            if (curProgress - prevProgress >= 1) {
                const progressMessage: IProgressData = {
                    action: "progress",
                    progress: Math.round(curProgress)
                };
                ctx.postMessage(progressMessage);
                prevProgress = curProgress;
            }
        };

        let encryptTime = performance.now();
        const encryptedFile = algorithm[mode](file, options);
        encryptTime = performance.now() - encryptTime;

        const finishMessage: IFinishData = {
            action: "finish",
            encryptedFile,
            decryptionKey: algorithm.key,
            encryptTime
        };
        ctx.postMessage(finishMessage);
    }
});

export default null as any;