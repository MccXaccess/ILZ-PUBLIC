<template>
  <div id="app">
    <PvToolbar>
      <template #start>
        <PvButton label="Добавить" icon="pi pi-plus" @click="openNew" />
        <PvButton label="Изменить" icon="pi pi-pencil" @click="editSelected" :disabled="!selectedItem" />
        <PvButton label="Удалить" icon="pi pi-trash" @click="deleteSelected" :disabled="!selectedItem" />
      </template>
    </PvToolbar>
    <PvDataTable :value="items" selectionMode="single" v-model:selection="selectedItem">
      <PvColumn v-for="column in columns" :key="column.field" :field="column.field" :header="column.header">
        <template #body="slotProps">
          <span v-if="column.lookup">{{ getLookupValue(column.lookup, slotProps.data[column.field]) }}</span>
          <span v-else>{{ slotProps.data[column.field] }}</span>
        </template>
      </PvColumn>
    </PvDataTable>
    
    <PvDialog header="Item Details" v-model:visible="itemDialog" :closable="false">
      <div class="p-fluid">
        <div v-for="column in columns" :key="column.field" class="p-field">
          <label :for="column.field">{{ column.header }}</label>
          <PvInputText v-if="!column.lookup" :id="column.field" v-model="item[column.field]" required />
          <PvDropdown v-if="column.lookup" :id="column.field" :options="lookups[column.lookup]" optionLabel="name" optionValue="id" v-model="item[column.field]" />
        </div>
      </div>
      <template #footer>
        <PvButton label="Cancel" icon="pi pi-times" @click="hideDialog" class="p-button-text" />
        <PvButton label="Save" icon="pi pi-check" @click="saveItem" />
      </template>
    </PvDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [],
      items: [],
      lookups: {},
      item: null,
      selectedItem: null,
      itemDialog: false,
      isNewItem: false,
    };
  },
  created() {
    this.loadTableMetadata();
  },
  methods: {
    async loadTableMetadata() {
      // Здесь нужно получить метаданные таблицы и данные из API или другого источника
      // Пример метаданных и данных:
      const metadata = {
  columns: [
    { field: 'id', header: 'ID' },
    { field: 'clientName', header: 'Client Name' },
    { field: 'accountNumber', header: 'Account Number' },
    { field: 'transactionType', header: 'Transaction Type', lookup: 'transactionTypes' },
    { field: 'amount', header: 'Amount' }
  ],
  items: [
    { id: 1, clientName: 'Alice Johnson', accountNumber: '123456789', transactionType: 1, amount: 1500 },
    { id: 2, clientName: 'Bob Smith', accountNumber: '987654321', transactionType: 2, amount: -200 },
    { id: 3, clientName: 'Charlie Brown', accountNumber: '456123789', transactionType: 1, amount: 1000 }
  ],
  lookups: {
    transactionTypes: [
      { id: 1, name: 'Deposit' },
      { id: 2, name: 'Withdrawal' }
    ]
  }
};


      this.columns = metadata.columns;
      this.items = metadata.items;
      this.lookups = metadata.lookups;
    },
    openNew() {
      this.item = {};
      this.itemDialog = true;
      this.isNewItem = true;
    },
    hideDialog() {
      this.itemDialog = false;
      this.item = null;
    },
    saveItem() {
      if (this.isNewItem) {
        this.item.id = this.items.length ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
        this.items.push(this.item);
      } else {
        const index = this.items.findIndex(item => item.id === this.item.id);
        if (index !== -1) {
          this.items.splice(index, 1, this.item);
        }
      }
      this.hideDialog();
    },
    editSelected() {
      if (this.selectedItem) {
        this.item = { ...this.selectedItem };
        this.itemDialog = true;
        this.isNewItem = false;
      }
    },
    deleteSelected() {
      if (this.selectedItem) {
        this.items = this.items.filter(item => item.id !== this.selectedItem.id);
        this.selectedItem = null;
      }
    },
    getLookupValue(lookup, key) {
      const lookupItem = this.lookups[lookup].find(item => item.id === key);
      return lookupItem ? lookupItem.name : key;
    }
  }
};
</script>

<style>
#app {
  margin: 2rem;
}
</style>
