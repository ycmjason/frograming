<template functional>
  <router-link tag="button" :to="`/l/${Number(parent.$route.params.level) + 1}`">
    Next level
  </router-link>
</template>
