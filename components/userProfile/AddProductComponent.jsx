"use client";
import { useRouter } from "next/navigation";

export const AddProductComponent = () => {
  const router = useRouter();

  const handleProductAddition = () => {
    router.push("/listingproduct");
  };
  
  return (
    <div className="w-full mb-4">
      <div 
        className="w-[250px] mx-auto py-4 rounded-lg text-center bg-[#e4086f] text-[#fde504]" 
        onClick={handleProductAddition}
      >
        Add New Products
      </div>
    </div>
  );
};
