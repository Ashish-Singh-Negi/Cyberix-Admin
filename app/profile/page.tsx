import React from "react";

import ProfileEdit from "./components/ProfileEdit";

const ProfilePage = () => {
  return (
    <div className="h-full w-full p-20 flex justify-center items-center">
      <main className="h-[550px] w-[550px] bg-white dark:bg-gray-900 dark:text-gray-50 text-gray-950 border-2 dark:border-gray-600 border-gray-300 rounded-lg flex justify-center items-center">
        <ProfileEdit />
      </main>
    </div>
  );
};

export default ProfilePage;
