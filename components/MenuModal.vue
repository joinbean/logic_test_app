<template>
  <div>
    <transition name="apear">
      <div class="block" />
    </transition>
    <div class="modal-overlay">
      <div class="modal">
        <h6>Saved!</h6>
        <p>Your Details have been saved Successfully</p>
        <button>Go Home</button>
      </div>
      <div class="close" />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.apear-enter-active, .apear-leave-active {
  transition: opacity 2s;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.block {
  z-index: 9;
  width: 640px;
  height: 420px;
  border-radius: 45px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.32) 3.23%, rgba(255, 255, 255, 0.2) 103.23%);
  backdrop-filter: blur(8px);
  margin-top: 50px;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>
