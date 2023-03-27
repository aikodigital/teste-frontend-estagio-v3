import Vue from 'vue'
import VueRouter from 'vue-router'

import EquipmentList from 'JSON/equipment/equipmentStateHistory.json'
import EquipmentDetail from 'JSON/equipment/equipmentModel.json'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: EquipmentList },
  { path: '/equipments/:id', component: EquipmentDetail, props: true }
]

export default new VueRouter({
  mode: 'history',
  routes
})
