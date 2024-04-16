"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { elevateModal } from "@/lib/features/modals/rentSlice";
import { useEffect } from "react";
import { getItem } from "@/lib/features/products/cartSlice";
export const Corsine = () => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  return (
    <div
      onClick={() => dispatch(elevateModal())}
      className="sticky top-0 translate-y-2 translate-x-2 w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-full"
    >
      <div className="absolute font-semibold bg-white text-black flex items-center justify-center top-0 right-0 translate-x-1 -translate-y-1 rounded-full w-5 h-5 text-xs">
        {cartState.products.length}
      </div>
      <Image
        className="w-10 h-10"
        src={require("@/UI/ico/coffee-cup-corsine.png")}
        alt="none"
      />
    </div>
  );
};
