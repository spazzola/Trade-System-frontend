<template>
    <div class="edit-product-content">
        
        <label>Stara nazwa sortymentu</label>
        <input type="text" id="oldProduct" class="form-control" v-model="oldProduct.product"/>
        <br>
        <label>Nowa nazwa sortymentu</label>
        <input type="text" id="newProduct" class="form-control" v-model="newProduct.product"/>

        <button class="btn btn-success btn-sm" style="margin-top: 10px;" @click="update()">Zmień</button>

    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            oldProduct: {
                product: ''
            },
            newProduct: {
                product: ''
            }
        }
    },
    methods: {
        update() {
            const params = new URLSearchParams();
            params.append("oldProduct", this.oldProduct.product);
            params.append("newProduct", this.newProduct.product);
            axios.put('/product/updateProductName', params, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Zaktualizowano nazwę sortymentu')
                }
            }).catch((error) => {alert('Nie zaktualizowano nazwy sortymentu')})
        }
    }
}
</script>

<style scoped>
.edit-product-content {
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