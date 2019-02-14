<template>
  <router-link
    tag="button"
    :to="`/l/${Number($route.params.level) + 1}`">
    Next level
  </router-link>
</template>
