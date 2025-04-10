import React from "react";
import { LogOut } from "lucide-react";
import Button from "../ui/Button";
import EditProfileForm from "./EditProfileForm";

interface ProfileSectionProps {
  userName: string;
  userHandle: string;
  userBio: string;
  profileImage: string | null;
  editingProfile: boolean;
  setEditingProfile: (editing: boolean) => void;
  onLogout: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userName,
  userHandle,
  userBio,
  profileImage,
  editingProfile,
  setEditingProfile,
  onLogout,
}) => {
  return (
    <div className="p-4 border-b border-gray-800">
      {editingProfile ? (
        <EditProfileForm
          userName={userName}
          userBio={userBio}
          profileImage={profileImage}
          onCancel={() => setEditingProfile(false)}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{userName}</h2>
              <p className="text-gray-500">{userHandle}</p>
            </div>
            <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700"></div>
              )}
            </div>
          </div>
          <p className="text-white mb-4">{userBio}</p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setEditingProfile(true)}>
              რედაქტირება
            </Button>

            <Button
              variant="danger"
              icon={<LogOut size={16} />}
              onClick={onLogout}
            >
              გამოსვლა
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
