<template>

    <div>
        <spazz-left-menu></spazz-left-menu>
        <spazz-nav-menu></spazz-nav-menu>

        <div class="report-content">

            <button class="btn btn-success btn-sm" @click="changeReportPanel()">Raporty</button>
            <button class="btn btn-success btn-sm" @click="changeCostPanel()">Koszty</button>
            
            <div v-if="showReportPanel">
              <spazz-report-panel></spazz-report-panel>
            </div>

            <div v-if="showCostPanel">
              <spazz-cost-panel></spazz-cost-panel>
            </div>
        </div>
    </div>

</template>

<script>
import LeftMenu from '../LeftMenu'
import NavMenu from '../NavMenu'
import CostPanel from './CostPanel'
import ReportPanel from './ReportPanel'
import axios from '../../axios-auth'

export default {
    components: {
        spazzLeftMenu: LeftMenu,
        spazzNavMenu: NavMenu,
        spazzCostPanel: CostPanel,
        spazzReportPanel: ReportPanel
    },
    data() {
    return {
      showCostPanel: false,
      showReportPanel: false,
      showReportsContent: false,
      showEarningsListContent: false,
      reports: [],
      buyers: [],
      date: '',
      soldedValue: 0,
      boughtValue: 0,
      soldedQuantity: 0,
      buyersNotUsedValue: 0,
      suppliersNotUsedValue: 0,
      averageSold: 0,
      averagePurchase: 0,
      averageEarningsPerM3: 0,
      sumCosts: 0,
      profit: 0,
      type: "",
      isDateSelected: false
    };
  },
  methods: {
    changeReportPanel() {
      this.showReportPanel = !this.showReportPanel;
      this.showCostPanel = false;
    },
    changeCostPanel() {
      this.showCostPanel = !this.showCostPanel;
      this.showReportPanel = false;
    },

  }
}
</script>

<style scoped>
.report-content {
  position: relative;
  width: 70%;
  height: 790px;
  border: 1px solid black;
  border-radius: 0px 5px 5px 5px;
  margin-left: 2%;
  background: rgb(255, 255, 255, 0.8);
  float: left;

  overflow-x: auto;
  font-size: 0.9vw;
}

table {
  margin-top: 0.5%;
  width: 2500px;
}

li {
  margin-top: 1%;
  font-size: 0.9vw;
}

button {
  font-size: 0.9vw;
}

.form-control {
  font-size: 0.9vw;
}
</style>