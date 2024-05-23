<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dobro došli</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f4f4f9;
    }

    .container {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .logo {
      width: 150px;
      margin-bottom: 20px;
    }

    header {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-control {
      width: 300px;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .forgot-password {
      background-color: transparent;
      border: none;
      color: #007bff;
      cursor: pointer;
      text-decoration: underline;
      margin-bottom: 20px;
    }

    .gray-text {
      color: gray;
      margin-bottom: 10px;
    }

    .black-button {
      background-color: transparent;
      border: 2px solid black;
      color: black;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .black-button:hover {
      background-color: black;
      color: white;
    }

    .gmail-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      font-size: 14px;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
      margin: 5px;
    }

    .gmail-button svg {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }

    .gmail-button:hover {
      background-color: #3367d6;
    }
  </style>
</head>
<body>

<div class="container centered">
    <div class="text-center mb-4">
      <img src="@/assets/logo.png" alt="Sports" class="logo">
    </div>
    <h2>Dobro došli</h2>
    <form @submit.prevent="register" class="form-container">
      <div class="form-group">
        <label for="inputName">Ime</label>
        <input type="text" v-model="name" class="form-control" id="inputName" placeholder="Ime" required>
      </div>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Email" required>
      </div>
      <div class="form-group">
        <label for="inputPassword">Šifra</label>
        <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Šifra" required>
      </div>
      <button type="submit" class="btn btn-success btn-full-width">Registracija</button>
    </form>
    <p class="mt-3">Imaš račun? <router-link to="/login" class="text-danger">Prijava</router-link></p>
    <div class="icon-container">
      <button @click="loginWithGoogle" class="btn btn-outline-danger btn-icon">
        <i class="fab fa-google"></i>
      </button>
    </div>
  </div>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script>
  new Vue({
    el: '.container',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        // Simulacija registracije
        console.log(`User registered with name: ${this.name}, email: ${this.email}`);
        // this.$router.push('/profile');
      },
      loginWithGoogle() {
        // Simulacija Google prijave
        console.log('User logged in with Google');
        // this.$router.push('/profile');
      }
    }
  });
</script>

</body>
</html>