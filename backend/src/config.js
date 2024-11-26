import {config} from "dotenv"

config();

console.log(process.env.port)
export default{
    port: process.env.port || 4000
}