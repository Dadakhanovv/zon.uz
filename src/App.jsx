import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Snackbar, Alert } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
import bagpack from "./assets/icons/bagpack.svg";
import doczon from "./assets/icons/doczon.svg";
import fo from "./assets/icons/fo.svg";
import add from "./assets/icons/add.svg";
import telegram from "./assets/images/telegram.png";
import youtube from "./assets/images/youtube.png";
import instagram from "./assets/images/instagram.png";
import facebook from "./assets/images/facebook.png";
import payme from "./assets/images/payme.png";
import click from "./assets/images/click.png";

const App = () => {
  const [slides, setSlides] = useState([]);
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://681a024d1ac1155635076b12.mockapi.io/SwiperProject/slides")
      .then((response) => setSlides(response.data))
      .catch((error) => console.error("Xatolik:", error));

    axios
      .get("https://681a024d1ac1155635076b12.mockapi.io/SwiperProject/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Xatolik:", error));

    axios
      .get("https://681b1ee517018fe5057a219f.mockapi.io/project/project")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Xatolik:", error));

    const storedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(storedLikes);

    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleLike = (id) => {
    let updatedLikes;
    if (likedProducts.includes(id)) {
      updatedLikes = likedProducts.filter((pid) => pid !== id);
    } else {
      updatedLikes = [...likedProducts, id];
    }
    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
  };

  const handleAddToCart = (product) => {
    let updatedCart = [...cartItems];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // agar oldin qo‘shilgan bo‘lsa sonini oshiramiz
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // yangi product bo‘lsa 1 ta qilib qo‘shamiz
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setOpenSnackbar(true);
  };

  const goToLikedPage = () => {
    navigate("/liked", { state: { likedProducts } });
  };

  return (
    <div className="px-8 py-3">
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
        <a href="http://localhost:5173/">
          <img src={logo} alt="logo" />
        </a>
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
            <button onClick={goToLikedPage}>
              <img src={heart} alt="heart" />
            </button>
            {likedProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {likedProducts.length}
              </span>
            )}
          </div>
          <img src={sth} alt="something" />
          <button className=" font-medium  border-2 py-[11px] px-[23px] rounded-md bg-[#5D78FF] text-white hover:bg-white hover:border-[#5D78FF] hover:text-[#5D78FF] transition duration-300 ease-in-out ">
            Войти
          </button>
        </div>
      </div>
      {/* Swiper Section */}
      <Box className="w-full max-w-[1400px] mx-auto my-8 relative rounded-xl overflow-hidden shadow-lg">
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="rounded-2xl"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-[450px] object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {/* items Section */}
      <div className="flex flex-wrap justify-between">
        <div className=" w-[266px] h-[200px]  bg-[#EEEEEE] rounded-md text-center py-[20px] ">
          <h1 className=" font-bold text-[18px] mb-[9px] ">
            Добро пожаловать!
          </h1>
          <p className=" font-normal text-[14px] mb-[9px] ">
            Войдите, чтобы оставлять отзывы и пользоваться другими функциями
            авторизованных пользователей.
          </p>
          <button className=" text-white font-medium text-[15px] py-[11px] px-[20px] bg-[#5D78FF] rounded-md hover:bg-[#EEEEEE] hover:text-[#5D78FF] transition duration-300 ease-in-out ">
            Войти в личный кабинет
          </button>
        </div>

        <div className=" w-[266px] h-[200px]  bg-[#D1DAE6] flex flex-wrap justify-between items-center px-[35px] rounded-md ">
          <h1 className=" text-[#6682A9] font-bold text-[18px] text-center ">
            Покупать как <br /> юрлицо
          </h1>
          <img src={bagpack} alt="bagpack" />
        </div>

        <div className=" w-[266px] h-[200px] rounded-md bg-[#DBE1FF] text-center py-[28px] px-[37px] ">
          <img className="p-[16px]" src={doczon} alt="doczon" />
          <p className=" font-bold text-[18px] text-[#011C47] ">
            Электронный <br /> документооборот
          </p>
        </div>

        <div className=" w-[266px] h-[200px] rounded-md bg-gradient-to-b from-purple-500 to-pink-500 text-center py-[28px] px-[37px] ">
          <img className="p-[16px]" src={fo} alt="doczon" />
          <p className=" font-bold text-[18px] text-white ">
            Онлайн меню для <br /> ресторанов и <br /> гостиниц
          </p>
        </div>
      </div>
      {/* Products Section */}
      <div className="w-full max-w-[1400px] mx-auto my-10">
        <h2 className="font-bold text-[24px] text-[#011C47] mb-5">
          Популярные
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer relative"
            >
              <Tooltip
                title={
                  likedProducts.includes(product.id)
                    ? "Удалить из избранного"
                    : "Добавить в избранное"
                }
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(product.id);
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: likedProducts.includes(product.id) ? "red" : "gray",
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                >
                  {likedProducts.includes(product.id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Tooltip>

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
              <button
                onClick={() => handleAddToCart(product)}
                className=" p-[5px] border-2 rounded-full hover:border-cyan-500 transition duration-300 ease-in-out ml-[200px] "
              >
                <img src={add} alt="add-to-card" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // 3 sekunddan keyin yopiladi
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Qayerdan chiqadi
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Mahsulot savatchaga qo‘shildi!
        </Alert>
      </Snackbar>
      {/* bottom side */}
      <div className="w-full max-w-[1400px] mx-auto my-10">
        <div className=" flex flex-wrap gap-[39px] items-center ">
          <h2 className="font-bold text-[24px] text-[#011C47] mb-5">Статьи</h2>
          <button className=" font-medium text-[15px] text-[#1B7DA2] py-[2px] px-[5px] border rounded-2xl mt-[-15px] hover:bg-[#1b7ea23e] ">
            Смотреть все
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[200px] object-cover mb-3 rounded-md"
              />
              {/* Sana */}
              <p className="text-[12px] text-[#6682A9] mb-2">
                {new Date(article.date).toLocaleDateString()}
              </p>
              <h3 className="font-bold text-[18px] text-[#011C47] mb-2">
                {article.title}
              </h3>
              {/* Description */}
              <p className="font-normal text-[14px] text-[#6682A9] line-clamp-3 mb-3">
                {article.description}
              </p>
              {/* Read More */}
              <a href="#" className="text-[#2C6ECB] text-[14px] font-semibold">
                Читать далее →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className=" flex flex-wrap gap-[12px] items-center ">
        <div className=" w-[353px] h-[255px] border rounded-md flex flex-col gap-3 p-7">
          <h1 className=" font-bold text-[18px] text-[#222222] ">Контакты</h1>
          <p className=" font-normal text-[16px] text-[#222222] ">
            <span className=" font-normal text-[16px] text-[#6682A9] mr-2 ">
              Call-центр:
            </span>
            +998-90 947-77-40
          </p>
          <p className=" font-normal text-[16px] text-[#222222] ">
            <span className=" font-normal text-[16px] text-[#6682A9] mr-2 ">
              Эл. почта:
            </span>
            info@zon.uz
          </p>
          <p className="flex flex-col">
            <span className="font-normal text-[16px] text-[#6682A9] ">
              График работы:
            </span>
            <span className="font-normal text-[16px] text-[#222222] ml-4">
              В будние: с 09:00 до 18:00
            </span>
            <span className="font-normal text-[16px] text-[#222222] ml-4">
              Суббота: с 09:00 до 18:00
            </span>
          </p>
        </div>
        <div className=" flex flex-col gap-[20px] items-center">
          <div className=" w-[353px] h-[115px] border rounded-md py-[26px] px-[21px] ">
            <h1 className="font-bold text-[16px] text-[#222222] ">
              Мы в социальных сетях
            </h1>
            <div className=" flex flex-wrap justify-between items-center mt-[11px] ">
              <a href="https://web.telegram.org/k/">
                <img src={telegram} alt="telegram" />
              </a>
              <a href="https://www.youtube.com/">
                <img src={youtube} alt="youtube" />
              </a>
              <a href="https://www.instagram.com/">
                <img src={instagram} alt="instagram" />
              </a>
              <a href="https://www.facebook.com/ ">
                <img src={facebook} alt="facebook" />
              </a>
            </div>
          </div>
          <div className=" w-[353px] h-[115px] border rounded-md p-[21px] flex flex-wrap justify-between ">
            <a href="https://payme.uz/home/main">
              <img src={payme} alt="payme" />
            </a>
            <a href="https://click.uz/ru">
              <img src={click} alt="payme" />
            </a>
            <p className="text-center ml-8 mt-[5px] text-[14px] ">Интренет магазин Zon.uz 2017-2024. <br /> Все права защищены</p>
          </div>
        </div>
        <div className=" w-[353px] h-[255px] border rounded-md "></div>
        <div className=" w-[353px] h-[255px] border rounded-md "></div>
      </div>
    </div>
  );
};

export default App;
