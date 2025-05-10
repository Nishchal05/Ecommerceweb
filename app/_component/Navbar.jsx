"use client";
import { useContext, useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserInfoContext from "./context/userdata";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userdata, setUserdata, cartitems, searchQuery, setSearchQuery } =
    useContext(UserInfoContext);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      setUserdata(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    setUserdata(null);
    router.push("/Login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={()=>{
          router.push('/')
        }}>
          <Image src="/image.png" alt="Logo" width={40} height={40} />
          <span className="text-blue-600 font-bold text-xl">ShopZone</span>
        </div>
        <div className="hidden md:flex space-x-6 text-blue-800 font-medium">
          <a
            href="/"
            className="hover:text-blue-500 hover:border-b-2 font-bold"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-blue-500 hover:border-b-2 font-bold"
          >
            Products
          </a>
          <a
            href="#"
            className="hover:text-blue-500 hover:border-b-2 font-bold"
          >
            Deals
          </a>
          <a
            href="#"
            className="hover:text-blue-500 hover:border-b-2 font-bold"
          >
            Contact
          </a>
        </div>

        {/* Search bar */}
        <div className="hidden md:block w-1/4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <ShoppingCart className="text-blue-800" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartitems != 0 && cartitems}
            </span>
          </div>

          {!userdata ? (
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/Login")}
                className="hidden md:inline-block bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-sm hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/Signup")}
                className="hidden md:inline-block bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-sm hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/Partner")}
                className="hidden md:inline-block bg-blue-600 text-white font-bold px-4 py-1 rounded-full text-sm hover:bg-blue-700"
              >
                Be Partner
              </button>
              <button
                onClick={handleLogout}
                className="hidden md:inline-block bg-red-500 text-white font-bold px-4 py-1 rounded-full text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? (
              <X className="text-blue-800" />
            ) : (
              <Menu className="text-blue-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-50 px-4 py-3 space-y-2 text-blue-800">
          <a href="#" className="block">
            Home
          </a>
          <a href="#" className="block">
            Products
          </a>
          <a href="#" className="block">
            Deals
          </a>
          <a href="#" className="block">
            Contact
          </a>
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-blue-300 px-3 py-1 rounded-full text-sm"
          />
          {!userdata ? (
            <>
              <button
                onClick={() => router.push("/Login")}
                className="w-full bg-blue-600 text-white py-1 rounded-full hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/Signup")}
                className="w-full bg-blue-600 text-white py-1 rounded-full hover:bg-blue-700"
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/Partner")}
                className="w-full bg-blue-600 text-white py-1 rounded-full hover:bg-blue-700"
              >
                Be Partner
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-1 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
