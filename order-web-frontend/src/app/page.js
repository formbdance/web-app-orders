'use client'
import { CoffeList } from "@/widgets/CoffeList";
import { Corsine } from "@/entity/Corsine";

export default function Home() {
  

  return (
    <main className="">
      <Corsine />
      <section className="h-screen w-full flex items-center justify-center pb-24 ">
        <div className="flex items-center justify-center flex-col gap-y-6 px-7">
          <div className="flex flex-col items-center gap-1">
          <h2 className="text-4xl font-bold text-center">Заказать <span style={{color:'#FCBB42'}}>кофе</span> <br /> онлайн</h2>
          <p className="text-center text-gray-400 ">
            Соверши заказ в нашем сервисе за считанные минуты
          </p>
          </div>
          <button className="shadow-md shadow-orange-300  text-lg py-3 w-full rounded-full  font-light">Хочу кофе!</button>
        </div>
      </section>
      <CoffeList />
    </main>
  );
}
