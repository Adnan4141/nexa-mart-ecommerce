"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    totalCartPrice,
    totalCartCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0B3B3C]" />
              <h3 className="text-base font-bold text-gray-900">
                Shopping Cart ({totalCartCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-sm font-semibold text-gray-600">Your cart is empty</p>
                <p className="text-xs text-gray-400">
                  Explore our weekly deals and add some awesome products!
                </p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#0B3B3C] text-white text-xs mt-2"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-100 bg-gray-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs font-extrabold text-[#0B3B3C] mt-0.5">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-lg text-[#0B3B3C] font-black">
                  ${totalCartPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Taxes and shipping calculated at checkout. Free shipping on orders over $50.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    alert("Proceeding to NexaMart Checkout!");
                    setIsCartOpen(false);
                  }}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  variant="outline"
                  className="w-full text-xs"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
