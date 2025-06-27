"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import axios from "axios";
import Cookies from "js-cookie";

// Fixed component for Followers/Following Modal
const FollowersModal = ({ isOpen, onClose, type, userId }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && userId) {
      fetchUsers();
    }
  }, [isOpen, userId, type]);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const endpoint = type === "followers" ? "followers" : "following";

      // ✅ Fixed: Include userId in the API call
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${userId}/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle different possible response structures
      const userData =
        response.data.data?.[endpoint] ||
        response.data[endpoint] ||
        response.data?.user?.[endpoint] ||
        [];

      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      // Handle error gracefully
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    // Navigate to user profile
    window.location.href = `/user_profile/${userId}`;
    onClose();
  };

  const handleClose = () => {
    setSearchTerm("");
    setUsers([]);
    setFilteredUsers([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col max-h-[80vh] w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-black capitalize">
            {type} ({users.length})
          </h2>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No users found" : `No ${type} yet`}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleUserClick(user._id)}
                >
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <Image
                      unoptimized
                      src={user.avatar || user.ProfileImg || "/kuku-suit 2.png"}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      alt={user.name || user.username}
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {/* <h3 className="font-semibold text-black truncate">
                        {user.name}
                      </h3> */}
                      {user.verified && (
                        <Image
                          src="/verified.svg"
                          width={16}
                          height={16}
                          alt="Verified"
                          className="flex-shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-gray-500 text-sm truncate">
                      @{user.username}
                    </p>
                    {user.location && (
                      <p className="text-gray-400 text-xs truncate mt-1">
                        {user.location}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  {user.rating > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>{user.rating}</span>
                      <Image
                        src="/rating.svg"
                        width={14}
                        height={14}
                        alt="Rating"
                      />
                    </div>
                  )}

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 text-gray-300">→</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FollowersModal;
