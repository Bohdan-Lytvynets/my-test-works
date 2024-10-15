import { useEffect, useState } from "react";
import Section from "../Section";
import Loader from "../Loader/Loader";

import css from "./Shop.module.css";
import axios from "axios";


const Shop = () => {

    const [products, setProducts] = useState (null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setIsLoading(true);
  
          const { data } = await axios.get(
            `https://dummyjson.com/products/search`
          );
          setProducts(data.products);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

        fetchProducts();
    }, []);


    return (
        <div className={css.shopPage}>
            <Section>
            <h1>Products Catalog</h1>
            <div className={css.searchWrapper}>
                <input className={css.searchImput} type="text" placeholder="Enter keyword to search" />
            </div>
            </Section>
            <Section title="Products list">
            {isLoading && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}
        {error && (
          <p>
            Oops, some error occured &quot;{error}&quot;. Please, try again
            later 🤷‍♂️.
          </p>
        )}
            <ul className={css.list}>
          {products !== null &&
            products.map((item) => {
              return (
                <li key={item.id} className={css.listItem}>
                  <img
                    className={css.itemImg}
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <h3 className={css.itemTitle}>{item.title}</h3>
                  <p className={css.itemDescription}>{item.description}</p>
                  <p className={css.itemDescription}>Rating: {item.rating}</p>
                </li>
              );
            })}
        </ul>
            </Section>
        </div>
    )
}

export default Shop

