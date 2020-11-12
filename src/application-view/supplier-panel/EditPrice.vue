<template>

    <div class="edit-price-content">
        <form>
            <div class="form-group">
                <label>Wybierz sprzedawcy</label> <br>
                <select v-model="selectedSupplier.supplier" @change="loadSupplierProducts">
                    <option
                    v-bind:value="{id: supplier.id, name: supplier.name}"
                    v-for="supplier in suppliers"
                    v-bind:key="supplier.id"
                    >{{ supplier.name }}</option>
                </select>
                </div>
                <div class="form-group">
                <label>Wybierz sortyment</label> <br>
                <select v-model="selectedProduct">
                    <option
                    v-bind:value="{name: product.product}"
                    v-for="product in products"
                    v-bind:key="product.id"
                    >{{ product.product.product }} - {{ product.price }}zł</option>
                </select>
                </div>

                <div class="form-group">
                <label>Podaj nową cenę</label>
                <input
                    type="number"
                    value="newPriceValue"
                    v-model="newPriceValue"
                    class="form-control"
                    style="width: 100px; height: 25px;"
                    step="0.01"
                />
            </div>
            <button class="btn btn-success btn-primary btn-sm" @click="updateSupplierPrice">Zmień cenę</button>
      </form>
    </div>

</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            suppliers: this.$store.state.suppliers,
            products: [],
            selectedProduct: {
                product: {
                id: 0
                }
            },
            selectedSupplier: {
                supplier: {
                id: 0
                }
            },
            newPriceValue: null
        }
    },
    methods: {
        updateSupplierPrice() {
            let params = new URLSearchParams();
            params.append("supplierId", this.selectedSupplier.supplier.id);
            params.append("productId", this.selectedProduct.name.id);
            params.append("value", this.newPriceValue);
            axios.put("/price/editSupplierPrice", params, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Zaktualizowano cenę sprzedawcy')
                }
            }).catch((error) => {alert('Nie zaktualizowano ceny dla sprzedawcy')})
            this.newPriceValue = 0;
            this.isEditSupplier = false;
            this.loadSupplierProducts();
        },
        loadSupplierProducts() {
            this.products = [];
            axios.get("/supplier/getSupplierProducts", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    id: this.selectedSupplier.supplier.id
                }
                })
                .then(resp => {
                const data = resp.data;
                for (let key in data) {
                    const product = data[key];
                    product.id = product.id;
                    this.products.push(product);
                }
            });
        }
    }
}
</script>

<style scoped>
.edit-price-content {
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
  font-size: 0.9vw;
}

button {
    opacity: 1;
    display: inline;
    font-size: 0.9vw;
}

label {
    font-size: 0.9vw;
}
</style>