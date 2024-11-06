<template>
    <div v-if="visible" class="modal-overlay">
      <div :class="['modal-content', modalType]" @click.stop>
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
        <p class="mb-6">{{ message }}</p>
        <div class="flex justify-end space-x-4">
          <button v-if="modalType === 'confirm'" @click="confirmAction" class="btn btn-confirm">Confirm</button>
          <button @click="closeModal" class="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      message: String,
      type: { type: String, default: "confirm" }, // confirm, success, error
    },
    data() {
      return {
        visible: true,
      };
    },
    computed: {
      modalType() {
        return this.type;
      }
    },
    methods: {
      closeModal() {
        this.visible = false;
        this.$emit("close");
      },
      confirmAction() {
        this.$emit("confirm");
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    width: 90%;
    max-width: 400px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .confirm {
    background: linear-gradient(135deg, #9b59b6, #8e44ad); /* Purple gradient for confirm */
  }
  
  .success {
    background: linear-gradient(135deg, #27ae60, #2ecc71); /* Green gradient for success */
  }
  
  .error {
    background: linear-gradient(135deg, #e74c3c, #c0392b); /* Red gradient for error */
  }
  
  .btn {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-cancel {
    background: white;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .btn-confirm {
    color: white;
  }
  </style>
  