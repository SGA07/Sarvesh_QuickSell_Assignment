import axios from "axios";

export const fetchAllData = async () => {
  try {
    const res = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
