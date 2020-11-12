<template>
    <div class="price-history-content">
        <div class="form-group">
            <label>Wybierz kupca</label> <br>
            <select v-model="selectedBuyer.buyer">
            <option
                v-bind:value="{id: buyer.id, name: buyer.name}"
                v-for="buyer in buyers"
                v-bind:key="buyer.id"
            >{{ buyer.name }}</option>
                </select>
        </div>
        <button class="btn btn-success btn-primary btn-sm" @click="getBuyerPriceHistory()">Wyświetl historię</button>

   
        <table class="table table-striped" v-if="showTable">
                <thead>
                    <tr>
                        <th scope="col">Sortyment</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Kupiec</th>
                        <th scope="col">Sprzedawca</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(priceHistory, index) in pricesHistory" v-bind:key="index">
                        <td scope="row">{{ priceHistory.product.product }}</td>
                        <td scope="row">{{ priceHistory.price | toCurrency }} zł</td>
                        <td scope="row">{{ priceHistory.buyer.name }}</td>
                        <td scope="row">{{ priceHistory.supplier.name }}</td>    
                    </tr>
                </tbody>
        </table>

    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            showTable: false,
            pricesHistory: [],
            buyers: this.$store.state.buyers,
            selectedBuyer: {
                buyer: {
                    id: null
                }
            }
        }
    },
    methods: {
        getBuyerPriceHistory() {
            this.pricesHistory = [];
            axios.get("/price/getBuyerPriceHistory", {
                headers: {
                        'Authorization': 'Bearer ' + this.$store.state.jwt
                    },
                params: {
                    buyerId: this.selectedBuyer.buyer.id
                }}).then(resp => {
                    const data = resp.data;
                    for (let key in data) {
                        const priceHistory = data[key];
                        priceHistory.id = priceHistory.id;
                        this.pricesHistory.push(priceHistory);
                    }
                })
                this.showTable = true;
        }
    }
}
</script>
<style scoped>
.price-history-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0px 5px 5px 5px;
  margin: 0.5%;
  float: left;
  font-size: 0.9vw;
}

.prices-history-list {
    height: 500px;
    overflow: auto;
    overflow-x: auto;
    position: relative;
    float: left;
    padding: 0px;

}

.form-control {
  width: 13%;
  font-size: 0.9vw; 
  height: 25px;

}

.form-group {
  font-size: 0.9vw; 
}

.button, .btn, label {
  font-size: 0.9vw;
}

td {
  white-space: nowrap;
}

table {
    margin-top: 0.5%;
    width: 50%;
}
</style>