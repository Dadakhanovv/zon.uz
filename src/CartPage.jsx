import React, { useEffect, useState } from "react";
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";



import loc from "./assets/icons/location.svg";
import handleshake from "./assets/icons/handleshake.svg";
import bag from "./assets/icons/bag.svg";
import help from "./assets/icons/help.svg";
import phone from "./assets/icons/cell-phone.svg";
import logo from "./assets/icons/logo.svg";
import katalog from "./assets/icons/Каталог.svg";
import search from "./assets/icons/search.svg";
import cart from "./assets/icons/cart.svg";
import translate from "./assets/icons/translate.svg";
import heart from "./assets/icons/heart.svg";
import sth from "./assets/icons/sth.svg";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.quantity * parseFloat(item.price.replace(/[^\d.-]/g, "")),
    0
  );

  return (
    <div className="flex flex-wrap gap-5 p-5">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center pb-3">
        <div className="flex flex-wrap gap-[45px] items-center">
          <p className="flex flex-wrap gap-2 items-center  font-normal text-[14px] text-[#C2CDDD] ">
            <img src={loc} alt="location" />
            Город
          </p>
          <a
            className="-ml-9 font-normal underline text-[14px] text-[#5D78FF] "
            href="https://uz.wikipedia.org/wiki/Toshkent"
          >
            Ташкент
          </a>
          <p className="flex flex-wrap gap-2 items-center font-bold text-[14px] text-[#5D78FF] ">
            <img src={handleshake} alt="handleshake" />
            Продавайтена Zon.uz
          </p>
          <p className="flex flex-wrap gap-2 items-center font-normal text-[14px] text-[#6682A9] ">
            <img src={bag} alt="bag" />
            Покупать как юрлицо
          </p>
          <p className="flex flex-wrap gap-2 items-center font-normal text-[14px] text-[#6682A9] ">
            Помощь <img src={help} alt="help" />
          </p>
          <p className=" font-normal text-[14px] text-[#6682A9]">Контакты</p>
        </div>
        <div>
          <h3 className="flex flex-wrap gap-2 items-center font-bold text-[15px] ml-[490px] ">
            <img src={phone} alt="cell-phone" />
            +998-90 947 77 40
          </h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-5 border-y-2 flex flex-wrap gap-5 items-center">
        <a href="http://localhost:5173/"><img src={logo} alt="logo" /></a>
        <button className="flex flex-wrap gap-2 items-center font-bold text-[16px] text-[#011C47] border-2 py-[8px] px-[17px] border-[#011C47] rounded-md hover:bg-[#011c4734] hover:border-white transition duration-300 ease-in-out ">
          <img src={katalog} alt="katalog" />
          Каталог
        </button>
        <div className="flex flex-wrap gap-5 items-center border border-[#6682A9] rounded-md  pl-[13px]">
          <input
            className=" w-[728px] focus:outline-none font-bold text-[15px] "
            type="text"
            placeholder="Найти товары"
          />
          <button className=" bg-[#D1DAE6] py-[10px] px-[14px] rounded-r-[5px] ">
            <img src={search} alt="search" />
          </button>
        </div>
        <div className="flex flex-wrap gap-5 items-center">
          <div className="relative">
            <button onClick={() => navigate("/cart")}>
              <img src={cart} alt="cart" />
            </button>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>

          <p className="flex flex-wrap gap-[10px] items-center font-bold">
            <img src={translate} alt="translate" />
            RU
          </p>
          <div className="relative">
            <button >
              <img src={heart} alt="heart" />
            </button>
            
          </div>
          <img src={sth} alt="something" />
          <button className=" font-medium  border-2 py-[11px] px-[23px] rounded-md bg-[#5D78FF] text-white hover:bg-white hover:border-[#5D78FF] hover:text-[#5D78FF] transition duration-300 ease-in-out ">
            Войти
          </button>
        </div>
      </div>

      {/* Productlar */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cartItems.map((item) => (
          <Card key={item.id} className="p-3">
            <CardContent>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[200px] object-contain mb-3"
              />
              <Typography variant="h6">{item.name}</Typography>
              <Typography color="primary" fontWeight="bold">
                {item.price} x {item.quantity}
              </Typography>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 my-2">
                <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                  <AddIcon />
                </IconButton>
              </div>

              {/* Delete */}
              <IconButton onClick={() => handleDelete(item.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <div className="w-full lg:w-[300px]">
        <Card className="p-5 sticky top-5">
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Итог
            </Typography>
            <Typography variant="h6" mb={2}>
              Общая сумма:{" "}
              {totalPrice.toLocaleString("ru-RU", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              сум
            </Typography>
            <Button variant="contained" fullWidth>
              Оформить заказ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
