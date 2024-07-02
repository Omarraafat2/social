'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Getuserdata({ onDataFetched }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const headers = {
          token: localStorage.getItem("token"),
        };
        const response = await axios.get('https://linked-posts.routemisr.com/users/profile-data', { headers });
        onDataFetched(response.data); // Pass data to parent component
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Set loading state to false whether successful or not
      }
    }

    fetchUserData();
  }, [onDataFetched]); // Include onDataFetched in the dependency array

  // Since this component is for data fetching only, it doesn't render any UI
  return null;
}
