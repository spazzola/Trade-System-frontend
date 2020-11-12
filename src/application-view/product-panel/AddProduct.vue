<template>
    <div class="add-product-content">
        
            <label>Nazwa sortymentu</label>
            <input type="text" id="date" class="form-control" v-model="product.product" />
                
            <button class="btn btn-success btn-sm" style="margin-top: 10px;" @click="create">Dodaj</button>
    
    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return { 
            product: {
                id: null,
                product: ''
            }
        }
    },
    methods: {
        create() {
            axios.post("/product/create", this.product, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
          },
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Dodano sortyment')
                }
            }).catch((error) => {alert('Nie dodano sortymentu')})
            .then(setTimeout(()=>{
                this.product.product = ''
                },100))
        },
    }
}
</script>

<style scoped>
.add-product-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0px 5px 5px 5px;
  margin: 0.5%;
  float: left;
}

.form-control {
  width: 15%;
  height: 25px;
}

label, .btn {
    font-size: 0.9vw;
}
</style>