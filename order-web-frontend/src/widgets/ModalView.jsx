"use client";
import { useDispatch, useSelector } from "react-redux";
import { elevateModal } from "@/lib/features/modals/rentSlice";
import { useEffect, useState } from "react";
import { saveOrder } from "@/lib/features/orders/orderSlice";
import { clearCart } from "@/lib/features/products/cartSlice";
import Image from "next/image";

export const ModalView = () => {
  const modalState = useSelector((state) => state.rentModal);
  const cart = useSelector((state) => state.cart);
  const [fullPrice, setFullPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(cart.products) && cart.products.length > 0) {
      let tempPrice = 0;
      cart.products.map((item) => {
        tempPrice = Number(tempPrice) + Number(item.price) * Number(item.count);
      });
      setFullPrice(tempPrice);
    }
  }, [cart]);

  const handleClearCart = (e) => {
    e.preventDefault();
    setFullPrice(0);
    dispatch(clearCart());
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    if (cart.products.length === 0 || cart.products.length < 0) {
      alert("Пожалуйста добавьте продукты в корзину!");
      return;
    }
    const formData = new FormData();
    formData.append("productsList", JSON.stringify(cart.products));
    formData.append("userOwned", "Admin");
    formData.append("status", "created");
    dispatch(saveOrder({ data: formData }));
    handleClearCart(e);
    dispatch(elevateModal());
  };

  return (
    <div
      className={`${
        modalState.value ? "flex" : "hidden"
      } absolute z-10 w-full h-full top-0 left-0 items-center justify-center`}
    >
      <div
        onClick={() => dispatch(elevateModal())}
        className="fixed bg-black w-full h-full bg-opacity-50"
      />
      <div className="relative z-10 rounded-xl p-3 bg-gray-50 w-full mx-3">
        <div>
          <h4 className="text-lg font-semibold mb-4">Ваш заказ:</h4>
          {Array.isArray(cart.products) && cart.products.length > 0 ? (
            <table className="table-auto w-full">
              <thead className="">
                <tr>
                  <th>id</th>
                  <th>Название</th>
                  <th>Кол-во</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{index}</td>
                      <td>{item.title}</td>
                      <td>{item.count}</td>
                      <td>{item.count * Number(item.price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>Корзина пуста</>
          )}
        </div>
        <div className="flex  mt-4 flex-col items-end ">
          <div className="flex items-center justify-between w-full gap-2">
            <button
              onClick={(e) => handleClearCart(e)}
              className="bg-yellow-400 text-sm  rounded-full w-8 h-8"
            >
              <Image
                src={require("@/UI/ico/trash.png")}
                className="p-1.5"
                alt=""
              />
            </button>
            <div className="flex gap-2 items-center">
              <span className="">
                <span className="font-semibold text-sm">Итого:</span>{" "}
                {fullPrice}
              </span>
              <button
                onClick={(e) => handleSaveOrder(e)}
                className="text-white font-semibold bg-green-500 px-3 text-sm py-2 rounded-md"
              >
                Создать заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
