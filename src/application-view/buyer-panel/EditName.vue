<template>
    <div class="edit-name-content">
        <label>Stara nazwa kupca</label>
        <input type="text" id="oldBuyerName" class="form-control" v-model="oldBuyerName"/>
        <br>
        <label>Nowa nazwa kupca</label>
        <input type="text" id="newBuyerName" class="form-control" v-model="newBuyerName"/>

        <button class="btn btn-success btn-sm" style="margin-top: 10px;" @click="update()">Zmień</button>
    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            oldBuyerName: null,
            newBuyerName: null
        }
    },
    methods: {
        update() {
            const params = new URLSearchParams();
            params.append("oldBuyerName", this.oldBuyerName);
            params.append("newBuyerName", this.newBuyerName);
            axios.put('/buyer/updateBuyerName', params, {
                headers: {
                    Authorization: "Bearer " + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Zaktualizowano nazwę kupca')
                }
            }).catch((error) => {alert('Nie zaktualizowano nazwy kupca')})
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