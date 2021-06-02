<template lang="pug">
div
  router-link(to="/other") other page
  div(v-for="pokemon in pokemons") {{pokemon.id}} {{pokemon.name}}
</template>

<script>
import { computed } from "vue"
import { useQuery, gql } from "@urql/vue"

const query = gql`query ($skip: Int!) {
  pokemons(limit: 10, skip: $skip) {
    id
    name
  }
}`

export default {
  name: "MainPage",
  async setup() {
    const result = useQuery({
      query,
      variables: { skip: 0 },
    })
    console.log("before await result...")
    await result
    console.log("this doesn't get logged on first page load")
    const pokemons = computed(() => result.data.value && result.data.value.pokemons)
    return {
      pokemons,
    }
  },
}
</script>
