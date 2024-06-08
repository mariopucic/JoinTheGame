<template>
    <div class="home-container">
      <header class="header">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
        <h2>Join the Game</h2>
      </header>
      <div class="button-container">
        <button @click="kreirajTermin" class="btn-termin">Kreiraj termin</button>
        <button @click="mojTermin" class="btn-moj-termin">Moji termini</button>
      </div>
      <div v-if="termini.length > 0" class="termini-list">
        <div v-for="termin in termini" :key="termin.id" class="termin-card">
          <div class="termin-info">
            <h3>{{ termin.name }}</h3>
            <p>{{ termin.location }}</p>
            <p>{{ termin.startDate }} {{ termin.time }}</p>
            <p class="needed">Potrebno: {{ termin.slotsNeeded }}</p>
            <button v-if="!termin.prijavljen && termin.slotsNeeded > 0" @click="prijaviSe(termin.id)" class="btn-prijava">Prijava</button>
            <p v-else-if="termin.slotsNeeded === 0" class="popunjeno">Termin je popunjen</p>
            <p v-else class="prijavljen">Prijavljeni ste</p>
          </div>
        </div>
      </div>
      <div v-else class="no-termini">
        <p>Nema dostupnih termina</p>
      </div>
      <nav class="navbar">
        <router-link to="/Profil" class="nav-link">
          <i class="fa fa-user"></i>
          Profil
        </router-link>
      </nav>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        termini: []
      };
    },
    created() {
      this.fetchTermini();
    },
    methods: {
      async fetchTermini() {
        const querySnapshot = await getDocs(collection(db, "termini"));
        this.termini = [];
        querySnapshot.forEach((doc) => {
          const termin = doc.data();
          termin.id = doc.id;
          termin.prijavljen = false; 
          this.termini.push(termin);
        });
      },
      kreirajTermin() {
        this.$router.push('/kreiraj-termin');
      },
      mojTermin() {
        this.$router.push('/moj-termin');
      },
      async prijaviSe(id) {
        const terminIndex = this.termini.findIndex(termin => termin.id === id);
        if (terminIndex !== -1) {
          const termin = this.termini[terminIndex];
          if (termin.slotsNeeded > 0) {
            this.termini[terminIndex].slotsNeeded -= 1;
            this.termini[terminIndex].prijavljen = true;
            await updateDoc(doc(db, "termini", id), {
              slotsNeeded: this.termini[terminIndex].slotsNeeded,
              prijavljen: true
            });
            alert(`Prijavljeni ste na termin ${termin.name}`);
          }
        }
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/') {
          this.fetchTermini();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .home-container {
    padding: 20px;
  }
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  .logo {
    height: 50px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 20px;
  }
  .btn-termin {
    background-color: #f0f0f0;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-moj-termin {
    background-color: #f0f0f0;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .termini-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: calc(100vh - 200px); 
    overflow-y: auto;
  }
  .termin-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .termin-info {
    text-align: left;
  }
  .needed {
    color: red;
  }
  .prijavljen, .popunjeno {
    color: green;
    margin-top: 10px;
  }
  .btn-prijava {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  .no-termini {
    text-align: center;
    margin-top: 20px;
  }
  .navbar {
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: green;
    padding: 10px 0;
  }
  .nav-link {
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    text-align: center;
  }
  </style>
  