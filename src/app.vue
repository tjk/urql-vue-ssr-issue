<template lang="pug">
#app
  RouterView(v-slot="{ Component }")
    Suspense
      component(:is="Component")
</template>

<script>
export default {
  name: "App",
}
</script>
