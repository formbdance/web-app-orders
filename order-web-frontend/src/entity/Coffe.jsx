"use client";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/lib/features/products/cartSlice";
export const Coffe = (props) => {
  const dispatch = useDispatch();
  const data = {
    _id: props.option._id.$oid,
    title: props.option.title,
    description: props.option.description,
    price: props.option.price,
    count: 1,
  };

  const handlePut = (e) => {
    e.preventDefault();
    dispatch(addItem(data));
  };

  return (
    <div className="w-full">
      <div className="w-full h-28 bg-gray-200 rounded-lg" />
      <div className="flex flex-col w-fit items-start">
        <span className="font-semibold text-sm">{data.title}</span>
        <div className="flex flex-col gap-3">
          <span className="text-xs">{data.description}</span>
          <button
            onClick={(e) => handlePut(e)}
            className="border border-green-700 w-16 rounded-md py-0.5  text-xs"
          >
            {data.price} р.
          </button>
        </div>
      </div>
    </div>
  );
};
