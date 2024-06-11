<template>
  <transition name="fade">
    <div v-if="visible" class="overlay" @click.self="closePopup">
      <div class="popup">
        <div class="popup-header">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
        </div>
        <div class="popup-body">
          <slot>
            {{ message }}
          </slot>
        </div>
        <div class="popup-footer">
          <slot name="footer">
            <button class="ok-btn" @click="closePopup">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CustomPopup',
  props: {
    title: {
      type: String,
      default: 'Notification',
    },
    message: {
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
      if (this.duration > 0) {
        setTimeout(() => {
          this.closePopup();
        }, this.duration);
      }
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
  max-width: 400px;
  width: 90%;
}

.popup-header {
  margin-bottom: 15px;
}

.popup-footer {
  margin-top: 15px;
}

.ok-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
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
