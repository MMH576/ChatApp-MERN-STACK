import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.filter((id) => id !== authUser?._id).length} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-200" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={user.profilePic || "/default-avatar.png"}
                    alt={user.fullName}
                  />
                </div>
              </div>
              {/* Online indicator */}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full border-2 border-base-100"></span>
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <h3 className="font-medium truncate">{user.fullName}</h3>
              <p className="text-sm text-base-content/60 truncate">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-success">Online</span>
                ) : (
                  "Offline"
                )}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
