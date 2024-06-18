import Axios from "@/Utils/Axios";

export const isAuthenticated = async () => {
  try {
    const response = await Axios.get("/me");
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }

  return false;
};
