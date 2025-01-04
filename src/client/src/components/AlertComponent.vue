<template>
  <div v-if="visible" :class="`alert alert-${type}`" class="alert-container">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    dismissible: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    visible() {
      return this.$store.state.alert.visible;
    }
  },
};
</script>

<style scoped>
.alert-container {
  font-weight: bold;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 7px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-success {
  background-color: #28a745;
}

.alert-error {
  background-color: rgba(220, 53, 69, 0.95);
}

.alert-info {
  background-color: #17a2b8;
}

.alert-warning {
  background-color: #ffc107;
}
</style>
