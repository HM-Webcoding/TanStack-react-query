import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductList = ({ onDetailsId }) => {
  const retriveProducts = async ({ queryKey }) => {
    const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
    return response.data;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retriveProducts,
  });

  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center w-3/5">
        <h2 className="text-3xl my-2">Product List</h2>
        <ul className="flex flex-wrap gap-3 justify-center items-center">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col p-2 border rounded-sm"
            >
              <img
                className="object-cover h-64 w-72 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />

              <p className="text-xl my-3">{product.title}</p>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onDetailsId(product.id)}
              >
                Show details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
