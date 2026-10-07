import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        console.log(`Solicitud desde: ${origin}`)
        callback(null, true);
        return
    }
};