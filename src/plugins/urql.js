import fetch from "cross-fetch"
import {
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core"
export { useQuery, useClientHandle } from "@urql/vue"

const isServer = import.meta.env.SSR
const isClient = !isServer

export async function createUrqlClient() {
  const _ssrExchange = ssrExchange({
    isClient,
    initialState: isServer ? undefined : window.__urql__,
  })
  const urqlExchanges = [
    dedupExchange,
    _ssrExchange, // before fetchExchange
    fetchExchange,
  ]
  const client = createClient({
    url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
    requestPolicy: "cache-and-network",
    exchanges: urqlExchanges,
    fetch,
  })
  client._ssrExchange = _ssrExchange

  return client
}
