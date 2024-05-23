<template>
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="email" class="form-control" id="inputEmail" v-model="email" placeholder="Unesite email">
  </div>
</template>


<script>
export default {
  name: 'EmailInput',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>