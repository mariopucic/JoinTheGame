<template>
  <div class="container centered">
    <div class="text-center mb-4">
      <img src="@/assets/logo.png" alt="Sports" class="logo" />
    </div>
    <h2>Dobro došli</h2>
    <form @submit.prevent="register" class="form-container">
      <div class="form-group">
        <input
          type="email"
          v-model="email"
          class="form-control"
          placeholder="Email"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Šifra"
          required
        />
      </div>
      <button type="submit" class="btn btn-success btn-full-width">
        Registracija
      </button>
    </form>
    <p class="mt-3">
      Imaš račun?
      <router-link to="/login" class="text-danger">Prijava</router-link>
    </p>
    <div class="icon-container">
      <button @click="loginWithGoogle" class="btn btn-outline-danger btn-icon">
        <i class="fab fa-google"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log('User registered with email:', user.email);
        this.$router.push('/profil');
      } catch (error) {
        alert(error.message);
      }
    },
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('Logged in with Google:', user.displayName);
        this.$router.push('/profile');
      } catch (error) {
        console.error('Google sign-in error:', error);
        alert(error.message);
      }
    },
  },
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
