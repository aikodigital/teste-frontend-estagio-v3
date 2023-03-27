<equipent class="json"></equipent>
<equipmentModel class="json"></equipmentModel>
<equipment class="PositionHistory json"></equipment>
<equipentState class="json"></equipentState>


<template>
    <v-data-table :headers="headers" :items="equipments" :items-per-page="10" class="elevation-1">
        <template v-slot:item.name="{ item }">
            <v-chip>{{ item.name }}</v-chip>
        </template>
        <template v-slot:item.equipmentModelId="{ item }">
            <span>{{ getModelName(item.equipmentModelId) }}</span>
        </template>
        <template v-slot:item.equipmentStateId="{ item }">
            <v-chip :color="getStateColor(item.equipmentStateId)">{{ getStateName(item.equipmentStateId) }}</v-chip>
        </template>
    </v-data-table>
</template>

<script>
export default {
    props: {
        equipments: Array,
        equipmentModels: Array,
        equipmentStates: Array,
    },
    methods: {
        getModelName(id) {
            const model = this.equipmentModels.find(m => m.id === id);
            return model ? model.name : '';
        },
        getStateName(id) {
            const state = this.equipmentStates.find(s => s.id === id);
            return state ? state.name : '';
        },
        getStateColor(id) {
            const state = this.equipmentStates.find(s => s.id === id);
            return state ? state.color : '';
        },
    },
    data() {
        return {
            headers: [
                { text: 'Nome', value: 'name' },
                { text: 'Modelo', value: 'equipmentModelId' },
                { text: 'Estado', value: 'equipmentStateId' },
            ],
        };
    },
};
</script>

<template>
    <div>
        <equipment-table :equipments="equipments" :equipment-models="equipmentModels"
            :equipment-states="equipmentStates" />
    </div>
</template>

<script>
    import equipmentTable from 'JSON/equipment/equipmentTable.vue';

    export default {
        components: {
            equipmentTable,
        },
        data() {
            return {
                equipments: [],
                equipmentModels: [],
                equipmentStates: [],
            };
        },
    };
</script>
</equipent>