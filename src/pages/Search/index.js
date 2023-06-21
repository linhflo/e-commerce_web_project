import { getProducts } from "../../services/Api";
import Pagination from "../../shared/components/Paginnation";
import ProductItem from "../../shared/components/product-item";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const Search = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({
    limit: 12,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || 1;
  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        page: page,
        limit: 12,
      },
    }).then(({ data }) => {
      setProducts(data.data.docs);
      setPages({
        ...pages,
        ...data.data.pages,
      });
    });
  }, [keyword, page]);
  return (
    <div>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {products?.map((value, index) => (
            <ProductItem item={value} />
          ))}
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </div>
  );
};
export default Search;
