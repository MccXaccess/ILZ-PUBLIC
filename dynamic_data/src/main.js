import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import PvDataTable from 'primevue/datatable';
import PvColumn from 'primevue/column';
import PvButton from 'primevue/button';
import PvDialog from 'primevue/dialog';
import PvInputText from 'primevue/inputtext';
import PvDropdown from 'primevue/dropdown';
import PvToolbar from 'primevue/toolbar';

const app = createApp(App);

app.use(PrimeVue);

app.component('PvDataTable', PvDataTable);
app.component('PvColumn', PvColumn);
app.component('PvButton', PvButton);
app.component('PvDialog', PvDialog);
app.component('PvInputText', PvInputText);
app.component('PvDropdown', PvDropdown);
app.component('PvToolbar', PvToolbar);

app.mount('#app');
