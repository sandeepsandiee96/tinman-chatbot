<template>
  <div class="login-screen">
    <div class="login-box">
      <h2>Login</h2>
      <input v-model="nickname" class="login-input" placeholder="Enter your nickname" />
      <button @click="login" class="login-btn">Login</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      nickname: '',
    };
  },
  methods: {
    async login() {
     const response =  await this.$store.dispatch('login', this.nickname);
      if(response.id)
      {
        this.$router.push('/chat');
      }
      
    },
  },
};
</script>

<style scoped>
.login-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #f4f7fa;
}

.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 24px;
  font-size: 2rem;
  color: #333;
}

.login-input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
}

.login-input:focus {
  border-color: #007bff;
}

.login-btn {
  width: 100%;
  padding: 12px 15px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #0069d9;
}
</style>