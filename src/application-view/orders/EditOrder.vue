<template>
    <div class="add-order-content">
       <form>
            <div class="form-group">
                <label>Id wysyłki</label>
                <input type="text" id="id" class="form-control" v-model="orderId"/>

                <button class="btn btn-success btn-sm" @click="getOrder()">Wyszukaj wysyłkę</button>
            </div>
       </form>
       <div v-if="showOrder">
           <div>
                <p> <span>Dodaci list:</span> {{ oldOrder.orderDetails[0].transportNumber }} </p>
                <p> <span>Kupiec: </span> {{ oldOrder.buyer.name }}</p>
                <p> <span>Sortyment:</span> {{ oldOrder.orderDetails[0].product.product}}</p>
                <p> <span>Ilość m3:</span> {{ oldOrder.orderDetails[0].quantity | toCurrency }}</p>
                <p> <span>Kwota kupca:</span> {{ oldOrder.orderDetails[0].buyerSum | toCurrency }}</p>
                <p> <span>Sprzedawca: </span> {{ oldOrder.supplier.name }}</p>
                <p> <span>Kwota sprzedawcy:</span> {{ oldOrder.orderDetails[0].supplierSum |toCurrency }}</p>
           </div>
            <hr>
           <div>
               <form>
                    <label style="margin-top: 0.5%;">Nowy dodaci list</label>
                    <input type="text" class="form-control" v-model="newOrder.newTransportNumber">

                    <label>Nowa ilość m3</label>
                    <input type="number" class="form-control" v-model="newOrder.newQuantity" step="0.01">

                    <label>Nowa cena sprzedaży</label>
                    <input type="number" class="form-control" v-model="newOrder.newBuyerPrice" >

                    <label>Nowa cena wykupu</label>
                    <input type="number" class="form-control" v-model="newOrder.newSupplierPrice">

                    <label>Nowy kupiec</label> <br>
                    <select v-model="newOrder.newBuyer">
                        <option
                            v-bind:value="{id: buyer.id, name: buyer.name}"
                            v-for="buyer in buyers"
                            v-bind:key="buyer.id"
                            > {{ buyer.name }}
                        </option>
                    </select> <br> 

                    <label>Nowy sprzedawca</label> <br>
                    <select v-model="newOrder.newSupplier">
                        <option
                            v-bind:value="{id: supplier.id, name: supplier.name}"
                            v-for="supplier in suppliers"
                            v-bind:key="supplier.id"
                            > {{ supplier.name }}
                        </option>
                    </select> <br>                   
                    <button 
                        class="btn btn-success btn-sm" 
                        style="margin-top: 1%;"
                        @click="updateOrder()"
                        >Edytuj
                    </button>
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
            orderId: null,
            quantity: null,
            buyerSum: null,
            supplierSum: null,
            oldTransportNumber: null,
            product: {
                product: null
            },
            showOrder: false,
            oldOrder: null,
            newOrder: {
                id: null,
                newBuyer: {
                    id: null,
                    name: null
                },
                newSupplier: {
                    id: null,
                    name: null
                },
                newQuantity: null,
                newBuyerPrice: null,
                newSupplierPrice: null,
                oldTransportNumber: null,
                newTransportNumber: null
            },
            buyers: this.$store.state.buyers,
            suppliers: this.$store.state.suppliers,
        }
    },
    methods: {
        getOrder() {
            axios.get('order/getOrderById', {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    orderId: this.orderId
                }
                }).then(resp => {
                    console.log(resp.data)
                    this.oldOrder = resp.data
                    this.oldTransportNumber = resp.data.orderDetails[0].transportNumber
                }).catch((error) => {alert('Nie można edytować tej wysyłki')})
                .finally(this.showOrder = true)
            },
        updateOrder() {
                if (this.newOrder.newTransportNumber == null) {
                this.newOrder.newTransportNumber = this.oldOrder.orderDetails[0].transportNumber
                this.newOrder.oldTransportNumber = this.oldOrder.orderDetails[0].transportNumber
                } else {
                    this.newOrder.oldTransportNumber = this.oldTransportNumber;
                }
                if (this.newOrder.newBuyer.name == null) {
                    this.newOrder.newBuyer.name = this.oldOrder.buyer.name
                    this.newOrder.newBuyer.id = this.oldOrder.buyer.id
                }
                if (this.newOrder.newSupplier.name == null) {
                    this.newOrder.newSupplier.name = this.oldOrder.supplier.name
                    this.newOrder.newSupplier.id = this.oldOrder.supplier.id
                }
                this.newOrder.id = this.oldOrder.id
                axios.put('order/updateOrder', this.newOrder, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.jwt
                    }
                }).then(resp => {
                    if (resp.status == 200) {
                        alert('Zaktualizowano wysyłkę')
                    }
                }).catch((error) => {alert('Nie zaktualizowano wysyłki')})
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
    margin-top: 1%;
}

span {
    font-weight: bolder;
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
