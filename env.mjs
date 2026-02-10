import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const appEnv = createEnv({
    client: {
        NEXT_PUBLIC_APP_API_URL: z.string().url(),
        NEXT_PUBLIC_ENCRYPT_KEY: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
        NEXT_PUBLIC_ENCRYPT_KEY: process.env.NEXT_PUBLIC_ENCRYPT_KEY,
    },
});
export default appEnv
