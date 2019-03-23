import { algorithms } from "../algorithms";
import { isEncryptMessage } from "./types";

const ctx: Worker = self as any;

ctx.addEventListener("message", (e) => {

    if (isEncryptMessage(e.data)) {
        const { file, algorithmName, encryptionKey } = e.data;
        const algorithm = algorithms[algorithmName];

        algorithm.setEncryptKey(encryptionKey);
        algorithm.onProgress = (progress: number) => ctx.postMessage({ action: "progress", progress });

        const encryptedFile = algorithm.encrypt(file);

        ctx.postMessage({ action: "finish", encryptedFile, decryptionKey: algorithm.key });
    }
});

export default null as any;