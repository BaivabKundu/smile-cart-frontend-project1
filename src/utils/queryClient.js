import { QueryClient, QueryCache } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { QUERY_KEYS } from "constants/query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: Infinity,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) =>
      [QUERY_KEYS.COUNTRIES, QUERY_KEYS.STATES].some(key =>
        queryKey.includes(key)
      ),
  },
});

export default queryClient;
