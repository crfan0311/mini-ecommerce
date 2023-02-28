import React, { useEffect, useState } from "react";
import ProductModal from "../../components/pages/Product/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../../store/auth/action";
import { deleteProduct, fetchProducts } from "../../store/store/action";

const Products = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!user | !token) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="">
      <div className="w-screen min-h-screen pt-40">
        <div className="flex fixed top-0 p-10 w-full items-center justify-end gap-4">
          <a href="/">
            <button className="">Home</button>
          </a>
          <button className="">My cart</button>
          <button className="" onClick={() => dispatch(signOut())}>
            logout
          </button>
        </div>
        <div className="flex items-end mx-10 mb-4">
          <button
            className="inline-flex ml-1 px-4 py-2 text-white bg-blue-500 shadow-sm rounded-md hover:text-gray-900 hover:border-gray-400"
            onClick={() => setVisible(true)}
          >
            Add Product
          </button>
        </div>
        <div className="relative overflow-x-auto mx-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/storage/${product.product_image}`}
                      alt={product.title}
                      className="h-10"
                    />
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        className="inline-flex ml-1 px-4 py-2 text-white bg-blue-500 shadow-sm rounded-md hover:text-gray-900 hover:border-gray-400"
                        onClick={() => {
                          setSelectedProduct(product);
                          setVisible(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="inline-flex ml-1 px-4 py-2 text-white bg-red-500 shadow-sm rounded-md hover:text-gray-900 hover:border-gray-400"
                        onClick={() => {
                          if(window.confirm('Are you sure delete this product?')) {
                            dispatch(deleteProduct(product.id))
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        visible={visible}
        onCloseModal={() => setVisible(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
