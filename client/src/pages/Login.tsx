import { useState } from 'react';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Navbar from '../component/Navbar';

export default function Login() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await loginUser({ email, password });
      setTimeout(() => {
        setLoading(false)
        navigate('/')
      }, 500)
      setToken(res.data.token);
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || 'Please try again');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`
  }

  return (
    <>
    <Navbar />
    <div className='pt-16'>
      <div className='flex flex-col justify-between items-center gap-6'>
        <h1 className='text-2xl'>Sign in your account</h1>
        <div className='w-1/3 border p-10 flex flex-col gap-6 rounded bg-gray-50'>
          <div className=''>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label>Email address</label>
                <input 
                  type="text" 
                  name=""
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                  className='border p-2 rounded'
                  required />
              </div>
              <div className='flex flex-col gap-2'>
                <label>Password</label>
                <input 
                  type="password" 
                  name=""
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='border p-2 rounded'
                  required />
                  <div className='flex justify-end cursor-pointer'>
                    <p>Forgot password?</p>
                  </div>
              </div>
              {error && <p className='text-red-500'>{error}</p>}
              {loading && 'Signing in...'}
              <button type='submit' className='border rounded w-full py-2 cursor-pointer bg-gray-800 text-white'>Sign in</button>
            </form>
          </div>
          <h1>Or continue with</h1>
          <div className='flex justify-center items-center'>
            <button className='flex justify-center items-center gap-2 border rounded w-full py-2 cursor-pointer'
              onClick={handleGoogleLogin}>
               <FcGoogle />
               Google</button>
          </div> 
        </div>
        <h1>Don't have account?{' '}
          <Link to='/register' className='underline'>
            Register
          </Link>
        </h1>
      </div>
    </div>
    </>
  );
}
