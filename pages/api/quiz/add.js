// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { axiosInstance as axios } from "../quiz";


export default function handler(req, res) {
  try {
    const params = {
      
    }
    const { data } = await axios.post("/quiz/add", params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
}
