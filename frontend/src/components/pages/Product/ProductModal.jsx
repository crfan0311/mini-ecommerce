import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addProduct, updateProduct } from "../../../store/store/action";

const FormValidationSchema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  price: Yup.string(),
});

const ProductModal = ({ visible, onCloseModal, product }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
    validationSchema: FormValidationSchema,
    onSubmit: (data) => {
      let submitData = new FormData();
      submitData.append("title", data.title);
      submitData.append("description", data.description);
      submitData.append("price", data.price);
      if (ref.current.files[0]) {
        submitData.append("image", ref.current.files[0]);
      }
      if (product) {
        submitData.append("_method", "PUT");
        dispatch(updateProduct(submitData, product.id));
      } else if (ref.current.files[0]) {
        dispatch(addProduct(submitData));
      }
      onCloseModal();
    },
  });

  useEffect(() => {
    if (visible) {
      if (product) {
        formik.setFieldValue("title", product.title);
        formik.setFieldValue("description", product.description);
        formik.setFieldValue("price", product.price);
      }
    } else {
      formik.resetForm();
    }
  }, [product, visible]);

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onCloseModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="mb-4">Add New Product</Dialog.Title>
                <form onSubmit={formik.handleSubmit}>
                  <div className="w-full mb-4">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...formik.getFieldProps("title")}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...formik.getFieldProps("description")}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...formik.getFieldProps("price")}
                    />
                  </div>
                  <div className="w-100 mb-4">
                    <label htmlFor="product_image">Product Image</label>
                    <br />
                    <input
                      ref={ref}
                      type="file"
                      id="product_image"
                      name="product_image"
                      accept="image/png, image/jpeg"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="inline-flex ml-1 px-4 py-2 text-white bg-blue-500 shadow-sm rounded-md hover:text-gray-900 hover:border-gray-400"
                    >
                      {product ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
