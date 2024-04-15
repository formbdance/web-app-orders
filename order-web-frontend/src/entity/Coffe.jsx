export const Coffe = (props) => {
  const data = {
    title: props.option.title,
    description: props.option.description,
    price: props.option.price,
  };
  return (
    <div className="w-full">
      <div className="w-full h-28 bg-gray-200 rounded-lg" />
      <div className="flex flex-col w-fit items-start">
        <span className="font-semibold text-sm">{data.title}</span>
        <div className="flex flex-col gap-3">
          <span className="text-xs">{data.description}</span>
          <button className="border border-green-700 w-16 rounded-md py-0.5  text-xs">
            {data.price} р.
          </button>
        </div>
      </div>
    </div>
  );
};
