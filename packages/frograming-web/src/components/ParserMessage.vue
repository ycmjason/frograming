<template>
  <div
      class="message"
      :class="{ ...msgClass, ...$attrs.class }"
      v-bind="$attrs"
      v-on="$listeners">
    {{ error? error.message: 'Parsed!' }}
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
      default: null,
    },
  },

  computed: {
    msgClass () {
      return {
        ok: !this.error,
        error: !!this.error,
      };
    },
  },
};
</script>

<style scoped>
.error, .ok {
  padding: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.ok {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
</style>
