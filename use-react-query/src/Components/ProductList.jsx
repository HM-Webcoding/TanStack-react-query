import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const ProductList = ({ onDetailsId }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const retriveProducts = async ({ queryKey }) => {
    const response = await axios.get(
      `http://localhost:3000/${queryKey[0]}?_page=${queryKey[1].page}&_per_page=6`
    );
    return response.data;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retriveProducts,
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center w-3/5">
        <h2 className="text-3xl my-2">Product List</h2>
        <ul className="flex flex-wrap gap-3 justify-center items-center">
          {products.data.map((product) => (
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
              <div className="flex justify-between gap-2">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-red-900 hover:bg-red-700 text-white py-2 px-2 rounded"
                  onClick={() => onDetailsId(product.id)}
                >
                  Show details
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 mt-3">
          <button
            className=" bg-blue-300  text-black py-2 px-2 rounded "
            disabled={!products.prev}
            onClick={() => setPage(products.prev)}
          >
            previous
          </button>
          <button
            className=" bg-blue-300  text-black py-2 px-2 rounded"
            disabled={!products.next}
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
