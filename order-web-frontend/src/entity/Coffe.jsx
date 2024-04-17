"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/lib/features/products/cartSlice";
import Image from "next/image";
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
      <Image
        src={`http://localhost:5000/static/images/${data._id}.png`}
        width={524}
        height={524}
        className="rounded-lg"
        alt=""
      />
      <div className="flex flex-col w-fit items-start mt-1">
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
