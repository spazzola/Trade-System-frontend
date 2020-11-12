<template>
    <div class="price-list-content">

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
        <button class="btn btn-success btn-sm" style="float: left;" @click="getPriceList()">Wyświetl cennik</button>

        <table class="table table-striped" v-if="showTable">
            <thead>
                <tr>
                    <th scope="col">Sortyment</th>
                    <th scope="col">Cena</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" v-bind:key="index">
                    <td scope="row">{{ product.product.product }}</td>
                    <td scope="row">{{ product.price | toCurrency}} zł</td>
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
            products: [],
            showTable: false,
            buyers: this.$store.state.buyers,
            suppliers: this.$store.state.suppliers,
            selectedBuyer: {
                buyer: {
                    id: null
                }
            }
        }
    },
    methods: {
        getPriceList() {
        this.products = []
        axios.get("/buyer/getBuyerProducts", {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.jwt
          },
          params: {
            id: this.selectedBuyer.buyer.id
          }
        }).then(resp => {
          const data = resp.data;
          for (let key in data) {
            const product = data[key];
            product.id = product.id;
            this.products.push(product);
        }})
        this.showTable = true;
      }
    }
}
</script>

<style scoped>
 
 .price-list-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0px 5px 5px 5px;
  margin: 0.5%;
  float: left;
  font-size: 0.9vw;
}

.products-list {
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

table {
  width: 25%;
  margin-top: 5%;
}
</style>