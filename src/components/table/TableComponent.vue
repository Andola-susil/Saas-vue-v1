<template>
  <v-card>
    <v-card-title>
      <slot name="title">Dynamic Data Table</slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="filters">
        <v-text-field
          v-for="column in filterableColumns"
          :key="column.key"
          v-model="filters[column.key]"
          :label="`Filter by ${column.label}`"
          @input="applyFilters"
          class="mx-4"
        ></v-text-field>
      </slot>
    </v-card-subtitle>
    <v-data-table
      :headers="computedHeaders"
      :items="filteredRows"
      item-value="id"
      show-select
      :single-expand="false"
    >
      <template v-slot:[`item.${expandableRowKey}`]="{ item }">
        <v-btn icon @click="toggleExpand(item.id)">
          <v-icon>{{ expandedItems.includes(item.id) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </template>
      <template v-slot:expanded-item="{ item }">
        <v-card flat class="pa-3">
          <slot name="expanded-row" :item="item">
            <!-- Default expanded row content -->
          </slot>
        </v-card>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <slot name="actions" :item="item">
          <v-btn @click="$emit('edit-item', item)">Edit</v-btn>
          <v-btn @click="$emit('delete-item', item)" color="red">Delete</v-btn>
          <v-btn @click="copyLink(item.link)">Copy Link</v-btn>
          <v-btn :href="item.link" target="_blank">Open Link</v-btn>
        </slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'DynamicDataTable',
  props: {
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    expandableRowKey: {
      type: String,
      default: 'expandable'
    },
    actions: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filters: {},
      expandedItems: [],
      selectedItems: [],
    };
  },
  computed: {
    computedHeaders() {
      const headers = this.columns.map(column => ({
        text: column.label,
        value: column.key,
        sortable: column.sortable || false,
      }));
      if (this.actions.length) {
        headers.push({ text: 'Actions', value: 'action', sortable: false });
      }
      return headers;
    },
    filterableColumns() {
      return this.columns.filter(column => column.filterable);
    },
    filteredRows() {
      return this.items.filter(row =>
        Object.keys(this.filters).every(key =>
          row[key]
            .toString()
            .toLowerCase()
            .includes(this.filters[key].toLowerCase())
        )
      );
    },
  },
  methods: {
    toggleExpand(itemId) {
      const index = this.expandedItems.indexOf(itemId);
      if (index > -1) {
        this.expandedItems.splice(index, 1);
      } else {
        this.expandedItems.push(itemId);
      }
    },
    applyFilters() {
      this.$emit('filter', this.filters);
    },
    copyLink(link) {
      navigator.clipboard.writeText(link).then(() => {
        this.$emit('link-copied', link);
      });
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}

input[type='text'] {
  width: 100%;
  box-sizing: border-box;
}
</style>
