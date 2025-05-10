"use client";

import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UserInfoContext from "./context/userdata";
import { Button } from "@/components/ui/button";
export default function Landingpage() {
  const [productdata, setproductdata] = useState([]);
  const {
    userdata,
    setcartitems,
    cartitems,
    productlist,
    setproductlist,
    searchQuery,
  } = useContext(UserInfoContext);
  const handleproducts = async () => {
    const response = await fetch("/api/product");
    const data = await response.json();
    if (response.ok) {
      setproductdata(data);
      setproductlist(data);
    }
  };

  useEffect(() => {
    handleproducts();
  }, []);

  return (
    <div className="bg-white text-blue-900">
      <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Discover Your Style with{" "}
            <span className="text-blue-600">ShopZone</span>
          </h1>
          <p className="text-lg text-blue-700 mb-6">
            Explore the latest trends and exclusive deals. Quality products at
            unbeatable prices!
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
            Shop Now
          </button>
        </div>
        <Image
          src="/ecommerce.jpeg"
          alt="Featured Product"
          width={500}
          height={400}
          className="rounded-xl"
        />
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
  {productdata
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((product, i) => (
      <div
        key={product.id || i}
        className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
      >
        {/* Image with fixed height and object-cover */}
        <img
          src={product?.imageUrl || `/product-${i + 1}.jpg`}
          alt={product.name || `Product ${i + 1}`}
          className="w-full h-48 object-cover"
        />

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
            <p className="text-blue-700 text-sm mb-3 line-clamp-2">{product.description}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-blue-800 text-base">₹{product.price}</span>

            <Drawer>
              <DrawerTrigger className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm transition">
                Add to Cart
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Product Added to Cart!</DrawerTitle>
                  <DrawerDescription className="flex gap-4 mt-4">
                    <img
                      src={product?.imageUrl || `/product-${i + 1}.jpg`}
                      alt={product.name || `Product ${i + 1}`}
                      width={100}
                      height={80}
                      className="rounded-lg border"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-blue-700">{product.description}</p>
                      <p className="mt-2 font-bold text-blue-800">Price: ₹{product.price}</p>
                    </div>
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button
                    onClick={() => {
                      if (!userdata) {
                        alert("Please login or signup to proceed with purchase.");
                      } else {
                        alert("Order successfully placed");
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                  <DrawerClose>
                    <Button
                      variant="outline"
                      onClick={() => setcartitems(cartitems + 1)}
                    >
                      Continue Shopping
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    ))}
</div>

      </section>
      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-6 text-center text-sm text-blue-600 mt-10">
        © {new Date().getFullYear()} ShopZone. All rights reserved.
      </footer>
    </div>
  );
}
