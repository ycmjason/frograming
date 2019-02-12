<template functional>
  <header>
    <section class="description">
      <slot />
    </section>

    <FadeTransition>
      <section v-if="Number(parent.$route.params.level) <= 3 && props.showNext">
        <router-link
            tag="button"
            :to="`/l/${Number(parent.$route.params.level) + 1}`">
          Next level
        </router-link>
      </section>
    </FadeTransition>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;

  .description {
    flex-grow: 1;
  }

  /deep/ h2 {
    margin: 0;
  }
}
</style>
