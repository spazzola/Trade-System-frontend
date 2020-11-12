<template>

    <div>
        <spazz-left-menu></spazz-left-menu>
        <spazz-nav-menu></spazz-nav-menu>
        
        <div class="invoices-content">
            <div v-if="isChanged">
                <button class="btn btn-success btn-sm" style="float: left; margin-right: 0.5%;" @click="changeInvoiceContent()">Wstecz</button>
            </div>
            <button class="btn btn-success btn-sm" style="float: left;" @click="changeAddInvoice()">Dodaj fakturę</button>
            <button class="btn btn-success btn-sm" style="float: left; margin-left: 0.5%;" @click="changeEditInvoice()">Edytuj fakturę</button>
            <button class="btn btn-success btn-sm" style="float: left; margin-left: 0.5%;" @click="changePayInvoice()">Zapłać</button>
            
            <div class="invoice-menu">
                <div style="" v-if="!isChanged">
                        <label style="margin-left: 0.5%;">Sortuj według</label>
                        <select
                        v-model="merhantType" 
                        @change="onSelectedMerhant($event)">
                            <option>Wszyscy</option>
                            <option>Kupca</option>
                            <option>Sprzedawcy</option>
                        </select>
                    
                
                    <div v-if="selectedMerhant.buyer" class="merhant-content">
                        <select v-model="selectedBuyer.buyer">
                            <option
                                v-bind:value="{ id: buyer.id, name: buyer.name }"
                                v-for="buyer in buyers"
                                v-bind:key="buyer.id"
                            >{{ buyer.name }}</option>
                        </select>
                    </div>

                    <div v-if="selectedMerhant.supplier" class="merhant-content">
                        <select v-model="selectedSupplier.supplier">
                            <option
                                v-bind:value="{ id: supplier.id, name: supplier.name }"
                                v-for="supplier in suppliers"
                                v-bind:key="supplier.id"
                            >{{ supplier.name }}</option>
                        </select>
                    </div>

                    <select
                        style="margin-left: 1%;"
                        id="year"
                        v-model="selectedYear"
                        @change="onChangeYear($event)"
                        :selected:="year"
                        >
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>

                    <select 
                        style="" 
                        id="month" 
                        v-model="selectedMonth" 
                        @change="onChangeMonth($event)">
                        <option value="01">Styczeń</option>
                        <option value="02">Luty</option>
                        <option value="03">Marzec</option>
                        <option value="04">Kwiecień</option>
                        <option value="05">Maj</option>
                        <option value="06">Czerwiec</option>
                        <option value="07">Lipiec</option>
                        <option value="08">Sierpień</option>
                        <option value="09">Wrzesien</option>
                        <option value="10">Październik</option>
                        <option value="11">Listopad</option>
                        <option value="12">Grudzień</option>
                    </select>
                    <button class="btn btn-success btn-sm" style="margin-top: -0.15%;" @click="sort()">Sortuj</button>

                        <button
                            class="btn btn-success btn-sm"
                            style="margin-top: -0.15%; margin-left: 3%;"
                            @click="transferInvoices"
                        >Przenieś faktury na następny miesiąc</button>
                </div>
            </div>
                
            <table v-if="showInvoiceContent" class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Kupiec</th>
                    <th scope="col">Sprzedawca</th>
                    <th scope="col">Nr FV</th>
                    <th scope="col">Data</th>
                    <th scope="col">Wartość</th>
                    <th scope="col">Wartość do użycia</th>
                    <th scope="col">Użyta</th>
                    <th scope="col">Zaplacona</th>
                    <th scope="col">Komentarz</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(invoice, index) in invoices.slice().reverse()" v-bind:key="index">
                    <td scope="row">{{ invoice.id }}</td>
                    <td scope="row" v-if="invoice.buyer != null">{{invoice.buyer.name}}</td>
                    <td scope="row" v-else>-----------</td>
                    <td scope="row" v-if="invoice.supplier != null">{{invoice.supplier.name}}</td>
                    <td scope="row" v-else>-----------</td>
                    <td scope="row">{{ invoice.invoiceNumber }}</td>
                    <td scope="row">{{ invoice.date }}</td>
                    <td scope="row">{{ invoice.value | toCurrency }}</td>
                    <td scope="row">{{ invoice.amountToUse | toCurrency }}</td>
                    <td scope="row">{{ switchBooleanToString(invoice.used) }}</td>
                    <td
                    scope="row"
                    :style="{color: checkPaid(invoice.paid)}"
                    >{{ switchBooleanToString(invoice.paid) }}</td>
                    <td scope="row">
                    <div style="width: 1000px;">{{invoice.comment}}</div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div v-if="showAddInvoice">
                <spazz-add-invoice></spazz-add-invoice>
            </div>

            <div v-if="showPayInvoice">
                <spazz-pay-invoice></spazz-pay-invoice>
            </div>

            <div v-if="showEditInvoice">
                <spazz-edit-invoice></spazz-edit-invoice>
            </div>
        </div>

    </div>
