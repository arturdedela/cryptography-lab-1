import { algorithms } from "../algorithms";
import { IProgressData, isEncryptMessage } from "./types";

const ctx: Worker = self as any;

ctx.addEventListener("message", (e) => {

    if (isEncryptMessage(e.data)) {
        const { file, algorithmName, encryptionKey } = e.data;
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

        const encryptedFile = algorithm.encrypt(file);

        ctx.postMessage({ action: "finish", encryptedFile, decryptionKey: algorithm.key });
    }
});

export default null as any;