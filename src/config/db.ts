import mongoose from "mongoose";
import dns from "node:dns";
import { exit } from "node:process";

export const initDB = async () => {
    console.log("conectar la base de datos", process.env.DATABASE_URL);
    try{
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
        const conexion = await mongoose.connect(process.env.DATABASE_URL!);
        console.log(`Conexion establecida con la Base de Datos`);
        console.log(`${conexion.connection.host} : ${conexion.connection.port}`);
    }
    catch(error: unknown){
        console.log(`Error al conectar la BD: ${error}`);
        exit(1)
    };
};