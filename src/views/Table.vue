<template>
  <v-container>
    <DynamicTable
      :columns="columns"
      :items="items"
      :actions="actions"
    >
      <template #title>
        <h2>My Dynamic Data Table</h2>
      </template>
      <template #filters>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <!-- <template #actions="{ item }">
        <v-btn icon @click="editItem(item)">
          <v-icon>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn icon @click="deleteItem(item)" color="red">
          <v-icon>mdi-delete</v-icon>Delete
        </v-btn>
        <v-btn icon @click="copyLink(item.link)">
          <v-icon>mdi-content-copy</v-icon>Copy
        </v-btn>
        <v-btn icon :href="item.link" target="_blank">
          <v-icon>mdi-link-variant</v-icon>View
        </v-btn>
      </template> -->
      <template #expanded-row="{ item }">
        <div>{{ item.details }}</div>
      </template>
    </DynamicTable>
  </v-container>
</template>
<script>
import DynamicTable from '../components/table/TableListing.vue';

export default {
  name: 'TableView',
  path: '/tablepage',
  components: {
    DynamicTable,
  },
  data() {
    return {
      search: '',
      columns: [
        { label: 'Name', key: 'name', filterable: true, sortable: true },
        { label: 'Age', key: 'age', filterable: true, sortable: true },
        { label: 'Email', key: 'email', filterable: true, sortable: true },
        { label: 'Link', key: 'link', filterable: false, sortable: false },
      ],
      items: [
        { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', link: 'https://example.com/john', details: 'Additional details about John' },
        { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', link: 'https://example.com/jane', details: 'Additional details about Jane' },
        // More items...
      ],
      actions: [
        {
          label: 'Edit',
          icon: 'mdi-pencil',
          method(row) {
            alert(`Edit ${row.name}`);
          },
        },
        {
          label: 'Delete',
          icon: 'mdi-delete',
          method(row) {
            alert(`Delete ${row.name}`);
          },
        },
        {
          label: 'Copy Link',
          icon: 'mdi-content-copy',
          method(row) {
            navigator.clipboard.writeText(row.link).then(() => {
              alert(`Link copied: ${row.link}`);
            });
          },
        },
        {
          label: 'Open Link',
          icon: 'mdi-link-variant',
          method(row) {
            window.open(row.link, '_blank');
          },
        },
      ],
    };
  },
  methods: {
    editItem(item) {
      alert(`Edit ${item.name}`);
    },
    deleteItem(item) {
      alert(`Delete ${item.name}`);
    },
    copyLink(link) {
      navigator.clipboard.writeText(link).then(() => {
        alert(`Link copied: ${link}`);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* margin-top: 60px; */
}
</style>
