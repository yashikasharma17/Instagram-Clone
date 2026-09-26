import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { setAuthUser } from "@/redux/authslice";
// adjust path if needed

const USER_API_END_POINT = "https://instagram-clone-3-cfe5.onrender.com/api/v1/user"; // adjust to your setup

const SuggestedUsers = () => {
  const dispatch = useDispatch();
  const { suggestedUsers, user } = useSelector((store) => store.auth);

  const handleFollowUnfollow = async (targetUserId) => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/followOrUnfollow/${targetUserId}`,
        {},
        { withCredentials: true }
      );
      const isFollowed = user?.following?.includes(targetUserId);
      if (res.data.success) {
        

        const updatedFollowing = isFollowed
          ? user.following.filter((id) => String(id) !== String(targetUserId))
          : [...(user.following || []), targetUserId];

        dispatch(setAuthUser({ ...user, following: updatedFollowing }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-5">
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-sm">Suggested Users</p>
        <span className="text-xs font-semibold text-blue-500 hover:cursor-pointer hover:text-black">
          See all
        </span>
      </div>

      {suggestedUsers?.map((suggestedUser) => {
        const isFollowed = user?.following
          ?.map(String)
          .includes(String(suggestedUser._id));

        return (
          <div
            key={suggestedUser._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${suggestedUser?._id}`}>
                <Avatar>
                  <AvatarImage src={suggestedUser?.profilepic} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <p className="font-semibold text-sm">
                  <Link to={`/profile/${suggestedUser?._id}`}>
                    {suggestedUser?.username}
                  </Link>
                </p>
                <span className="text-gray-600 text-sm">
                  {suggestedUser?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span
              onClick={() => handleFollowUnfollow(suggestedUser._id)}
              className={`text-xs font-bold cursor-pointer pl-2 ${
                isFollowed
                  ? "text-gray-500 hover:text-black"
                  : "text-[#3BADF8] hover:text-[#3495d6]"
              }`}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;