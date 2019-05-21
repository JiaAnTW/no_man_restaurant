<template>
    <div>
        這裡是首頁
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
Vue.prototype.$axios = axios
export default {
  name: 'Home'
}
</script>
