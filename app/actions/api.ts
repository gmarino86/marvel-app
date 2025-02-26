import axios from "axios";
import crypto from "crypto";

const ts = new Date().getTime().toString();

const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: process.env.NEXT_PUBLIC_API_PUBLIC_KEY,
    ts,
    hash: crypto
    .createHash('md5')
    .update( ts + process.env.NEXT_PUBLIC_API_PRIVATE_KEY + process.env.NEXT_PUBLIC_API_PUBLIC_KEY)
    .digest('hex')
  },
});

export default apiAxios;
