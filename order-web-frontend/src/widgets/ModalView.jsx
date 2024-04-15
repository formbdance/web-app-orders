"use client";
import { useDispatch, useSelector } from "react-redux";
import { elevateModal } from "@/lib/features/modals/rentSlice";

export const ModalView = () => {
  const modalState = useSelector((state) => state.rentModal);
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        modalState.value ? "flex" : "hidden"
      } absolute w-full h-full top-0 left-0 items-center justify-center`}
    >
      <div
        onClick={() => dispatch(elevateModal())}
        className="fixed bg-black w-full h-full bg-opacity-50"
      />
      <div className="relative z-10 rounded-xl p-3 bg-gray-50">text</div>
    </div>
  );
};
