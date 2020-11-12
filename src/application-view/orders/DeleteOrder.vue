<template>
    <div class="delete-order-content">
        <form>
            <div class="form-group">
                <label>Id wysyłki</label>
                <input type="text" id="id" class="form-control" v-model="orderId"/>

                <button class="btn btn-success btn-sm" @click="deleteOrder()">Usuń wysyłkę</button>
            </div>
       </form>
    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            orderId: null
        }
    },
    methods: {
        deleteOrder() {
            axios.delete('order/deleteOrder', {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    id: this.orderId
                }
                }).then(resp => {
                    if (resp.status == 200) {
                        alert('Usunięto wysyłkę')
                    }
                }).catch((error) => {alert('Nie można usunąć wysyłki') })
                .finally(this.showOrder = true)
            },
    }
}
</script>

<style scoped>
.delete-order-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0px 5px 5px 5px;
  margin: 0.5%;
  float: left;
}

.form-control {
    width: 13%;
    height: 25px;
}

button {
    opacity: 1;
    font-size: 0.9vw;
    margin-top: 0.5%;
}
</style>