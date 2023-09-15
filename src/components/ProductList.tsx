import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../AppContext";
import { CartItem, Product } from "../models";
import ShoppingBag from "./ShoppingBag";

// Hämta globala app-kontexten
function ProductList() {
  const context = useContext(appContext);
  const headline = context ? context.headline : "";
  const products = context ? context.products : ([] as Product[]);

   // Lokalt tillstånd för korgens innehåll
  const [shoppingBagList, setShoppingBagList] = useState([] as CartItem[]);


   // Lägg till en produkt till korgen
  const addToCart = async (product: Product) => {
    const list = await getCartList() as Array<CartItem>;
    const item: CartItem = {
      id: list.length + 1,
      product: product
    }
    list.push(item);
    addProductsToLocal(list);
    setShoppingBagList(list);
  }

  // Lägg till produkter till localStorage
  const addProductsToLocal = async (products: CartItem[]) => {
    localStorage.setItem("CartContents", JSON.stringify(products));
    const list = await getCartList();
    setShoppingBagList(list)
  }


  // Hämta korgens innehåll från localStorage
  const getCartList = async () => {
    const cartContent = await localStorage.getItem('CartContents');
    const list = cartContent ? JSON.parse(cartContent) as Array<CartItem> : [] as Array<CartItem>;
    setShoppingBagList(list);
    console.table(shoppingBagList)
    return list;
  }


  useEffect(() => {
    getCartList();
  }, [])

  const getProductList = () => {
    if (products) {
      return products.map((product: Product) => {
        return (
          <div
            className="card my-5 mx-3"
            style={{ width: "35rem" }}
            key={product.id}
          >
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                <strong>Ingredienser: </strong>
                {product.description}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold">{product.price} kr</p>
                <button
                  className="btn btn-primary ml-auto"
                  onClick={() => addToCart(product)}
                >
                  Beställ
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
    return null;
  };

  return (
    <>
      <h1 className="mx-5">{headline}</h1>
      <div className="row">
        <div className="col-8">
          <ul>{getProductList()}</ul>
        </div>
        <div className="col-3">
          <ShoppingBag
            productList={shoppingBagList}
          />
        </div>
        <div className="col-1">

        </div>
      </div>
    </>
  );
}

export default ProductList;
