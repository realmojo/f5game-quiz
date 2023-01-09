// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  },
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://f5game.co.kr/api"
      : "https://f5game.co.kr/api", // baseUrl
});

export default function handler(req, res) {
  res.status(200).json({ message: "Hi" });
}
