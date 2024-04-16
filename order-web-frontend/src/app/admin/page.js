"use client"
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "@/lib/features/products/productsSlice";
import { useEffect } from "react";
import { deleteOrder, getOrders } from "@/lib/features/orders/orderSlice";
export default function Admin() {
    const dispatch = useDispatch();
    const ordersState = useSelector((state) => state.orders);
    
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch, ordersState.deleteStatus])


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        e.target.reset()
        dispatch(saveProduct({data: formData}))
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteOrder({data : {_id: e.target.value}}))
    }

    return (
        <main className="flex flex-col gap-y-8 py-6 px-2">
            <h4 className="font-semibold text-lg">Добавление продукта</h4>
            <form onSubmit={(e) => handleSubmit(e)} className="px-6 mt-8 flex flex-col gap-4">
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3"
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z">
                    </path>
                    </svg>
                    Upload Files
                </button>
                <div className="relative h-11 w-full min-w-[200px]">
                    <input placeholder="Введите текст"
                    name="title"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                    <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Название продукта
                    </label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                    <textarea placeholder="Введите текст"
                    name="description"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" ></textarea>
                    <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Описание продукта
                    </label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                    <input placeholder="279"
                    name="price"
                    type="number"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                    <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Цена (руб)
                    </label>
                </div>
                <button
                    className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                >
                    Добавть в меню!
                </button>
            </form>
            <section>
                <h4 className="font-semibold text-lg">Свежие заказы</h4>
                <div>
                    {
                        Array.isArray(ordersState.orders) && ordersState.orders.length > 0 ? 
                        (
                            ordersState.orders.map((item, index) => {
                                return (
                                    <div key={item._id.$oid} >
                                        <span>Заказ номер: {index}</span>
                                        {
                                            Array.isArray(JSON.parse(item.productsList)) && JSON.parse(item.productsList).length > 0 ? 
                                            (
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
                                                    return(
                                                        <tr key={index} className="text-center">
                                                            <td>{index}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.count}</td>
                                                            <td>{item.count * Number(item.price)}</td>
                                                      </tr>
                                                    )
                                                })}
                                                    </tbody>
                                                </table>
                                            
                                            ) : (
                                                <div>Нет записей</div>
                                            )
                                        }
                                        <button onClick={(e) => handleDelete(e)} value={item._id.$oid}>del</button>
                                    </div>
                                )
                            })
                        ) : (
                            <>Ордеров нет</>
                        )
                    }
                </div>
            </section>
        </main>
    )
}