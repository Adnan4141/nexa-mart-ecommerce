"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCw } from "lucide-react";

interface PopularProductsProps {
  products: Product[];
}

export function PopularProducts({ products }: PopularProductsProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 4, products.length));
      setLoading(false);
    }, 600);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Popular Products
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Hand-picked curated best deals loved and verified by verified shoppers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 rounded-full text-xs font-bold border-gray-300 hover:border-[#0B3B3C] text-gray-700 hover:text-[#0B3B3C] transition shadow-xs cursor-pointer"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ChevronDown className="w-4 h-4 mr-1.5" />
            )}
            Load More Products
          </Button>
        </div>
      )}
    </section>
  );
}
