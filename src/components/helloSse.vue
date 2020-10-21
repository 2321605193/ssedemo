<template>
  <div>input:{{input}}</div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  mounted () {

     window.sse.addEventListener('input', (event)=>{
          this.input = event.data;
        })
  }
}
</script>

<style>

</style>