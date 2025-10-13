<template>
  <div class="splash-screen">
    <img src="/icons/logo-todoapp.png" alt="App Logo" />
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  z-index: 999;
}

img {
  max-width: 150px;
  margin-bottom: 20px; /* Space between logo and loader */
}

.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #14b8a6; /* Teal */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
