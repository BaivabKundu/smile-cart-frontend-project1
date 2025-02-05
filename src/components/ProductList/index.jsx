import { useEffect, useState } from "react";

import { Header, PageLoader } from "components/commons";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

import productsApi from "../../apis/products";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({ searchTerm: searchKey });
      setProducts(products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full flex-col justify-between">
        <Header
          shouldShowBackButton={false}
          title="Smile cart"
          actionBlock={
            <Input
              placeholder="Search products"
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={event => setSearchKey(event.target.value)}
            />
          }
        />
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title="No products to show" />
        ) : (
          <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductListItem key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
