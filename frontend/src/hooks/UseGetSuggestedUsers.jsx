import axios from "axios";
import { setSuggestedUsers } from "@/redux/authslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/suggestedUsers",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSuggestedUsers(res.data.users));
          console.log(res.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuggestedUsers();
  }, []);
};

export default useGetSuggestedUsers;