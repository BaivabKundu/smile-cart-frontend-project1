import { useState } from "react";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import ProductListItem from "./ProductListItem";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <div className="flex  flex-col">
        <div className="flex h-full flex-col">
          <Header
            shouldShowBackButton={false}
            title="Smile cart"
            actionBlock={
              <Input
                placeholder="Search products"
                prefix={<Search />}
                type="search"
                value={searchKey}
                onChange={event => {
                  setSearchKey(event.target.value);
                  setCurrentPage(DEFAULT_PAGE_INDEX);
                }}
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
      <div className="my-5 flex justify-center">
        <Pagination
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default ProductList;
