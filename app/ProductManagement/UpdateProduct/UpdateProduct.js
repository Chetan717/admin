import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

import React from "react";
import axios from "axios";

import { toast } from "react-toastify";
import DataSender from "./DataSender";
export default function UpdateProduct({ productId, ProductData, refechData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("5xl");

  const sizes = ["5xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    form: "",
    description: "",
    shipping: "",
    off: "",
    stock: "",
    type: "",
    praman: "",
    main_ingredient: [""],
    Quantity: [""],
    pricelist: [""],
    Advantages: [""],
    review: [""],
    image: [""],
  });

  useEffect(() => {
    const singleProductData = ProductData;
    if (singleProductData) {
      const {
        product_name,
        price,
        form,
        shipping,
        off,
        stock,
        type,
        description,
        praman,
        main_ingredient,
        Quantity,
        pricelist,
        Advantages,
        review,
        image,
      } = singleProductData;

      setProductData({
        product_name,
        price,
        form,
        shipping,
        off,
        stock,
        type,
        description,
        praman,
        main_ingredient: [...main_ingredient],
        Quantity: [...Quantity],
        Advantages: [...Advantages],
        pricelist: [...pricelist],
        review: [...review],
        image: [...image],
      });
    }
  }, [ProductData]);

  const [validationErrors, setValidationErrors] = useState({});

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductData({ ...productData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" }); // Clear validation error on input change
  };

  const handleAdvantageChange = (index, e) => {
    const advantages = [...productData.Advantages];
    advantages[index] = e.target.value;
    setProductData({ ...productData, Advantages: advantages });
  };
  const handleQualityChange = (index, e) => {
    const Quantitys = [...productData.Quantity];
    Quantitys[index] = e.target.value;
    setProductData({ ...productData, Quantity: Quantitys });
  };
  const handlePricelistChange = (index, e) => {
    const pricelists = [...productData.pricelist];
    pricelists[index] = e.target.value;
    setProductData({ ...productData, pricelist: pricelists });
  };
  const handleReviewChange = (index, e) => {
    const reviews = [...productData.review];
    reviews[index] = e.target.value;
    setProductData({ ...productData, review: reviews });
  };

  const handleImageChange = (index, e) => {
    const images = [...productData.image];
    images[index] = e.target.value;
    setProductData({ ...productData, image: images });
  };

  const handleMain_ingredientChange = (index, e) => {
    const ingredient = [...productData.main_ingredient];
    ingredient[index] = e.target.value;
    setProductData({ ...productData, main_ingredient: ingredient });
  };

  const handleAddAdvantage = () => {
    const advantages = [...productData.Advantages, ""];
    setProductData({ ...productData, Advantages: advantages });
  };

  const handleDeleteAdvantage = (index) => {
    const advantages = [...productData.Advantages];
    advantages.splice(index, 1);
    setProductData({ ...productData, Advantages: advantages });
  };

  const handleAddReview = () => {
    const reviews = [...productData.review, ""];
    setProductData({ ...productData, review: reviews });
  };

  const handleDeleteReview = (index) => {
    const reviews = [...productData.review];
    reviews.splice(index, 1);
    setProductData({ ...productData, review: reviews });
  };

  const handleAddQuantity = () => {
    const Quantitys = [...productData.Quantity, ""];
    setProductData({ ...productData, Quantity: Quantitys });
  };

  const handleDeleteQuantity = (index) => {
    const Quantitys = [...productData.Quantity];
    Quantitys.splice(index, 1);
    setProductData({ ...productData, Quantity: Quantitys });
  };

  const handleAddingred = () => {
    const ingreds = [...productData.main_ingredient, ""];
    setProductData({ ...productData, main_ingredient: ingreds });
  };

  const handleDeleteingred = (index) => {
    const ingreds = [...productData.main_ingredient];
    ingreds.splice(index, 1);
    setProductData({ ...productData, main_ingredient: ingreds });
  };

  const handleAddpricelist = () => {
    const pricelisted = [...productData.pricelist, ""];
    setProductData({ ...productData, pricelist: pricelisted });
  };

  const handleDeletepricelist = (index) => {
    const pricelisted = [...productData.pricelist];
    pricelisted.splice(index, 1);
    setProductData({ ...productData, pricelist: pricelisted });
  };

  const handleAddImage = () => {
    const images = [...productData.image, ""];
    setProductData({ ...productData, image: images });
  };

  const handleDeleteImage = (index) => {
    const images = [...productData.image];
    images.splice(index, 1);
    setProductData({ ...productData, image: images });
  };

  const img = [
    { value: "Air Conditioner", name: "Air Conditioner" },
    { value: "Laptops", name: "Laptops" },
    { value: "Televisions", name: "Televisions" },
    { value: "Camera", name: "Camera" },
    { value: "Earbuds", name: "Earbuds" },
    { value: "Printer", name: "Printer" },
    { value: "Personal Care", name: "Personal Care" },
    { value: "Home Appliances", name: "Home Appliances" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button
            size="sm"
            className="text-black font-semibold"
            key={size}
            onPress={() => handleOpen(size)}
          >
            Edit
          </Button>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        scrollBehavior={`outside`}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Product !
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="grid grid-cols-3 gap-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="product_name"
                      >
                        Product Name:
                      </label>
                      <input
                        id="product_name"
                        onChange={handleOnChange}
                        name="product_name"
                        value={productData?.product_name}
                        maxLength="35"
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                      {/* {validationErrors.product_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.product_name}
                        </p>
                      )} */}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                      >
                        Price:
                      </label>
                      <input
                        id="price"
                        onChange={handleOnChange}
                        name="price"
                        value={productData?.price}
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                      {/* {validationErrors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.price}
                        </p>
                      )} */}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                      >
                        Shipping Charge:
                      </label>
                      <input
                        id="shipping"
                        onChange={handleOnChange}
                        name="shipping"
                        value={productData?.shipping}
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                      {/* {validationErrors?.shipping && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors?.shipping}
                        </p>
                      )} */}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                      >
                        Off/Discount:
                      </label>
                      <input
                        id="off"
                        onChange={handleOnChange}
                        name="off"
                        value={productData?.off}
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                      {/* {validationErrors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.off}
                        </p>
                      )} */}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="form"
                      >
                        Form of Product:
                      </label>
                      <select
                        id="form"
                        onChange={handleOnChange}
                        name="form"
                        value={productData.form}
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      >
                        <option value="">Select Form</option>
                        <option value="solid">solid</option>
                        <option value="liquid">liquid</option>
                      </select>
                      {/* {validationErrors.form && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.form}
                        </p>
                      )} */}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        onChange={handleOnChange}
                        name="description"
                        value={productData?.description}
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                      {/* {validationErrors.description && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.description}
                        </p>
                      )} */}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="type"
                      >
                        Type of Product :
                      </label>
                      <select
                        id="type"
                        onChange={handleOnChange}
                        name="type"
                        value={productData.type}
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      >
                        <option value="">Select Type</option>
                        {img?.map((i) => {
                          return (
                            <>
                              <option value={i?.value}>{i?.name}</option>
                            </>
                          );
                        })}
                      </select>

                      {validationErrors.type && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="stock"
                      >
                        Available stock :
                      </label>
                      <input
                        id="stock"
                        onChange={handleOnChange}
                        name="stock"
                        value={productData.stock}
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                      {/* {validationErrors.stock && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors.stock}
                        </p>
                      )} */}
                    </div>
{/* 
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="praman"
                      >
                        Praman:
                      </label>
                      <input
                        id="praman"
                        onChange={handleOnChange}
                        name="praman"
                        value={productData?.praman}
                        autoComplete="off"
                        className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                      />
                   
                    </div> */}
                  </div>
                  {/* 
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Quantity"
                >
                  Quantity:
                </label>
                <input
                  id="Quantity"
                  onChange={handleOnChange}
                  name="Quantity"
                  value={productData.Quantity}
                  autoComplete="off"
                  className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500 peer"
                />
                {validationErrors.Quantity && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.Quantity}
                  </p>
                )}
              </div> */}
                  <div className="grid grid-cols-3 gap-6 bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4">
                    {/* <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Add ingredients:
                      </label>
                      {productData.main_ingredient.map((itm, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            onChange={(e) =>
                              handleMain_ingredientChange(index, e)
                            }
                            value={itm}
                            maxLength={100}
                            type="text"
                            autoComplete="off"
                            className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleDeleteingred(index)}
                            className="btn bg-black hover:bg-red-400 btn-sm ml-2"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        onClick={handleAddingred}
                        className="btn bg-black text-white font-semibold hover:bg-black btn-sm"
                      >
                        Add +
                      </Button>
                    </div> */}

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Quantity :
                      </label>
                      {productData?.Quantity?.map((Quantity, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            onChange={(e) => handleQualityChange(index, e)}
                            value={Quantity}
                            maxLength="100"
                            autoComplete="off"
                            className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleDeleteQuantity(index)}
                            className="btn bg-black hover:bg-red-400 btn-sm ml-2"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        onClick={handleAddQuantity}
                        className="btn bg-black text-white font-semibold hover:bg-black btn-sm"
                      >
                        Add +
                      </Button>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        price according to quantity (₹):
                      </label>
                      {productData?.pricelist?.map((pricelist, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            onChange={(e) => handlePricelistChange(index, e)}
                            value={pricelist}
                            maxLength="100"
                            autoComplete="off"
                            className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleDeletepricelist(index)}
                            className="btn bg-black hover:bg-red-400 btn-sm ml-2"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        onClick={handleAddpricelist}
                        className="btn bg-black text-white font-semibold hover:bg-black btn-sm"
                      >
                        Add +
                      </Button>
                    </div>
{/* 
                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Advantages:
                      </label>
                      {productData?.Advantages?.map((advantage, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            onChange={(e) => handleAdvantageChange(index, e)}
                            value={advantage}
                            maxLength="100"
                            autoComplete="off"
                            className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleDeleteAdvantage(index)}
                            className="btn bg-black hover:bg-red-400 btn-sm ml-2"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        onClick={handleAddAdvantage}
                        className="btn bg-black text-white font-semibold hover:bg-black btn-sm"
                      >
                        Add +
                      </Button>
                    </div> */}

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Reviews:
                      </label>
                      {productData?.review?.map((review, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            onChange={(e) => handleReviewChange(index, e)}
                            value={review}
                            maxLength="100"
                            autoComplete="off"
                            className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleDeleteReview(index)}
                            className="btn bg-black hover:bg-red-400 btn-sm ml-2"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        onClick={handleAddReview}
                        className="btn bg-black text-white font-semibold hover:bg-black btn-sm"
                      >
                        Add +
                      </Button>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Images:
                      </label>
                      {productData?.image?.map((image, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            onChange={(e) => handleImageChange(index, e)}
                            value={image}
                            maxLength=""
                            autoComplete="off"
                            className="block py-2.5  w-full text-sm text-black font-bold bg-transparent rounded-lg border-2 p-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:border-red-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleDeleteImage(index)}
                            className="btn bg-black hover:bg-red-400 btn-sm ml-2"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        onClick={handleAddImage}
                        className="btn bg-black text-white font-semibold hover:bg-black btn-sm"
                      >
                        Add +
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => DataSender(productData, productId, refechData)}
                  className=" bg-black hover:bg-black text-white font-semibold "
                >
                  Update Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
