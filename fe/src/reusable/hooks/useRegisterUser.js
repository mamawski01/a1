import { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";

export default function useRegisterUser() {
  const navigate = useNavigate();
  const [isLoading, isLoadingSet] = useState(false);

  const registerUserRequest = async (data) => {
    isLoadingSet(true);
    const response = await registerUser(data);
    isLoadingSet(false);

    if (response.error) {
      return toast.error(
        response.exception?.response?.data ||
          "Error occured while registering in. Please try again.",
      );
    }
    // const { userDetails } = response.data;

    navigate("/");
  };

  return { registerUserRequest, isLoading };
}