</template>

<script>
import LeftMenu from '../LeftMenu'
import NavMenu from '../NavMenu'
import AddInvoice from './AddInvoice'
import PayInvoice from './PayInvoice'
import EditInvoice from './EditInvoice'
import axios from '../../axios-auth'

export default {
    components: {
        spazzLeftMenu: LeftMenu,
        spazzNavMenu: NavMenu,
        spazzAddInvoice: AddInvoice,
        spazzPayInvoice: PayInvoice,
        spazzEditInvoice: EditInvoice
    },
    data() {
        return {
            merhantType: "Kupca",
            selectedMerhant: {
                buyer: false,
                supplier: false,
                all: false
            },
            selectedBuyer: {
                buyer: {
                id: null
                }
            },
            selectedSupplier: {
                supplier: {
                id: null
                }
            },
            selectedMonth: this.getMonth(),
            selectedYear: this.getYear(),
            showInvoiceContent: true,
            showAddInvoice: false,
            showPayInvoice: false,
            showEditInvoice: false,
            isChanged: false,
            buyers: this.$store.state.buyers,
            suppliers: this.$store.state.suppliers,
            invoices: [],
            month: "",
            year: "",
        }
    },
    methods: {
        changeAddInvoice() {
            this.showAddInvoice = true
            this.showInvoiceContent = false
            this.showPayInvoice = false
            this.showEditInvoice = false
            this.isChanged = true
        },
        changePayInvoice() {
            this.showPayInvoice = true
            this.showAddInvoice = false
            this.showInvoiceContent = false
            this.showEditInvoice = false
            this.isChanged = true
        },
        changeInvoiceContent() {
            this.showInvoiceContent = true
            this.showPayInvoice = false
            this.showAddInvoice = false
            this.showEditInvoice = false
            this.isChanged = false
        },
        changeEditInvoice() {
            this.showEditInvoice = true
            this.showInvoiceContent = false
            this.showPayInvoice = false
            this.showAddInvoice = false
            this.isChanged = true
        },
        getDate() {
            let currentDate = new Date();
            let currentDateWithFormat = new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/");

            return currentDateWithFormat;
        },
        getMonth() {
            let currentDate = this.getDate();
            return currentDate.slice(5, 7);
        },
        getYear() {
            let currentDate = this.getDate();
            return currentDate.slice(0, 4);
        },
        switchBooleanToString(value) {
            if (value == false) {
                return "Nie";
            } else {
                return "Tak";
            }
        },
        checkPaid(value) {
            if (value == false) {
                return "red";
            } else {
                return "green";
            }
        },
        sort() {
            if (this.selectedMerhant.all == true) {
                this.getMonthInvoices();
            }
            else if (this.selectedMerhant.buyer == true) {
                if (this.selectedBuyer.buyer == undefined || this.selectedBuyer.buyer.id == undefined) {
                    this.getBuyersMonthInvoices();
                    return;
                } else {
                    this.getBuyerMonthInvoices();
                    return;
                }
            }
            else if (this.selectedMerhant.supplier == true) {
                if (this.selectedSupplier.supplier == undefined || this.selectedSupplier.supplier.id == undefined) {
                    this.getSuppliersMonthInvoices();
                    return;
                } else {
                    this.getSupplierMonthInvoices();
                }
            } else {
                this.getBuyersMonthInvoices();
            }
        },
        getBuyerMonthInvoices() {
            this.invoices = [];
            axios.get("buyer/getBuyerMonthInvoices", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    year: this.year,
                    month: this.month,
                    buyerId: this.selectedBuyer.buyer.id
                }
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                    const invoice = data[key];
                    invoice.id = invoice.id;
                    this.invoices.push(invoice);
                }
            });
        },
        getBuyersMonthInvoices() {
            this.invoices = [];
            axios.get("buyer/getBuyersMonthInvoices", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    year: this.year,
                    month: this.month,
                }
            }).then(resp => {
                const data = resp.data;
                console.log(resp)
                for (let key in data) {
                    const invoice = data[key];
                    invoice.id = invoice.id;
                    this.invoices.push(invoice);
                }
            });
        },
        getSupplierMonthInvoices() {
            this.invoices = [];
            axios.get("supplier/getSupplierMonthInvoices", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    year: this.year,
                    month: this.month,
                    supplierId: this.selectedSupplier.supplier.id
                }
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                    const invoice = data[key];
                    invoice.id = invoice.id;
                    this.invoices.push(invoice);
                }
            });
        },
        getSuppliersMonthInvoices() {
            this.invoices = [];
            axios.get("supplier/getSuppliersMonthInvoices", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    year: this.year,
                    month: this.month,
                }
            }).then(resp => {
                const data = resp.data;
                for (let key in data) {
                    const invoice = data[key];
                    invoice.id = invoice.id;
                    this.invoices.push(invoice);
                }
            });
        },
        getMonthInvoices() {
            this.invoices = [];
            axios.get("/invoice/getMonthInvoices", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    year: this.year,
                    month: this.month
                }
                })
                .then(resp => {
                const data = resp.data;
                for (let key in data) {
                    const invoice = data[key];
                    invoice.id = invoice.id;
                    this.invoices.push(invoice);
                }
            });
        }, 
        onSelectedMerhant(event) {
            if (event.target.value == "Kupca") {
                this.selectedMerhant.buyer = true;
                this.selectedMerhant.all = false;
                this.selectedMerhant.supplier = false;
            } 
            if (event.target.value == "Sprzedawcy") {
                this.selectedMerhant.supplier = true;
                this.selectedMerhant.all = false;
                this.selectedMerhant.buyer = false;
            }
            if (event.target.value == "Wszyscy"){
                this.selectedMerhant.buyer = false;
                this.selectedMerhant.supplier = false;
                this.selectedMerhant.all = true;
            }
        },       
        onChangeMonth(event) {
            this.month = event.target.value;
        },
        onChangeYear(event) {
            this.year = event.target.value;
        },
        getDate() {
            let currentDate = new Date();
            let currentDateWithFormat = new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/");

            return currentDateWithFormat;
        },
        transferInvoices() {
            if (this.checkIfSureToTransfer()) {
                let date = this.getDate();
                const params = new URLSearchParams();
                params.append("localDate", date);
                axios.post("/invoice/transfer", params, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
            });
        }
        },
        checkIfSureToTransfer() {
            if (confirm("Czy napewno chcesz przenieść faktury na następny miesiąc?")) {
                return true;
            } else {
                return false;
            }
        }     
    },
    created() {
        let currentDate = this.getDate();
        this.year = currentDate.slice(0, 4);
        this.month = currentDate.slice(5, 7);
        this.getBuyersMonthInvoices();
  }
}
</script>

<style scoped>
.invoices-content {
  position: relative;
  width: 70%;
  height: 790px;
  border: 1px solid black;
  border-radius: 0px 5px 5px 5px;
  margin-left: 2%;
  background: rgb(255, 255, 255, 0.8);
  float: left;
  overflow-x: auto;
}

button {
    opacity: 1;
    display: inline;
    font-size: 0.8vw;
}

td {
  white-space: nowrap;
}

table {
  width: 2700px;
  font-size: 0.9vw;
}

li {
  width: 2500px;
  height: 30px;
  padding: 5px;
  overflow: auto;
  position: relative;
  font-size: 19px;
  margin-top: 1px;
  border: 1px solid black;
}

.invoice-menu {
    height: 3.9%;
    width: 2500px;
    margin-left: 1%;
    margin-top: 0.3%;
    font-size: 0.9vw;
}

.sort-menu {
    float: left;
    width: 200%;
    margin-left: 1%;
    margin-top: 0.3%;
    font-size: 0.9vw;
}

.merhant-content {
    display: inline;
    position: relative;
}
</style>