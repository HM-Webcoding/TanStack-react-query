import { useState } from "react";
import AddProduct from "./Components/AddProduct";
import ProductDetails from "./Components/ProductDetails";
import ProductList from "./Components/ProductList";

function App() {
  const [detailsId, setDetailsId] = useState(null);

  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList onDetailsId={setDetailsId} />
      {detailsId != null && <ProductDetails id={detailsId} />}
    </div>
  );
}

export default App;
