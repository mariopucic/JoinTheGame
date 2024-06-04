<template>
  <div class="container centered">
    <div class="text-center mb-4">
      <img src="@/assets/logo.png" alt="Sports" class="logo">
    </div>
    <h2>Dobro došli</h2>
    <form @submit.prevent="login" class="form-container">
      <div class="form-group">
        <input type="text" v-model="email" class="form-control" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="password" class="form-control" placeholder="Šifra" required>
      </div>
      <button type="submit" class="btn btn-success btn-full-width">Prijava</button>
    </form>
    <p class="mt-3">Nisi još registriran? <router-link to="/register" class="text-danger">Registracija</router-link></p>
    <div class="icon-container">
      <button @click="loginWithGoogle" class="btn btn-outline-danger btn-icon">
        <i class="fab fa-google"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetUltraEmail } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/home'); // Preusmjeravanje na Home.vue nakon uspješne prijave
      } catch (error) {
        alert("Pogreška pri prijavi: " + error.message);
      }
    },
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        this.$router.push('/home'); // Preusmjeravanje na Home.vue nakon uspješne prijave
      } catch (error) {
        alert("Pogreška pri prijavi s Googleom: " + error.message);
      }
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  width: 400px;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.btn-full-width {
  width: 100%;
}

.icon-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100px;
}

.btn-icon {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 25px;
  font-size: 2em;
}
</style>