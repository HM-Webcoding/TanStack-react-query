import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retriveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

const ProductDetails = ({ id }) => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retriveProduct,
  });

  if (isLoading) return <div>Fetching Product Details...</div>;
  if (error) return <div>An Error Occured: {error.message}</div>;

  return (
    <div className="w-1/5">
      <h1 className="text-3xl my-2">Product Details</h1>
      <div className="border bg-gray-100 p-5 text-md rounded flex flex-col">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-24 w-24 border rounded-full m-auto"
        />
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {product.title}
        </p>
        <span>Descriptions:</span>
        <p className="font-normal text-gray-700 ">{product.description}</p>
        <div className="flex justify-between">
          <p className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            Pricce: USD {product.price}
          </p>
          <p className="px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-blue-800">
            Rating: {product.rating}/5
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
