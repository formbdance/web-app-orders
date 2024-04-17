"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteOrder,
  editOrder,
  getOrders,
} from "@/lib/features/orders/orderSlice";

export const UserOrders = () => {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.orders);
  const [optionsElevate, setOptionsElevate] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, ordersState.deleteStatus, ordersState.editStatus]);

  const handleDelete = (_id) => {
    dispatch(deleteOrder({ data: { _id: _id } }));
  };

  const handleEditStatus = (_id) => {
    dispatch(editOrder({ data: { _id: _id, status: "accepted" } }));
  };

  return (
    <section>
      <h4 className="font-semibold text-lg mb-3">Свежие заказы</h4>
      <div className="flex flex-col gap-3">
        {Array.isArray(ordersState.orders) && ordersState.orders.length > 0 ? (
          ordersState.orders.map((item, index) => {
            return (
              <div
                className={`${
                  item.status === "accepted"
                    ? "bg-green-500"
                    : "custom-color-card"
                } relative text-white p-2 rounded-lg flex flex-col gap-1`}
                onClick={() => setOptionsElevate(!optionsElevate)}
                key={item._id.$oid}
              >
                <span>Заказ номер: #{index}</span>
                {Array.isArray(JSON.parse(item.productsList)) &&
                JSON.parse(item.productsList).length > 0 ? (
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
                      {JSON.parse(item.productsList).map((item, index) => {
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
                  <div>Нет записей</div>
                )}
                <div className="py-1 flex">
                  <div className="text-xs rounded-lg overflow-hidden text-white bg-orange-400 w-full  h-10 grid grid-cols-4 items-center">
                    <button
                      onClick={() => handleEditStatus(item._id.$oid)}
                      className={`${
                        item.status === "accepted"
                          ? "bg-gray-500"
                          : "bg-green-500"
                      } h-full  `}
                      disabled={item.status === "accepted" ? true : false}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => console.log(item)}
                      className="h-full bg-red-500 "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(item._id.$oid)}
                      className=" h-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id.$oid)}
                      className=" bg-red-500 h-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>Ордеров нет</>
        )}
      </div>
    </section>
  );
};
