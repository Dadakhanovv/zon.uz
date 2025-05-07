import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import NoDataImage from "./assets/icons/no-data.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";


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

const LikedProductsPage = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://681a024d1ac1155635076b12.mockapi.io/SwiperProject/products"
        );

        const allProducts = res.data;

        // localStorage dan like qilingan IDlarni olish (to‘g‘ri key bilan!)
        const likedIds =
          JSON.parse(localStorage.getItem("likedProducts")) || [];

        // IDlarni string ko‘rinishda solishtirish
        const liked = allProducts.filter((product) =>
          likedIds.includes(product.id)
        );
        setLikedProducts(liked);
      } catch (err) {
        console.log("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    const updatedLiked = likedProducts.filter((product) => product.id !== id);
    setLikedProducts(updatedLiked);

    // localStorage dan ham o‘chirish
    const likedIds = JSON.parse(localStorage.getItem("likedProducts")) || [];
    const updatedIds = likedIds.filter((likedId) => likedId !== id);
    localStorage.setItem("likedProducts", JSON.stringify(updatedIds));
  };

  return (
    <Box className="px-8 py-3">
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
          <h3 className="flex flex-wrap gap-2 items-center font-bold text-[15px] ">
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
            <button>
              <img src={cart} alt="cart" />
            </button>
            
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

      {likedProducts.length === 0 ? (
        <Box
          className="flex flex-col items-center justify-center"
          sx={{ minHeight: "300px", textAlign: "center" }}
        >
          <img src={NoDataImage} alt="No Data" className="w-[200px] mb-4" />
          <Typography variant="h6" color="textSecondary">
            Нет избранных товаров
          </Typography>
        </Box>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {likedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[200px] object-contain mb-3"
              />
              <p className="font-normal text-[14px] text-[#011C47] h-[50px] overflow-hidden">
                {product.name}
              </p>
              <p className="font-bold text-[16px] text-[#5D78FF] mt-2">
                {product.price}
              </p>
              <IconButton
                onClick={() => handleDelete(product.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "red",
                  "&:hover": { color: "darkred" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default LikedProductsPage;
