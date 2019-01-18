<template>
  <div id="app">
    <header>
      <div class="container">
        <h1>Frograming</h1>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="container">Jason Yu &copy; 2019</div>
    </footer>
  </div>
</template>

<style scoped>
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

textarea {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
}
</style>
