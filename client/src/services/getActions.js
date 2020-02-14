import axios from "axios";
export default async () => {
  const result = await axios
    .get(`http://localhost:5200/api/actions`)
    .then(res => res);
  return result;
};


