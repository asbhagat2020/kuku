"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import axios from "axios";
import Cookies from "js-cookie";

// Responsive component for Followers/Following Modal
const FollowersModal = ({ isOpen, onClose, type, userId, refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Add refreshTrigger to dependencies to refetch when followers change
  useEffect(() => {
    if (isOpen && userId) {
      fetchUsers();
    }
  }, [isOpen, userId, type, refreshTrigger]);

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
    <Modal isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      {/* Responsive container - compact modal for all screen sizes */}
      <div className="flex flex-col w-full max-w-xs mx-auto h-auto max-h-[85vh] sm:max-w-sm rounded-lg bg-white shadow-lg m-2 sm:m-4">
        {/* Header - responsive padding and text size */}
        <div className="flex items-center justify-between p-4 sm:p-4 lg:p-5 border-b border-gray-200 bg-white rounded-t-lg">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black capitalize">
            {type} ({users.length})
          </h2>
          {/* Close button for modal */}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar - responsive padding and input size */}
        <div className="p-4 sm:p-4 lg:p-5 border-b border-gray-200 bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 text-lg sm:text-xl"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Users List - responsive heights and scrolling */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-4 lg:p-5 bg-white rounded-b-lg min-h-[200px] max-h-[50vh]">
          {loading ? (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
              {searchTerm ? "No users found" : `No ${type} yet`}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 sm:gap-3 lg:gap-4 p-3 sm:p-3 lg:p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors active:bg-gray-100"
                  onClick={() => handleUserClick(user._id)}
                >
                  {/* Profile Image - responsive sizes */}
                  <div className="flex-shrink-0">
                    <Image
                      unoptimized
                      src={user.avatar || user.ProfileImg || "/kuku-suit 2.png"}
                      width={50}
                      height={50}
                      className="w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-gray-200"
                      alt={user.name || user.username}
                    />
                  </div>

                  {/* User Info - responsive text sizes and spacing */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-2">
                      {/* Uncomment if you want to show name */}
                      {/* <h3 className="font-semibold text-black truncate text-sm sm:text-base lg:text-lg">
                        {user.name}
                      </h3> */}
                      {user.verified && (
                        <Image
                          src="/verified.svg"
                          width={16}
                          height={16}
                          alt="Verified"
                          className="flex-shrink-0 w-4 h-4 sm:w-4 sm:h-4"
                        />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-sm lg:text-base truncate font-medium">
                      @{user.username}
                    </p>
                    {user.location && (
                      <p className="text-gray-400 text-xs sm:text-sm truncate mt-1 sm:mt-1">
                        {user.location}
                      </p>
                    )}
                  </div>

                  {/* Rating - responsive sizes */}
                  {user.rating > 0 && (
                    <div className="flex items-center gap-1 text-sm sm:text-sm text-gray-600 flex-shrink-0">
                      <span className="font-medium">{user.rating}</span>
                      <Image
                        src="/rating.svg"
                        width={14}
                        height={14}
                        alt="Rating"
                        className="w-4 h-4 sm:w-4 sm:h-4"
                      />
                    </div>
                  )}

                  {/* Arrow Icon - responsive sizes */}
                  <div className="flex-shrink-0 text-gray-300 text-base sm:text-base lg:text-lg">
                    →
                  </div>
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