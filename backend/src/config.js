import {config} from "dotenv"

config();


export default{
    port: process.env.port || 4000
}