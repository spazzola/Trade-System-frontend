<template>

    <div class="add-cost-content" style="margin-top: 1%;">
       <label>Nazwa</label>
       <input type="text" id="name" class="form-control" v-model="cost.name">

       <label>Wartość</label>
       <input type="number" id="value" class="form-control" v-model="cost.value" step="0.01"/>

       <label>Data</label>
       <input type="date" id="date" class="form-control" v-model="cost.date">

        <button class="btn btn-success btn-sm" @click="addCost" style="margin-top: 0.5%;">Dodaj koszt</button>

        <button class="btn btn-success btn-sm" @click="deleteCost" style="margin-top: 0.5%;">Usuń koszt</button>

        <button class="btn btn-success btn-sm" @click="getCosts" style="margin-top: 0.5%;">Wyświetl bierzące koszty</button>
       
        <div v-if="showCostsContent">
            <table class="table table-striped" style="width: 30%;">
                  <thead>
                    <tr>
                      <th scope="col">Nazwa</th>
                      <th scope="col">Wartość</th>
                      <th scope="col">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(cost, index) in costs" v-bind:key="index">
                      <td scope="row">{{ cost.name }}</td>
                      <td scope="row">{{ cost.value | toCurrency }}</td>
                      <td scope="row">{{ cost.date }}</td>
                    </tr>
                  </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    data() {
        return {
            showCostsContent: false,
            cost: {
                name: null,
                value: null,
                date: null,
            },
            costs: []
        }
    }, 
    methods: {
        addCost() {
            axios.post('/cost/create', this.cost, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Dodano koszt')
                }
            }).catch((error) => {alert('Nie dodano kosztu')})
        },
        getCosts() {
            this.costs = []
            axios.get("cost/getMonthCosts", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    localDate: this.cost.date,
                }
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                    const cost = data[key];
                    cost.id = cost.id;
                    this.costs.push(cost);
                }
            });
            this.showCostsContent = !this.showCostsContent
        },
        deleteCost() {
            axios.delete("cost/deleteCost", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    name: this.cost.name
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Usunięto koszt')
                }
            }).catch((error) => {alert('Nie usunięto kosztu')})
        }
    }
}
</script>

<style scoped>
.add-cost-content {
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

label, p {
    font-size: 0.9vw;
    margin-top: 1%;
}

input {
    margin-top: -0.5%;
}
</style>