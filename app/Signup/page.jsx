"use client";
import { useState,useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserInfoContext from '../_component/context/userdata';
export default function Signup() {
  const [datainfo,setdatainfo]=useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const {userdata, setUserdata} = useContext(UserInfoContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  if(datainfo){
    localStorage.setItem("userdata", JSON.stringify(datainfo));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data=await response.json();
      if (response.ok) {
        setdatainfo(data.user);
        setUserdata(data.user)
        alert('Signup successful!');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full text-black mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/Login" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
