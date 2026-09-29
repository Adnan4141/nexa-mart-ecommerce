"use client";

import React, { useState } from "react";
import { Star, Heart, ShoppingBag, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
  variant?: "light" | "dark";
  showProgressBar?: boolean;
}

export function ProductCard({
  product,
  variant = "light",
  showProgressBar = false,
}: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const isFavorited = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1500);
  };

  return (
    <>
      <div
        className={"group relative rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl " + (
          variant === "dark"
            ? "bg-[#0B3B3C]/50 border border-emerald-800/40 text-white backdrop-blur-xs hover:border-emerald-500/50"
            : "bg-white border border-gray-100 shadow-xs hover:border-gray-200"
        )}
      >
        <div className="flex items-center justify-between z-10">
          {product.badge ? (
            <Badge
              variant={
                product.badge === "Hot"
                  ? "destructive"
                  : product.badge === "Sale"
                  ? "default"
                  : "gold"
              }
              className="text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider"
            >
              {product.badge}
            </Badge>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black shadow-xs transition cursor-pointer"
              title="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={"p-1.5 rounded-full shadow-xs transition cursor-pointer " + (
                isFavorited
                  ? "bg-red-50 text-red-500"
                  : "bg-white/80 hover:bg-white text-gray-500 hover:text-red-500"
              )}
              title="Add to Wishlist"
            >
              <Heart
                className="w-3.5 h-3.5"
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        <div
          onClick={() => setIsQuickViewOpen(true)}
          className="relative w-full aspect-square my-3 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="space-y-1.5">
          {product.brand && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {product.brand}
              </p>
            </div>
          )}

          <h3
            onClick={() => setIsQuickViewOpen(true)}
            className={"text-xs font-semibold line-clamp-2 cursor-pointer hover:text-[#FF9900] transition " + (
              variant === "dark" ? "text-gray-100" : "text-gray-900"
            )}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-[11px] text-amber-500">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={"w-3 h-3 " + (
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-gray-400 font-medium">({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span
              className={"text-base font-extrabold " + (
                variant === "dark" ? "text-emerald-400" : "text-[#0B3B3C]"
              )}
            >
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {showProgressBar && product.soldCount && product.totalStock && (
            <div className="pt-2">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Sold: {product.soldCount}</span>
                <span>Available: {product.totalStock - product.soldCount}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-emerald-950/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#FF9900] h-full rounded-full transition-all duration-500"
                  style={{
                    width: Math.min((product.soldCount / product.totalStock) * 100, 100) + "%",
                  }}
                />
              </div>
            </div>
          )}

          <div className="pt-3">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className={"w-full text-xs font-semibold py-2 transition-all flex items-center justify-center gap-1.5 rounded-lg " + (
                isAddedAnim
                  ? "bg-emerald-600 text-white"
                  : variant === "dark"
                  ? "bg-[#0B3B3C] border border-emerald-500/40 text-white hover:bg-emerald-700"
                  : "bg-[#0B3B3C] text-white hover:bg-[#072828]"
              )}
            >
              {isAddedAnim ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#FF9900]" /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>
              Category: {product.category} | Brand: {product.brand || "NexaMart Genuine"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-2">
            <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-72 object-contain"
              />
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={"w-4 h-4 " + (
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-black text-[#0B3B3C]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <Badge variant="secondary">
                      Save {product.discountPercentage}%
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.description ||
                    "Experience unmatched performance and premium durability with this verified NexaMart product. Covered with official manufacturer warranty and guaranteed safe doorstep shipping."}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <Button
                  onClick={(e) => {
                    handleAddToCart(e);
                    setIsQuickViewOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Add to Shopping Bag
                </Button>
                <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  In Stock & Ready for Same-Day Delivery
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
