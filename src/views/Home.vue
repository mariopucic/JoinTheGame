<template>
  <div class="home-container">
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
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
          <p>Sport: {{ termin.sport }}</p>
          <p>Opis: {{ termin.opis }}</p>
          <p class="needed">Potrebno: {{ termin.slotsNeeded }}</p>
          <button
            v-if="!isPrijavljen(termin.id) && termin.slotsNeeded > 0"
            @click="prijaviSe(termin.id)"
            class="btn-prijava"
          >
            Prijava
          </button>
          <button
            v-else-if="isPrijavljen(termin.id)"
            @click="otkaziSe(termin.id)"
            class="btn-otkazi"
          >
            Otkaži
          </button>
          <p v-else-if="termin.slotsNeeded === 0" class="popunjeno">
            Termin je popunjen
          </p>
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
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

export default {
  data() {
    return {
      termini: [],
      userId: null,
    };
  },
  created() {
    this.fetchTermini();
  },
  methods: {
    async fetchTermini() {
      const querySnapshot = await getDocs(collection(db, 'termini'));
      this.termini = [];
      querySnapshot.forEach((doc) => {
        const termin = doc.data();
        termin.id = doc.id;
        termin.prijavljen =
          termin.prijavljeni && termin.prijavljeni.includes(this.userId);
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
      const terminIndex = this.termini.findIndex((termin) => termin.id === id);
      if (terminIndex !== -1) {
        const termin = this.termini[terminIndex];
        if (!termin.prijavljen && termin.slotsNeeded > 0) {
          this.termini[terminIndex].slotsNeeded -= 1;
          this.termini[terminIndex].prijavljen = true;
          await updateDoc(doc(db, 'termini', id), {
            slotsNeeded: this.termini[terminIndex].slotsNeeded,
            prijavljeni: arrayUnion(this.userId),
          });
          alert(`Prijavljeni ste na termin ${termin.name}`);
          this.fetchTermini();
        } else {
          alert('Već ste prijavljeni na ovaj termin.');
        }
      }
    },
    async otkaziSe(id) {
      const terminIndex = this.termini.findIndex((termin) => termin.id === id);
      if (terminIndex !== -1) {
        const termin = this.termini[terminIndex];
        if (termin.prijavljen) {
          this.termini[terminIndex].slotsNeeded += 1;
          this.termini[terminIndex].prijavljen = false;
          await updateDoc(doc(db, 'termini', id), {
            slotsNeeded: this.termini[terminIndex].slotsNeeded,
            prijavljeni: arrayRemove(this.userId),
          });
          alert(`Otkazali ste prijavu za termin ${termin.name}`);
          this.fetchTermini();
        } else {
          alert('Niste prijavljeni na ovaj termin.');
        }
      }
    },
    isPrijavljen(id) {
      const termin = this.termini.find((t) => t.id === id);
      return (
        termin && termin.prijavljeni && termin.prijavljeni.includes(this.userId)
      );
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === '/') {
        this.fetchTermini();
      }
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  color: #2a2a2a;
}

.logo {
  height: 60px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
}

.btn-termin,
.btn-moj-termin {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-termin:hover,
.btn-moj-termin:hover {
  background-color: #357abd;
}

.termini-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  justify-content: center;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
}

.termin-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.termin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.termin-info h3 {
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.termin-info p {
  color: #666;
  margin: 5px 0;
  line-height: 1.5;
}

.needed,
.popunjeno {
  color: #e53e3e;
  font-weight: bold;
}

.btn-prijava,
.btn-otkazi {
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-prijava {
  background-color: #28a745;
}

.btn-prijava:hover {
  background-color: #1e6b30;
}

.btn-otkazi {
  background-color: #dc3545;
}

.btn-otkazi:hover {
  background-color: #a7262d;
}

.no-termini {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}

.navbar {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #4a90e2;
  padding: 10px 0;
}

.nav-link {
  color: #fff;
  text-align: center;
  font-size: 16px;
}
</style>
