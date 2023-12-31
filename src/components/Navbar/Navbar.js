import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from ".././../images/logo.svg";
import avatar from "../../images/image-avatar.jpg";
import basket from "../../images/icon-cart.svg";
import remove from "../../images/icon-delete.svg";
import menu from "../../images/icon-menu.svg";
import close from "../../images/icon-close.svg";
import { useBetween } from "use-between";
import {useShareableState} from "../../components/Counter/Counter";
import { useShareableButtonState } from "../AddButton/AddButton";
import { useShareableStateCollection } from "../product/Product";

import { data } from "../ProductText/ProductText";

import OutsideClickHandler from "react-outside-click-handler";





const Navbar = () => {

// sharable states
const { counter, setCounter } = useBetween(useShareableState);
const { addCounter, setAddCounter } = useBetween(useShareableButtonState);
const { collection, setCollection } = useBetween(useShareableStateCollection);

// to open mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((open) => !open);
  };

// show cart
  const [show, setShow] = useState(false);

//close cart on scroll
  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll, true);
        return () => 
       window.removeEventListener("scroll", listenToScroll, true); 
  }, [])
  
  const listenToScroll = () => {
    let heightToHideFrom = 10;
    let winScroll = document.body.scrollTop;
    console.log(winScroll)



    if (winScroll > heightToHideFrom) {  
        show && setShow(true)
        } else {
          setShow(false)
        }
  };



  return (
    
    <nav className="nav">
      <div className="nav__container">
        <div className="logo-icon__container">
        <div className="mobileIcon" onClick={toggle}>
              <img src={isOpen ? close : menu} />
            

          </div>
          <div className="nav__logo">
            <img className="logo__icon" src={logo} />
          </div>

        </div>
        <ul className={`nav__menu ${isOpen ? "is-open" : ""}` }>
          <li className="menu__item">Collections</li>
          <li className="menu__item">Men</li>
          <li className="menu__item">Women</li>
          <li className="menu__item">About</li>
          <li className="menu__item">Contact</li>
        </ul>
      </div>
      {data.map((item, i) => (



                 
        <div  key={i}>
                    <OutsideClickHandler
                  onOutsideClick={() => {
                    setShow(false);
                  }}>
          
          
          <div className="nav__info">
            <div className="basket__content">     
            {addCounter > 0 ? (
              <div className="basket-amount">{addCounter}</div>
            ) : null}
           
            <img
              id="basket"
              src={basket}
              onClick={() => {setShow((prev) => !prev); setIsOpen(false)}}
            />
              </div> 
              <img className="info__avatar" src={avatar} />
          </div>
          
         { show && (
              
              <div className="show-block">
                <p className="cart-name">Cart</p>
                {addCounter > 0 ? (
                  <div className="cart-content">
                    <div className="cart-content-show">
                      <img className="cart-thumbnail" src={collection.value} />
                      <div>
                        <p className="cart-title">{item.title}</p>
                        <p className="cart-price">
                          {item.price} x {addCounter}{" "}
                          <strong style={{ color: "black" }}>
                            ${addCounter * item.price}
                          </strong>
                        </p>
                      </div>
                      <img
                        className="remove"
                        src={remove}
                        onClick={() => setAddCounter(0)}
                      />
                    </div>
                    <button className="cart-checkout" onClick={() => setCounter(0)}>Checkout</button>
                  </div>
                ) : (
                  <p className="empty-cart">Your cart is empty</p>
                )}
                
              </div>
              
          )} 
          </OutsideClickHandler>
        </div>
      ))} 
    </nav>
    
  );
};

export default Navbar;
