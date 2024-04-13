import { Coffe } from "@/entity/Coffe";

export const CoffeList = () => {
  const data = {
    title: "caputino",
    description: "Классический капучино из кофейни",
    price: 276,
  };
  return (
    <section className="h-screen w-full py-6 bg-gray-50">
      <h3 className="text-2xl text-center font-bold">
        Выбери напиток себе по душе
      </h3>
      <div className="mt-16">
        <div className="grid grid-cols-2 place-items-center gap-3 px-3">
          <Coffe option={data} />
        </div>
      </div>
    </section>
  );
};
