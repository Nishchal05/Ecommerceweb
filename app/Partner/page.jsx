"use client";
import { useState, useEffect, useContext } from "react";
import { CldUploadWidget } from "next-cloudinary";
import UserInfoContext from "../_component/context/userdata";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [storedData, setStoredData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    sellerid: null,
  });

  const { productlist } = useContext(UserInfoContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("userdata") || "{}");
      setStoredData(data);
      if (data.id) {
        setFormData((prev) => ({ ...prev, sellerid: data.id }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to add product");

      const data = await response.json();
      if (data) {
        alert("Product saved");
      }
      setProducts([...products, data]);
      setFormData({ name: "", price: "", description: "", image: "" });
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Sell Your Products
      </h1>

      <form
        onSubmit={addProduct}
        className="max-w-xl mx-auto bg-blue-50 p-6 rounded-lg shadow-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price in rupee"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="space-y-2">
          <label className="block text-left font-semibold text-black">
            Upload Image
          </label>
          <CldUploadWidget
            uploadPreset="alertgroup"
            onSuccess={({ event, info }) => {
              if (event === "success") {
                setFormData((prevData) => ({
                  ...prevData,
                  image: info?.secure_url,
                }));
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={open}
                className="py-2 px-4 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 transition-all duration-200"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Listed Products</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {storedData?.id &&
    productlist
      .filter((val) => val.sellerid === storedData.id)
      .map((product) => (
        <div
          key={product.id}
          className="group w-72 h-96 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition
                     hover:-translate-y-1 hover:scale-[1.02] duration-300 overflow-hidden mx-auto"
        >
          {/* image wrapper keeps aspect ratio */}
          <div className="relative w-full h-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* price ribbon */}
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
              ₹{product.price}
            </span>
          </div>

          {/* content */}
          <div className="p-4 flex flex-col justify-between h-1/2">
            <div>
              <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-blue-700 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      ))}
</div>
      </div>
    </div>
  );
}
