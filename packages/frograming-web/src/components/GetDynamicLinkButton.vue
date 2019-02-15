<template>
  <button v-if="!dynamicLink" @click="getLink">
    {{ loading? 'loading...': 'get link' }}
  </button>
  <CopyText v-else :text="dynamicLink" @copy="$emit('copy')" />
</template>

<script>
import CopyText from '@/components/CopyText.vue';

const shortenUrl = async (url) => {
  const endpoint = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      longDynamicLink: `https://frogram.page.link/?link=${url}`,
      suffix: { option: 'SHORT' },
    }),
  });

  const { shortLink } = await res.json();

  return shortLink;
};

export default {
  components: { CopyText },
  props: ['link'],

  data: () => ({
    loading: false,
    dynamicLink: '',
  }),

  methods: {
    async getLink () {
      this.loading = true;
      this.dynamicLink = await shortenUrl(this.link);
      this.loading = false;
    },
  },
};
</script>
