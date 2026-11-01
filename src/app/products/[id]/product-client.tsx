"use client";

import React, { useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const isFavorited = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAddedAnim(true);
    setTimeout(() => {
      setIsAddedAnim(false);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-4">
        {/* Quantity Controller */}
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 transition shadow-xs cursor-pointer"
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-bold text-gray-900">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 transition shadow-xs cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-[#0B3B3C] hover:bg-[#072828] text-white py-6 rounded-xl font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          {isAddedAnim ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" /> Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-[#FFA000]" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
            </>
          )}
        </Button>

        {/* Wishlist Toggle Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition cursor-pointer ${
            isFavorited
              ? "bg-red-50 border-red-200 text-red-500"
              : "border-gray-200 hover:border-gray-300 text-gray-500 hover:text-red-500 bg-white"
          }`}
          title="Add to Wishlist"
        >
          <Heart className="w-5 h-5" fill={isFavorited ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

