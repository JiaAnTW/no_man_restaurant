<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  font-size: 4px;
  font-size: 1vw;
  font-family: Arial, Helvetica, sans-serif;
}

@media (min-width: 596px){
  html {
  font-size: 6px;
  font-size: 1.2vw;
}
}
</style>
