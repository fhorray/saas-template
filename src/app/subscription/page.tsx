"use client";

import React from "react";
import { useStripeProducts } from "@/features/stripe/hooks/use-stripe-products";
import { ProductCard } from "@/features/subscription/components/product-card";
import { TSelectProduct } from "@/types/stripe";
import { CheckIcon, ZapIcon } from "lucide-react";

const SubscriptionPage = () => {
  const products = useStripeProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <ZapIcon className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose your plan
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Get started with our flexible pricing plans. All plans include a
            free trial period.
          </p>
        </div>

        {/* Pricing Toggle - Monthly/Annual */}
        <div className="flex justify-center mb-12">
          <div className="relative flex items-center p-1 bg-purple-100 rounded-full">
            <button className="relative w-32 py-2 text-sm font-medium text-purple-900 bg-white rounded-full shadow-sm">
              Monthly
            </button>
            <button className="relative w-32 py-2 text-sm font-medium text-purple-600">
              Annual
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.data?.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            All plans include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Unlimited projects",
              "Priority support",
              "API access",
              "Custom domains",
              "Analytics dashboard",
              "Team collaboration",
            ].map((feature) => (
              <div key={feature} className="flex items-center">
                <CheckIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
