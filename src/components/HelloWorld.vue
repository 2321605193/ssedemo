<template>
    <div class="app-container">
        <div id="result">
            {{ data }}
        </div>
        <div>
            {{ value }}
        </div>
        <div>
            name:{{ value.name || '' }}
        </div>

        <div>
            sse:{{ sse || '' }}
        </div>
    </div>
</template>

<script>
/**
 * 主页面
 */




export default  {
   data () {
     return {
        data: "",
        value: 'value原始值',
        sse: 'sse'
     }
   },

    mounted() {
        let source = new EventSource("http://127.0.0.1:8844/stream", {
            withCredentials: true,
        }); 
        
        //数据接口
        let vm = this;
        source.onmessage = function (event) {
            vm.data += event.data + "\n";
        };

        // setTimeout(()=>{
        //   source.close()
        // }, 10000)

        source.addEventListener('chengValue',  (event) => {
          this.value = JSON.parse(event.data)
        })

        window.sse.addEventListener('sse', (event)=>{
          this.sse = event.data;
        })
    }
}
</script>

<style>
.app-container {
  display:flex;
  justify-content: center;
  align-items: center;
  width: 800px;
}

#result {
  width: 400px;
  white-space: pre-line;

}
</style>



