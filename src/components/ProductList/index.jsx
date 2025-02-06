import { useState } from "react";
import { Header, PageLoader } from "components/commons";
import useFuncDebounce from "hooks/useFuncDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import ProductListItem from "./ProductListItem";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";
import routes from "routes";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import withTitle from "utils/withTitle";

const ProductList = () => {
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;

  const [searchKey, setSearchKey] = useState(searchTerm);

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  const history = useHistory();

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

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
                onChange={({ target: { value } }) => {
                  updateQueryParams(value);
                  setSearchKey(value);
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
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default withTitle(ProductList);
