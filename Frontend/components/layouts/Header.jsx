import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import { FaUserAlt, FaSearch, FaCartArrowDown } from "react-icons/fa";

const Header = () => {
    return (
        <ReactNavbar 
            burgerColor="pink"
            burgerColorHover="black"
            logoWidth="20vmax"
            logoHeight="10vmax"
            navColor1="rgba(206, 212, 220,0.9)"
            logoHoverSize="10px"
            logoHoverColor="#eb4034"
            link1Text="Home"
            link2Text="Products"
            link3Text="Contact"
            link4Text="About"
            link1Url="/"
            link2Url="/products"
            link3Url="/contact"
            link4Url="/about"
            link1Size="1.3vmax"
            link1Color="rgba(35,35,35,0.8)"
            nav1JustifyContent="flex-end"
            nav2JustifyContent="flex-end"
            nav3JustifyContent="flex-start"
            nav4JustifyContent="flex-start"
            link1ColorHover="#eb4034"
            link2Margin="1vmax"
            link3Margin="0"
            link4Margin="1vmax"
            profileIcon={true}
            ProfileIconElement={FaUserAlt}
            searchIcon={true}
            SearchIconElement={FaSearch}
            cartIcon={true}
            CartIconElement={FaCartArrowDown}
            profileIconColor="rgba(35,35,35,0.8)"
            searchIconColor="rgba(35,35,35,0.8)"
            cartIconColor="rgba(35,35,35,0.8)"
            profileIconColorHover="#eb4034"
            searchIconColorHover="#eb4034"
            cartIconColorHover="#eb4034"
            cartIconMargin="1vmax"
            profileIconSize="2vmax"
            profileIconUrl="/register"
        />
    );
};

export default Header;
