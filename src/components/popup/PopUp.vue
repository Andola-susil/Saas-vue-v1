<template>
  <transition name="fade">
    <div v-if="visible" class="overlay">
      <!-- <div :class="['popup', type]">
        <slot>{{ message }}</slot>
        <div><v-btn color="success" @click="closePopup">OK</v-btn></div>
      </div> -->
      <v-card elevation="16"  max-width="344" class="mx-auto my-8">
        <v-card-item>
          <div>
            
            <div class="text-h6 mb-1">
              <v-icon icon="fas fa-home" />
            </div>
            <div class="text-overline mb-1">
              Elevates the button with a shadow
            </div>
            <div class="text-caption">{{ message }}</div>
          </div>
          <v-btn color="success" @click="closePopup">OK</v-btn>
        </v-card-item>

        <!-- <v-card-actions class="text-center">
          <v-btn color="success" @click="closePopup">OK</v-btn>
        </v-card-actions> -->
      </v-card>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopUp',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showPopup() {
      this.visible = true;
      // setTimeout(() => {
      //   this.closePopup();
      // }, this.duration);
    },
    closePopup() {
      this.visible = false;
    },
  },
  watch: {
    message: {
      immediate: true,
      handler() {
        if (this.message) {
          this.showPopup();
        }
      },
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.popup.success {
  border: 2px solid #4caf50;
}

.popup.error {
  border: 2px solid #f44336;
}

.ok-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.ok-btn:hover {
  background: #0056b3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
