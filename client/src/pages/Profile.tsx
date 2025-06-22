import { useAuth } from '../context/AuthContext';
import { getProfile } from '../api/auth';
import { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState<{ userId: string; firstName: string; email: string } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) return;
        const response = await getProfile(token); 
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <>
    <Navbar />
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!profile && !error && <p>Loading...</p>}
      {profile && (
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Name:</strong> {profile.firstName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}
    </div>
  </>
  );
};

export default Profile;
