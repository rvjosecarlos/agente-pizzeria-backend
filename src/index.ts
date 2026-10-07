import { app } from "./server.ts";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor en linea por el puerto: ${PORT}`)
})