<template>
    <div class="dish">
    </div>
</template>

<script>
export default {
  name: 'Dish',
  components: {},//也要把你做的Component在這註冊
  data () {
    return {

    }
  },
  methods:{

  }
}
</script>
<style scoped>
    .dish{
        background-image: url('../assets/burger.jpg');
        background-position:50% 50%;
        background-size:  auto 130%;
    }

    .open-btn{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0);
        border: none;
        outline: none;
    }
</style>

