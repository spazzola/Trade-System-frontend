<template>

    <div class="report-panel-content">
        <div>
            <label style="margin-top: 2%;">Wybierz datę</label>
            <input 
            type="date" 
            id="date" 
            class="form-control" 
            v-model="date" 
            style="width: 170px;"
            @change="selectDate"/>
        </div>

        <div v-if="isDateSelected" style="margin-top: 0.5%;">
            <button class="btn btn-success btn-sm" @click="generateMonthReport">Generuj miesięczny raport</button>
            <button class="btn btn-success btn-sm" @click="generateYearReport">Generuj roczny raport</button>
            <button class="btn btn-success btn-sm" @click="getSuppliersMonthTakenQuantity">Wyświetl wykupione m3 na dany miesiąc</button>
            <button class="btn btn-success btn-sm" @click="getBuyersMonthTakenQuantity">Wyświetl sprzedane m3 na dany miesiąc</button>
        </div>

        <button class="btn btn-success btn-sm" style="margin-top: 1%;" @click="showReports()">Wyświetl raporty</button>
        <button class="btn btn-success btn-sm" style="margin-top: 1%;" @click="showEarningsList()">Wyświetl marżę</button>

        <div v-if="showReportsContent">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Raport na</th>
                      <th scope="col">Wartość sprzedanych zamówień</th>
                      <th scope="col">Wartośc kupionych zamówień</th>
                      <th scope="col">Sprzedana ilość (m3)</th>
                      <th scope="col">Sredni zarobek na m3</th>
                      <th scope="col">Suma kosztów</th>
                      <th scope="col">Przychód</th>
                      <th scope="col">Suma niezapłaconych faktur kupców</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(report, index) in reports.slice().reverse()" v-bind:key="index">
                      <td scope="row">{{ translateMonth(report.type) }}</td>
                      <td scope="row">{{ report.soldValue | toCurrency }}</td>
                      <td scope="row">{{ report.boughtValue | toCurrency }}</td>
                      <td scope="row">{{ report.soldQuantity | toCurrency }}</td>
                      <td scope="row">{{ report.averageEarningsPerM3 | toCurrency }}</td>
                      <td scope="row">{{ report.sumCosts | toCurrency }}</td>
                      <td scope="row">{{ report.income | toCurrency }}</td>
                      <td scope="row>">-{{ report.buyersNotPaidInvoices | toCurrency }} </td>
                    </tr>
                  </tbody>
                </table>
        </div>
        <div v-if="showEarningsListContent">
                
            <table class="table table-striped" style="width: 30%;">
                  <thead>
                    <tr>
                      <th scope="col">Kupiec</th>
                      <th scope="col">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(buyer, index) in buyers" v-bind:key="index">
                      <td scope="row">{{ buyer.name }}</td>
                      <td scope="row">{{ buyer.averageProfitPerM3 | toCurrency }}</td>
                    </tr>
                  </tbody>
            </table>
        </div>
            
        <div v-if="showSuppliersMonthTakenQuantityContent">
            <table class="table table-striped" style="width: 100%;">
                  <thead> 
                    <tr>
                      <th scope="col">Sprzedawca</th>
                      <th scope="col">Ilość m3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(supplier, index) in suppliers" v-bind:key="index">
                      <td scope="row">{{ supplier.name }}</td>
                      <td scope="row">{{ supplier.monthTakenQuantity | toCurrency }}</td>
                    </tr>
                  </tbody>
            </table>
        </div>
         <div v-if="showBuyersMonthTakenQuantityContent">
            <table class="table table-striped" style="width: 100%;">
                  <thead> 
                    <tr>
                      <th scope="col">Kupiec</th>
                      <th scope="col">Ilość m3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(buyer, index) in buyers" v-bind:key="index">
                      <td scope="row">{{ buyer.name }}</td>
                      <td scope="row">{{ buyer.monthTakenQuantity | toCurrency }}</td>
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
            date: '',
            reports: [],
            buyers: [],
            suppliers: [],
            isDateSelected: false,
            showReportsContent: false,
            showEarningsListContent: false,
            showSuppliersMonthTakenQuantityContent: false,
            showBuyersMonthTakenQuantityContent: false
        }
    },
    methods: {
        selectDate() {
            this.isDateSelected = true;
        },
        getSuppliersMonthTakenQuantity() {
            this.suppliers = []
            let date = this.getDate();
            const params = new URLSearchParams();
            params.append("localDate", this.date);
            axios.get("/supplier/getSuppliersMonthTakenQuantity", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                const supplier = data[key]
                supplier.id = supplier.id;
                this.suppliers.push(supplier);
                }
            })
            this.showSuppliersMonthTakenQuantityContent = !this.showSuppliersMonthTakenQuantityContent
            this.showEarningsListContent = false
            this.showReportsContent = false
            this.showBuyersMonthTakenQuantityContent = false
        },
        getBuyersMonthTakenQuantity() {
            this.buyers = []
            let date = this.getDate();
            const params = new URLSearchParams();
            params.append("localDate", this.date);
            axios.get("/buyer/getBuyersMonthTakenQuantity", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                const buyer = data[key]
                buyer.id = buyer.id;
                this.buyers.push(buyer);
                }
            })
            this.showBuyersMonthTakenQuantityContent = !this.showBuyersMonthTakenQuantityContent
            this.showSuppliersMonthTakenQuantityContent = false
            this.showEarningsListContent = false
            this.showReportsContent = false
        },
        generateMonthReport() {
            this.reports = [];
            let date = this.getDate();
            const params = new URLSearchParams();
            params.append("localDate", this.date);
            axios.post("/report/generateMonthReport", params, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Wygenerowano miesięczny raport')
                }
            }).catch((error) => {alert('Nie wygenerowano miesięcznego raportu')})
        },
        generateYearReport() {
            let date = this.getDate();
            const params = new URLSearchParams();
            params.append("localDate", this.date);
            axios.post("/report/generateYearReport", params, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Wygenerowano roczny raport')
                }
            }).catch((error) => {alert('Nie wygenerowano rocznego raportu')})
        },
        getDate() {
            let currentDate = new Date();
            let currentDateWithFormat = new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/");

            return currentDateWithFormat;
        },
        showReports() {
            this.reports = [];
            axios.get('report/getAll', {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                const report = data[key]
                report.id = report.id;
                this.reports.push(report);
                }
            })
            this.showReportsContent = !this.showReportsContent;
            this.showEarningsListContent = false;
            this.showSuppliersMonthTakenQuantityContent = false
            this.showBuyersMonthTakenQuantityContent = false
        },
        showEarningsList() {
            this.buyers = [];
            let date = this.getDate();
            const params = new URLSearchParams();
            params.append("localDate", this.date);
            axios.get("/buyer/getAllWithAverageEarnings", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                pa
            }).then(resp => {
            const data = resp.data;
            for (let key in data) {
                const buyer = data[key];
                buyer.id = buyer.id;
                this.buyers.push(buyer);
            }
            });
            this.showEarningsListContent = !this.showEarningsListContent;
            this.showReportsContent = false;
            this.showSuppliersMonthTakenQuantityContent = false
            this.showBuyersMonthTakenQuantityContent = false
        },
        translateMonth(value) {
            if (value == 'JANUARY') {
                return 'Styczeń'
            }
            if (value == 'FEBRUARY') {
                return 'Luty'
            }
            if (value == 'MARCH') {
                return 'Marzec'
            }
            if (value == 'APRIL') {
                return 'Kwiecień'
            }
            if (value == 'MAY') {
                return 'Maj'
            }
            if (value == 'JUNE') {
                return 'Czerwiec'
            }
            if (value == 'JULY') {
                return 'Lipiec'
            }
            if (value == 'AUGUST') {
                return 'Sierpień'
            }
            if (value == 'SEPTEMBER') {
                return 'Wrzesień'
            }
            if (value == 'OCTOBER') {
                return 'Październik'
            }
            if (value == 'NOVEMBER') {
                return 'Listopad'
            }
            if (value == 'DECEMBER') {
                return 'Grudzień'
            }
            else {
                return value
            }
        }
    }
}
</script>

<style scoped>
.report-panel-content {
    font-size: 0.9vw;
    margin: 0.5%;
}

table {
  margin-top: 0.5%;
  width: 2000px;
}

li {
  margin-top: 1%;
  font-size: 0.9vw;
}

</style>