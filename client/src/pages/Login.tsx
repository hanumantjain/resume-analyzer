import { useState } from 'react';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await loginUser({ email, password });
      setToken(res.data.token);
      setTimeout(() => {
        setLoading(false)
        navigate('/')
      }, 1000)
      
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || 'Please try again');
    }
  };

  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-between items-center text-lg gap-10'>
        <h1 className='text-2xl'>Sign in your account</h1>
        <div className='w-1/3 border p-14 flex flex-col gap-8 rounded'>
          <div className=''>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
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
              </div>
              <div className='flex justify-end'>
                <p>Forgot password?</p>
              </div>
              {error && <p className='text-red-500'>{error}</p>}
              {loading && 'Signing in...'}
              <button type='submit' className='border rounded w-full py-2'>Sign in</button>
            </form>
          </div>
          <h1>Or continue with</h1>
          <div className='flex justify-center items-center'>
            <button className='flex justify-center items-center gap-2 border rounded w-full py-2'>
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
  );
}
