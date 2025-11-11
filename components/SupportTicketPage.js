


'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import {
  FaEnvelope,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaArrowLeft,
  FaExclamationCircle,
  FaSpinner
} from 'react-icons/fa';

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/comp`;

const SupportTicketPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketId = searchParams.get('ticket');

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redirectingToLogin, setRedirectingToLogin] = useState(false);

  // ✅ FIXED: Read from "auth" cookie (matching your Redux authSlice)
  const getToken = () => {
    try {
      const cookie = Cookies.get('auth'); // Changed from 'token' to 'auth'
      if (!cookie) return null;
      
      // Try parsing if it's JSON-wrapped
      try {
        const parsed = JSON.parse(cookie);
        // If it's an object with a token property, return that
        return parsed.token || parsed;
      } catch {
        // If not JSON, return the raw string
        return cookie;
      }
    } catch {
      return null;
    }
  };

  // Decode token to get user email (for security)
  const getUserEmailFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload); // Debug log
      // Try multiple possible email fields
      return payload.email || payload.userEmail || payload.emailOrPhone || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!ticketId) {
      setError('No ticket ID found in URL');
      setLoading(false);
      return;
    }

    const fetchComplaint = async () => {
      const token = getToken();
      
      console.log('Token found:', token ? 'Yes' : 'No'); // Debug log
      
      if (!token) {
        // No token → redirect to login with return URL
        setRedirectingToLogin(true);
        
        // Save current URL in localStorage for return
        localStorage.setItem('loginReturnUrl', `/support?ticket=${ticketId}`);
        
        // Redirect to login
        setTimeout(() => {
          router.push(`/login?returnTo=ticket-${ticketId}`);
        }, 500);
        return;
      }

      try {
        setLoading(true);
        setError('');

        console.log('Fetching ticket with token...'); // Debug log

        const res = await axios.get(`${API_BASE}/user/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const complaint = res.data;

        // Backend already validates user authorization via JWT
        // No need for additional frontend check
        setComplaint(complaint);
      } catch (err) {
        console.error('Fetch error:', err); // Debug log
        
        if (err.response?.status === 401) {
          // Token expired or invalid → clear cookies and redirect to login
          Cookies.remove('auth');
          Cookies.remove('user');
          localStorage.setItem('loginReturnUrl', `/support?ticket=${ticketId}`);
          setRedirectingToLogin(true);
          setTimeout(() => {
            router.push(`/login?returnTo=ticket-${ticketId}`);
          }, 500);
          return;
        }
        
        setError(err.response?.data?.error || 'Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [ticketId, router]);

  // If redirecting to login
  if (redirectingToLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <FaSpinner className="text-6xl text-pink-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Redirecting to Login...</h2>
          <p className="text-gray-600">Please login to view your support ticket</p>
          <p className="text-sm text-gray-500 mt-2">You'll return to your ticket after login</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-pink-600">Loading Your Ticket...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <FaExclamationCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <p className="text-xl font-bold text-red-600 mb-2">Error</p>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700"
          >
            Try Again
          </button>
          <p className="text-sm text-gray-500 mt-2">
            <button
              onClick={() => router.back()}
              className="text-pink-600 hover:underline"
            >
              Go Back
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <FaEnvelope className="text-6xl text-gray-400 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">Ticket Not Found</h2>
          <p className="text-gray-500">The ticket you're looking for doesn't exist</p>
          <button
            onClick={() => router.push('/support')}
            className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700"
          >
            View All Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-t-8 border-pink-600">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-bold text-lg"
            >
              <FaArrowLeft className="text-lg" /> Back to Support
            </button>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {complaint.status === 'pending' ? <FaHourglassHalf className="text-sm" /> : <FaCheckCircle className="text-sm" />}
                {complaint.status.toUpperCase()}
              </span>
              <span className="text-sm text-gray-600">
                {format(new Date(complaint.updatedAt), 'dd MMM yyyy')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                Support Ticket #{complaint._id.slice(-6)}
              </h1>
              <p className="text-lg text-gray-600">
                <span className="font-mono font-bold text-sm">{complaint._id}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Created on {format(new Date(complaint.createdAt), 'dd MMM yyyy, hh:mm a')}
              </p>
            </div>
            {/* <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/support')}
                className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all"
              >
                All My Tickets
              </button>
            </div> */}
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
            <FaEnvelope className="text-2xl" /> Conversation Thread
          </h2>

          {complaint.messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaEnvelope className="text-6xl mx-auto mb-4 opacity-50" />
              <p className="text-lg">No messages in this conversation yet</p>
            </div>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {complaint.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-md p-5 rounded-3xl shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gray-100 text-gray-800 border border-gray-200'
                      : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${
                        msg.sender === 'user' ? 'bg-gray-400' : 'bg-white'
                      }`}></div>
                      <span className="font-bold text-xs opacity-90 uppercase tracking-wide">
                        {msg.sender === 'user' ? 'You' : 'KUKU Support'}
                      </span>
                      <span className="ml-auto text-xs opacity-70">
                        {format(new Date(msg.sentAt), 'hh:mm a')}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Status Message */}
          {complaint.status === 'completed' && (
            <div className="mt-8 p-6 bg-green-50 border-l-8 border-green-500 rounded-r-2xl">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 text-xl" />
                <div>
                  <p className="text-green-800 font-bold">This ticket is closed.</p>
                  <p className="text-green-700 text-sm mt-1">
                    Your issue has been resolved. Need help again? 
                    <a href="/" className="underline hover:no-underline">Submit a new ticket</a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {complaint.status === 'pending' && (
            <div className="mt-8 p-6 bg-yellow-50 border-l-8 border-yellow-500 rounded-r-2xl">
              <div className="flex items-center gap-3">
                <FaHourglassHalf className="text-yellow-500 text-xl animate-pulse" />
                <div>
                  <p className="text-yellow-800 font-bold">We're working on this</p>
                  <p className="text-yellow-700 text-sm mt-1">
                    Our team will reply within 24 hours. You can also reply to our email.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <button
            onClick={() => router.push('/support')}
            className="px-6 py-4 bg-white border-2 border-pink-200 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all flex items-center justify-center gap-2"
          >
            <FaEnvelope className="text-sm" />
            All My Tickets
          </button> */}
          <button
            onClick={() => router.push('/')}
            className="px-6 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
           Go to Home
          </button>
          <a
            href={`mailto:support@letskuku.com?subject=Re: Ticket ${ticketId}&body=Hi KUKU Support,%0D%0A%0D%0ARegarding my ticket ${ticketId}:%0D%0A`}
            className="px-6 py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-bold hover:from-pink-700 hover:to-pink-800 transition-all flex items-center justify-center gap-2"
          >
            <FaEnvelope className="text-sm" />
            Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketPage;