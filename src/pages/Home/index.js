import React, { useEffect } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";

const Home = () => {
  const [featuredProduct, setFeaturedProduct] = React.useState([]);
  const [latestProduct, setLatestProduct] = React.useState([]);
  useEffect(() => {
    getProducts({
      params: {
        limit: 6,
        "filter[is_featured]": true,
      },
    }).then((res) => {
      return setFeaturedProduct(res.data.data.docs);
    });
    getProducts({
      params: {
        limit: 6,
      },
    }).then((res) => {
      return setLatestProduct(res.data.data.docs);
    });
  }, []);

  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featuredProduct.map((value, index) => (
            <ProductItem item={value} />
          ))}
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProduct.map((value, index) => (
            <ProductItem item={value} />
          ))}
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};
export default Home;
