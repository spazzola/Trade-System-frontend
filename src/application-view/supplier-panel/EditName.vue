<template>
    <div class="edit-name-content">
        <label>Stara nazwa sprzedawcy</label>
        <input type="text" id="oldSupplierName" class="form-control" v-model="oldSupplierName"/>
        <br>
        <label>Nowa nazwa sprzedawcy</label>
        <input type="text" id="newSupplierName" class="form-control" v-model="newSupplierName"/>

        <button class="btn btn-success btn-sm" style="margin-top: 10px;" @click="update()">Zmień</button>
    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            oldSupplierName: null,
            newSupplierName: null
        }
    },
    methods: {
        update() {
            const params = new URLSearchParams();
            params.append("oldSupplierName", this.oldSupplierName);
            params.append("newSupplierName", this.newSupplierName);
            axios.put('/supplier/updateSupplierName', params, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Zaktualizowano nazwę sprzedawcy')
                }
            }).catch((error) => {alert('Nie zaktualizowano nazwy sprzedawcy')})
        }    
    }
}
</script>

<style scoped>

.edit-name-content {
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