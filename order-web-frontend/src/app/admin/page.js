import { ProductsList } from "@/components/ProductsList";
import { AddProduct } from "@/components/admins/AddProduct";
import { UserOrders } from "@/components/admins/UserOrders";
export default function Admin() {


    return (
        <main className="flex flex-col gap-y-12 py-6 px-2">
            <AddProduct options={{title: 'Добавление продукта'}}/>
            <UserOrders />
        </main>
    )
}