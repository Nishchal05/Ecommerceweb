"use client"
import { useState,useContext,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserInfoContext from '../_component/context/userdata';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const [datainfo,setdatainfo]=useState(null);
  const {userdata, setUserdata} = useContext(UserInfoContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (datainfo) {
      localStorage.setItem("userdata", JSON.stringify(datainfo));
    }
  }, [datainfo]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await fetch('/api/login', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
    
          if (response.ok) {
            setdatainfo(data.user);
            setUserdata(data.user)
            alert('Login successful!');
            router.push('/');
          } else {
            const errorData = await response.json();
            alert(errorData.message);
          }
    }catch(error){
        alert(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Log in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full text-black mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full text-black mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/Signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
