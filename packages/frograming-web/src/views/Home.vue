<template>
  <div class="container">
    <h2>Introduction</h2>

    <p>Welcome to Frogram.</p>

    <p>Frogram is a website aiming to introduce programming in a fun and easy way. You will go through 3 levels of challenges. All you have to do is to guide the frog to the "GOAL".</p>

    <DisplayFrogger />

    <p>
      <router-link tag="button" to="/l/0" class="FirstLevelButton">Go to the first level now!</router-link>
    </p>
  </div>
</template>

<script>
import DisplayFrogger from '@/components/DisplayFrogger.vue';

export default {
  name: 'home',
  components: { DisplayFrogger },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

p {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.FirstLevelButton {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
