<template>
  <div id="app">
    <header>
      <div class="container">
        <router-link tag="h1" to="/">Frogram</router-link>
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
@import url('https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text|Libre+Franklin:300|Roboto');
html {
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-family: 'Libre Barcode 39 Text', cursive;
  font-weight: normal;
}

h2, h3, h4, h5, h6 {
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
}

.container {
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

code {
  white-space: pre-wrap;
  padding: 0 5px;
  background-color: #efefef;
  border: 1px solid #cccccc;
}

code.block {
  padding: 1rem;
}
</style>

<style lang="scss">
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
  cursor: pointer;
  transition: 0.3s background;
  text-transform: uppercase;

  &:hover {
    background: #f6f6f6;
  }
}

input {
  padding: 0.5rem;
}
</style>
