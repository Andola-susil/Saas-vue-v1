<template>
  <div id="app">
     <v-container>
      <DynamicDataTable
        :columns="columns"
        :items="items"
        @edit-item="editItem"
        @delete-item="deleteItem"
        @link-copied="handleLinkCopied"
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
        <template #actions="{ item }">
          <v-btn @click="editItem(item)">Edit</v-btn>
          <v-btn @click="deleteItem(item)" color="red">Delete</v-btn>
          <v-btn @click="copyLink(item.link)">Copy Link</v-btn>
          <v-btn :href="item.link" target="_blank">Open Link</v-btn>
        </template>
        <template #expanded-row="{ item }">
          <div>{{ item.details }}</div>
        </template>
      </DynamicDataTable>
    </v-container>

    <!-- Popup -->
    
    <v-container>
      <v-btn color="success" @click="showSuccess">Success Popup</v-btn>
      <v-btn color="error" @click="showError">Error Popup</v-btn>
    </v-container>
    <PopUp :message="popupMessage" :type="popupType" v-if="showPopup"/>

  <!-- CustomPopup -->
  
    <v-container>
      <v-btn color="success" @click="showCustomPopup('success')">Show Success Popup</v-btn>
      <v-btn color="error" @click="showCustomPopup('error')">Show Error Popup</v-btn>
    </v-container>
    <CustomPopup :message="popupMessage" v-if="custom_showPopup">
      <template #header>
        <h3>{{ custom_popupTitle }}</h3>
      </template>
      <template #footer>
        <button class="ok-btn" @click="closePopup">OK</button>
      </template>
    </CustomPopup>

    <!-- TableListing -->
    <!-- <v-container>
      <TableListing />
    </v-container> -->
  </div>
</template>

<script>
import DynamicDataTable from '../components/table/TableComponent.vue';
import PopUp from '../components/popup/PopUp.vue';
import CustomPopup from '../components/popup/CustomPopup.vue';
// import TableListing from '../components/table/TableListing.vue';
export default {
  name: 'StyleGuide',
  path: 'styleGuide',
  components: {
    DynamicDataTable,
    PopUp,
    CustomPopup,
    // TableListing
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
      showPopup: false,
      popupMessage: '',
      popupType: '',
      custom_showPopup: false,
      custom_popupMessage: '',
      custom_popupTitle: '',
    };
  },
  methods: {
    showSuccess() {
      this.popupMessage = 'Operation was successful!';
      this.popupType = 'success';
      this.showPopup = true;
    },
    showError() {
      this.popupMessage = 'There was an error!';
      this.popupType = 'error';
      this.showPopup = true;
    },
    showCustomPopup(type) {
      if (type === 'success') {
        this.custom_popupMessage = 'Operation was successful!';
        this.custom_popupTitle = 'Success';
      } else if (type === 'error') {
        this.custom_popupMessage = 'There was an error!';
        this.custom_popupTitle = 'Error';
      }
      this.custom_showPopup = true;
    },
    closePopup() {
      this.custom_showPopup = false;
    },
    editItem(item) {
      console.log('Edit:', item);
    },
    deleteItem(item) {
      console.log('Delete:', item);
    },
  },
   watch: {
    popupMessage() {
      this.showPopup = !!this.popupMessage;
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
button {
  margin: 10px;
}
.v-container {
  margin-top: 20px;
}
</style>
