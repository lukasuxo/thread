import React, { useState, useEffect } from "react";
import Image from "next/image"; // Add Next.js Image import
import Button from "../ui/Button";

interface EditProfileFormProps {
  userName: string;
  userBio: string;
  profileImage: string | null;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  userName,
  userBio,
  profileImage,
  onCancel,
}) => {
  const [tempUserName, setTempUserName] = useState<string>("");
  const [tempUserBio, setTempUserBio] = useState<string>("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || userName;
    const storedUserBio = localStorage.getItem("userBio") || userBio;

    setTempUserName(storedUserName);
    setTempUserBio(storedUserBio);
  }, [userName, userBio]);

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          const currentUserData = JSON.parse(
            localStorage.getItem("currentUser") || "{}"
          );
          currentUserData.profileImage = imageData;
          localStorage.setItem("currentUser", JSON.stringify(currentUserData));
          localStorage.setItem("profileImage", imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileChanges = () => {
    const currentUserData = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    if (tempUserName.trim()) {
      currentUserData.username = tempUserName;
      localStorage.setItem("userName", tempUserName);
      localStorage.setItem("userHandle", `@${tempUserName}`);
    }

    currentUserData.bio = tempUserBio.trim();
    localStorage.setItem("userBio", tempUserBio.trim());

    localStorage.setItem("currentUser", JSON.stringify(currentUserData));

    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">
        პროფილის რედაქტირება
      </h2>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
            {profileImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700"></div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">სახელი</label>
          <input
            type="text"
            value={tempUserName}
            onChange={(e) => setTempUserName(e.target.value)}
            placeholder="შეიყვანე სახელი"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">ბიო</label>
          <textarea
            value={tempUserBio}
            onChange={(e) => setTempUserBio(e.target.value)}
            placeholder="შეიყვანე ბიო"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white h-20 resize-none"
          ></textarea>
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <Button variant="outline" fullWidth onClick={onCancel}>
          გაუქმება
        </Button>
        <Button variant="secondary" fullWidth onClick={saveProfileChanges}>
          შენახვა
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
