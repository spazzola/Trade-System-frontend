<template>
    <div class="add-order-content">
       <form>
            <div class="form-group">
                <label>Nr Dodaci listu</label>
                <input type="text" id="id" class="form-control" v-model="oldTransportNumber"/>

                <button class="btn btn-success btn-sm" @click="getOrder()">Wyszukaj wysyłkę</button>
            </div>
       </form>
       <div v-if="showOrder">
           <div>
                <p> <span>Dodaci list:</span> {{ oldTransportNumber }} </p>
                <p> <span>Sortyment:</span> {{ product.product}}</p>
                <p> <span>Ilość m3:</span> {{ quantity | toCurrency }}</p>
                <p> <span>Kwota klienta:</span> {{ buyerSum | toCurrency }}</p>
                <p> <span>Kwota kontrahenta:</span> {{ supplierSum |toCurrency }}</p>
           </div>
            <hr>
           <div>
               <form>
                    <label>Nowy dodaci list</label>
                    <input type="text" class="form-control" v-model="order.newTransportNumber">

                    <label>Nowa ilość m3</label>
                    <input type="number" class="form-control" v-model="order.newQuantity" step="0.01">

                    <label>Nowa cena sprzedaży</label>
                    <input type="number" class="form-control" v-model="order.newBuyerPrice" >

                    <label>Nowa cena wykupu</label>
                    <input type="number" class="form-control" v-model="order.newSupplierPrice">

                    <button class="btn btn-success btn-sm" @click="updateOrder()">Edytuj</button>
               </form>
           </div>
       </div>
    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            quantity: null,
            buyerSum: null,
            supplierSum: null,
            oldTransportNumber: null,
            product: {
                product: null
            },
            showOrder: false,
            order: {
                newQuantity: null,
                newBuyerPrice: null,
                newSupplierPrice: null,
                oldTransportNumber: null,
                newTransportNumber: null
            }
        }
    },
    methods: {
        getOrder() {
            axios.get('order/getOrderByTransportNumber', {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    transportNumber: this.oldTransportNumber
                }
                }).then(resp => {
                    this.quantity = resp.data.quantity;
                    this.buyerSum = resp.data.buyerSum;
                    this.supplierSum = resp.data.supplierSum;
                    this.product.product = resp.data.product.product;
                }).finally(this.showOrder = true)
            },
        updateOrder() {
            
            if (this.order.newBuyerPrice != null && this.order.newSupplierPrice == null) {
                this.updateBuyerOrder();
            }
            else if (this.order.newBuyerPrice == null && this.order.newSupplierPrice != null) {
                this.updateSupplierOrder();
            } else {
                    if (this.order.newTransportNumber == null) {
                    this.order.newTransportNumber = this.oldTransportNumber;
                    } else {
                        this.order.oldTransportNumber = this.oldTransportNumber;
                    }
                    axios.put('order/updateOrder', this.order, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.jwt
                        }
                    }).then(resp => {console.log(resp)})
            }
        },
        updateBuyerOrder() {
            if (this.order.newTransportNumber == null) {
                this.order.newTransportNumber = this.oldTransportNumber;
                this.order.oldTransportNumber = this.oldTransportNumber
            } else {
                this.order.oldTransportNumber = this.oldTransportNumber;
            }
            axios.put('order/updateBuyerOrder', this.order, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {console.log(resp)})
        },
        updateSupplierOrder() {
            if (this.order.newTransportNumber == null) {
                this.order.newTransportNumber = this.oldTransportNumber;
                this.order.oldTransportNumber = this.oldTransportNumber;
            } else {
                this.order.oldTransportNumber = this.oldTransportNumber;
            }
            axios.put('order/updateSupplierOrder', this.order, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {console.log(resp)})
        }
    }
}
</script>

<style scoped>
.add-order-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0px 5px 5px 5px;
  margin: 0.5%;
  float: left;
}

.form-control {
  width: 10%;
  height: 1%;
  font-size: 0.9vw;
}

button {
    opacity: 1;
    font-size: 0.8vw;
}

p, span, label {
    font-size: 0.9vw;
    margin-top: 0.5%;
}

span {
    font-weight: bolder;
}

.form-control {
    width: 150px;
    height: 25px;
}

button {
    opacity: 1;
    font-size: 0.8vw;
    margin-top: 0.5%;
}
</style>
