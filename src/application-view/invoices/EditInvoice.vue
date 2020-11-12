<template>
    <div class="edit-invoice-content">
        <form>
            <div class="form-group">
                <label>Numer faktury</label>
                <input type="text" id="id" class="form-control" v-model="oldInvoiceNumber"/>

                <button class="btn btn-success btn-sm" @click="getInvoice()">Wyszukaj fakturę</button>
            </div>
       </form>
       <div v-if="showInvoice">
           <div>
                <p> <span>Numer faktury:</span> {{ oldInvoiceNumber }} </p>
                <p> <span>Data:</span> {{ oldDate}}</p>
                <p> <span>Wartość:</span> {{ oldValue | toCurrency }}</p>
           </div>
            <hr>
           <div>
               <form>
                    <label>Nowy numer faktury</label>
                    <input type="text" class="form-control" v-model="invoice.newInvoiceNumber">

                    <label>Nowa data</label>
                    <input type="date" class="form-control" v-model="invoice.newDate">
<!--
                    <label>Nowa wartość</label>
                    <input type="number" class="form-control" v-model="invoice.newValue" >
-->
                    <button class="btn btn-success btn-sm" @click="updateInvoice()">Edytuj</button>
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
            showInvoice: false,
            oldInvoiceNumber: null,
            oldDate: null,
            oldValue: null,
            invoice: {
                oldInvoiceNumber: null,
                newInvoiceNumber: null,
                newDate: null,
                newValue: null
            }
        }
    },
    methods: {
        getInvoice() {
            axios.get('invoice/getInvoiceByInvoiceNumber', {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                },
                params: {
                    invoiceNumber: this.oldInvoiceNumber
                }
            }).then(resp => {
                this.oldDate = resp.data.date;
                this.oldValue = resp.data.value
            }).catch((error) => {alert('Nie można edytować tej faktury')})
            .finally(this.showInvoice = true)
        },
        updateInvoice() {
            this.invoice.oldInvoiceNumber = this.oldInvoiceNumber;
            if (this.invoice.newInvoiceNumber == null) {
                this.invoice.newInvoiceNumber = this.oldInvoiceNumber;
            }
            if (this.invoice.newDate == null) {
                this.invoice.newDate = this.oldDate;
            }
            if (this.invoice.newValue == null) {
                this.invoice.newValue = this.oldValue;
            }
            console.log(this.invoice)
            axios.put('invoice/updateInvoice', this.invoice, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.jwt
                }
            }).then(resp => {
                if (resp.status == 200) {
                    alert('Zaktualizowano fakturę')
                }
            }).catch((error) => {alert('Nie zaktualizowano faktury')})
        }
    }
}
</script>

<style scoped>
.edit-invoice-content {
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