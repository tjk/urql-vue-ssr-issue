<template lang="pug">
#app
  RouterView(v-slot="{ Component }")
    Suspense
      component(:is="Component")
      template(#fallback)
        div Loading...
</template>

<script>
export default {
  name: "App",
}
</script>
