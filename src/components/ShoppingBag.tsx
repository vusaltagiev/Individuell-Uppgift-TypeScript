import React, { useEffect, useState } from "react";
import { CartItem } from "../models";
import * as Icon from 'react-bootstrap-icons';

export interface ShoppingBagProps {
  productList: Array<CartItem>;
}

const ShoppingBag = (props: ShoppingBagProps) => {
  const [cartItems, setCartItems] = useState(props.productList as CartItem[]);

   // Uppdaterar cartItems från localStorage när productList ändras
  useEffect(() => {
    const cartContent = localStorage.getItem('CartContents');
    let list = cartContent ? JSON.parse(cartContent) as Array<CartItem> : [] as Array<CartItem>;
    setCartItems(list);
  }, [props.productList])


  // Tar bort en produkt från korgen och uppdaterar localStorage
  const removeProductFromCart = async (item: CartItem) => {
    const cartContent = await localStorage.getItem('CartContents');
    let list = cartContent ? JSON.parse(cartContent) as Array<CartItem> : [] as Array<CartItem>;
    if (list.length === 1 || list.length === 0) {
      localStorage.removeItem("CartContents");
      setCartItems([] as Array<CartItem>);
    }
    else {
      const tempList = list.filter(function (obj) {
        return obj.id !== item.id;
      });
      setCartItems(tempList);
      localStorage.setItem("CartContents", JSON.stringify(tempList));
    }
  }

  // Returnerar en lista av korgens innehåll
  const getShoppingBagList = () => {
    if (cartItems) {
      const items = cartItems;
      return items.map((cartItem: CartItem) => {
        return (
          <li key={cartItem.id}>
            {cartItem.product.name}
            <span>
              <Icon.XLg onClick={() => removeProductFromCart(cartItem)} className="float-end" />
            </span>
          </li>
        );
      });
    }
  };

  return (
    <div className="row" id="cart">
      <div className="col-md-12">
      </div>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title"><Icon.CartCheck /> Din kundvagn</h5>
          <hr />
          <ul>{cartItems && getShoppingBagList()}</ul>
        </div>
      </div>
    </div>

  );
};

export default ShoppingBag;
