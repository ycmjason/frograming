<template>
  <div id="app">
    <header>
      <div class="container">
        <h1><router-link to="/">Frogram</router-link></h1>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="container">
        <p>
          <a href="https://www.ycmjason.com" target="blank">Jason Yu</a> &copy; 2019
        </p>
        <p>
          <small>
            Credits to
            <a href="https://community.dur.ac.uk/a.g.stewart/" target="blank">Anthony Stewart</a>
          </small>
        </p>
        <p>
          <small>
            v{{ version }}
          </small>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { version } from '../package.json';

export default {
  data () {
    return { version };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  cursor: pointer;
  a {
    color: inherit;
  }
}

footer {
  margin-top: 1rem;
  background: #efefef;
  padding-top: 3rem;
  padding-bottom: 2rem;

  p {
    max-width: unset;
  }
}
</style>

<style>
/* brand styles */
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

button {
  background: white;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s background;
  text-transform: uppercase;

  &:hover {
    background: #f6f6f6;
  }
}

button.btn-plain {
  padding: 0;
  margin: 0;
  border: 0;
  display: inline;
  text-transform: none;
}

input {
  padding: 0.5rem;
}

textarea, button, input {
  border: 1px solid black;
}
</style>

<style lang="scss">
/* reset stuff */
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

hr {
  margin: 1rem 0;
}
</style>
