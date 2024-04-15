import { ProductsList } from "@/components/ProductsList";

// виджет отображения списка продуктов
export const CoffeList = () => {
  return (
    <section className=" w-full py-6 bg-gray-50">
      <h3 className="text-2xl text-center font-bold">
        Выбери напиток себе по душе
      </h3>
      <div className="mt-16">
        <ProductsList />
      </div>
    </section>
  );
};
