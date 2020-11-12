<template>

    <div>
        <spazz-left-menu></spazz-left-menu>
        <spazz-nav-menu></spazz-nav-menu>

            <div class="buyer-content">
                <button class="btn btn-success btn-sm" style="float: left;" @click="changeAddSupplier()">Dodaj sprzedawce</button>
                <button class="btn btn-success btn-sm" style="float: left; margin-left: 0.5%;" @click="changeAddPrice()">Dodaj cenę</button>
                <button class="btn btn-success btn-sm" style="float: left; margin-left: 0.5%;" @click="changeEditPrice()">Edytuj cenę</button>
                <button class="btn btn-success btn-sm" style="float: left; margin-left: 0.5%;" @click="changePriceList()">Cennik</button>
                <button class="btn btn-success btn-sm" style="float: left; margin-left: 0.5%;" @click="changeEditName()">Edytuj nazwę</button>

                <div v-if="showAddSupplierContent">
                    <spazz-add-supplier></spazz-add-supplier>
                </div>

                <div v-if="showAddPriceContent">
                    <spazz-add-price></spazz-add-price>
                </div>

                <div v-if="showEditPriceContent">
                    <spazz-edit-price></spazz-edit-price>
                </div>

                <div v-if="showEditNameContent">
                    <spazz-edit-name></spazz-edit-name>
                </div>

                <div v-if="showPriceListContent">
                    <spazz-price-list></spazz-price-list>
                </div>
            </div>
    </div>
    
</template>

<script>
import LeftMenu from '../LeftMenu'
import NavMenu from '../NavMenu'
import AddSupplier from './AddSupplier'
import AddPrice from './AddPrice'
import EditPrice from './EditPrice'
import EditName from './EditName'
import PriceList from './PriceList'

export default {
    components: {
        spazzLeftMenu: LeftMenu,
        spazzNavMenu: NavMenu,
        spazzAddSupplier: AddSupplier,
        spazzAddPrice: AddPrice,
        spazzEditPrice: EditPrice,
        spazzEditName: EditName,
        spazzPriceList: PriceList
    },
    data() {
        return {
            showAddSupplierContent: false,
            showAddPriceContent: false,
            showEditPriceContent: false,
            showEditNameContent: false,
            showPriceListContent: false
        }
    },
    methods: {
        changeAddSupplier() {
            this.showAddSupplierContent = true
            this.showAddPriceContent = false
            this.showEditPriceContent = false
            this.showEditNameContent = false
            this.showPriceListContent = false
        },
        changeAddPrice() {
            this.showAddPriceContent = true
            this.showAddSupplierContent = false
            this.showEditPriceContent = false
            this.showEditNameContent = false
            this.showPriceListContent = false
        },
        changeEditPrice() {
            this.showEditPriceContent = true
            this.showAddSupplierContent = false
            this.showAddPriceContent = false
            this.showEditNameContent = false
            this.showPriceListContent = false
        },
        changeEditName() {
            this.showEditNameContent = true
            this.showEditPriceContent = false
            this.showAddSypplierContent = false
            this.showAddPriceContent = false
            this.showPriceListContent = false
        },
        changePriceList() {
            this.showPriceListContent = true
            this.showEditNameContent = false
            this.showEditPriceContent = false
            this.showAddSypplierContent = false
            this.showAddPriceContent = false
        }
    }
}
</script>

<style scoped>
.buyer-content {
  position: relative;
  width: 70%;
  height: 790px;
  border: 1px solid black;
  border-radius: 0px 5px 5px 5px;
  margin-left: 2%;
  background: rgb(255, 255, 255, 0.8);
  float: left;
}

button {
    opacity: 1;
    display: inline;
    font-size: 0.8vw;
}
</style>