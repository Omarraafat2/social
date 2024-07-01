'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Getuserdata({ onDataFetched }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const headers = {
          token: localStorage.getItem("token"),
        };
        const response = await axios.get('https://linked-posts.routemisr.com/users/profile-data', { headers });
        setUserData(response.data); // Set user data state
        setLoading(false); // Set loading state to false
        onDataFetched(response.data); // Pass data to parent component
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false); // Set loading state to false on error
      }
    }

    fetchUserData();
  }, []); // Run once on component mount

  // This component does not render any UI directly, it just fetches data
  return null;
}
