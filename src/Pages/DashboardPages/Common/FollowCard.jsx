import React, { useState } from 'react';
import { IoMdCheckmark } from "react-icons/io";

const FollowCard = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex flex-col p-6 rounded-lg bg-white w-fit shadow-md">
      <div className="flex gap-12 text-center justify-center">
        <div>
          <b className="text-xl text-[#139196]">150</b><br />
          <span className="text-sm text-gray-600">Follower</span>
        </div>
        <div>
          <b className="text-xl text-[#139196]">140</b><br />
          <span className="text-sm text-gray-600">Place Stay</span>
        </div>
        <div>
          <b className="text-xl text-[#139196]">45</b><br />
          <span className="text-sm text-gray-600">Reviews</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <p className="text-gray-700 text-sm text-center">
          Striving for excellence through learning, sharing knowledge, and making a meaningful impact in the community.
        </p>
        <div className="flex gap-3 mt-3">
          <button 
            className={`px-4 py-2 text-white text-sm font-semibold rounded-md transition ${
              isFollowing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#139196] hover:bg-[#107c7c]'
            }`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? <p className='flex items-center gap-1'>Following <IoMdCheckmark /></p> : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowCard;
