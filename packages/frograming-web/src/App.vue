<template>
  <div id="app">
    <header>
      <div class="container">
        <router-link tag="h1" to="/">Frograming</router-link>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="container">Jason Yu &copy; 2019</div>
    </footer>
  </div>
</template>

<style scoped>
h1 {
  cursor: pointer;
}

footer {
  margin-top: 1rem;
  background: #efefef;
  padding-top: 3rem;
  padding-bottom: 2rem;
}
</style>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.code {
  white-space: pre;
  padding: 1rem;
  background-color: #efefef;
  border: 1px solid #cccccc;
}
</style>

<style>
html {
  font-size: 20px;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

*, *::before, *::after {
  box-sizing: inherit;
}

textarea, button, input {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
}

button {
  background: white;
  border: 1px solid black;
  padding: 1rem;
}
</style>
