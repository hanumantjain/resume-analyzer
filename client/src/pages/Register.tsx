import { useState } from 'react';
import { registerUser } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Navbar from '../component/Navbar';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [confirmPassword, setComfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(form.password !== confirmPassword){
      setError("Passwords do not match")
      return
    }
    setError('')
    setLoading(true)
    try {
      await registerUser(form);
      setTimeout(() => {
        setLoading(false)
        navigate('/')
      }, 500)
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
    <Navbar />
    <div className='pt-10'>
      <div className='flex flex-col justify-between items-center gap-6'>
        <h1 className='text-2xl'>Register your account</h1>
        <div className='w-1/3 border p-10 flex flex-col gap-6 rounded bg-gray-50'>
          <div className=''>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-full'>
                  <label>First Name</label>
                  <input 
                    type="text" 
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    className='border p-2 rounded w-full'
                    required />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    className='w-full border p-2 rounded'
                    required />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label>Email address</label>
                <input 
                  type="text" 
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className='border p-2 rounded'
                  required />
              </div>
              <div className='flex flex-col gap-2'>
                <label>Password</label>
                <input 
                  type="password" 
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className='border p-2 rounded' 
                  required />
              </div>
              <div className='flex flex-col gap-2'>
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  onChange={e => setComfirmPassword(e.target.value)}
                  className='border p-2 rounded'
                  required />
              </div>
              {loading && 'Registering...'}
              {error && <p className='text-red-500'>{error}</p>}
              <button type='submit' className='border rounded w-full py-2 cursor-pointer bg-gray-800 text-white'>Register</button>
            </form>
          </div>
          <h1>Or continue with</h1>
          <div className='flex justify-center items-center'>
            <button className='flex justify-center items-center gap-2 border rounded w-full py-2 cursor-pointer'>
               <FcGoogle />
               Google</button>
          </div> 
        </div>
        <h1>Have an account?{' '}
          <Link to='/login' className='underline'>
            Sign in
          </Link>
        </h1>
      </div>
    </div>
    </>
  );
}
