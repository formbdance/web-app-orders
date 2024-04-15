"use client";
import { Coffe } from "@/entity/Coffe";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/lib/features/products/productsSlice";
export const ProductsList = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log(productsState);
  }, [productsState.products]);

  const data = {
    title: "caputino",
    description: "Классический капучино из кофейни",
    price: 276,
  };

  return (
    <div className="grid grid-cols-2 px-3 place-items-center gap-6 items-start">
      {productsState.loadError ? (
        <>Ошибка загрузки товаров</>
      ) : Array.isArray(productsState.products) &&
        productsState.products.length < 0 ? (
        <>Список товаров пуст</>
      ) : (
        productsState.products.map((item, index) => {
          return <Coffe option={item} key={index} />;
        })
      )}
    </div>
  );
};
