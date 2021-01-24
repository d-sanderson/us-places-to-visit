import { request } from "graphql-request";

export function fetcher(query, variables) {
  return request(process.env.NEXT_PUBLIC_GRAPHQL_URI, query, variables);
}
