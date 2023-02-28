import React, { useEffect, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/auth/action";
import { fetchProducts } from "../../store/store/action";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.store.products);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const addCartHandler = ((product) => {

  });

  return (
    <div className="w-screen min-h-screen pt-40">
      <div className="flex fixed top-0 p-10 w-full items-center justify-end gap-4">
        {user && token ? (
          <>
            <a href="/products">
              <button className="">My Products</button>
            </a>

            <Popover className="relative">
              <Popover.Button>My Cart</Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
              </Transition>
            </Popover>
            <button className="" onClick={() => dispatch(signOut())}>
              logout
            </button>
          </>
        ) : (
          <a href="/login">
            <button className="">Log In</button>
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto gap-4 px-10">
        {products.map((product) => (
          <div
            className="shadow-xl rounded-md border border-gray-200 flex flex-col"
            key={product.id}
          >
            <div className="flex items-center justify-center px-2 py-10 flex-1">
              <img
                src={`${process.env.REACT_APP_API_URL}/storage/${product.product_image}`}
                alt={product.title}
                className="max-h-40"
              />
            </div>
            <div className="w-full px-4 py-2 border-t border-gray-200 flex-none">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text- text-black font-bold">
                    ${product.price}
                  </div>
                  <div className="text-lg text-gray-600">{product.title}</div>
                </div>
                <button
                  className="inline-flex ml-1 px-4 py-2 text-white bg-blue-500 shadow-sm rounded-md hover:text-gray-900 hover:border-gray-400 text-xs"
                  onClick={() => addCartHandler(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
