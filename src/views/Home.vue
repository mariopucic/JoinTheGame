<template>
  <div class="home-container">
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>Join the Game</h2>
    </header>
    <div class="button-container">
      <button @click="kreirajTermin" class="btn btn-termin">Kreiraj termin</button>
      <button @click="mojTermin" class="btn btn-termin">Moji termini</button>
    </div>
    <div v-if="termini.length > 0" class="termini-list">
      <div v-for="termin in termini" :key="termin.id" class="termin-card position-relative" :style="getCardStyle(termin.sport)">
        <div class="termin-header">
          <h3>{{ termin.name }}</h3>
          <button v-if="termin.userId === userId" @click="obrisiTermin(termin.id)" class="btn-delete">
            Izbriši
          </button>
        </div>
        <div class="termin-info">
          <p><strong>Lokacija:</strong> {{ termin.location }}</p>
          <p><strong>Datum i vrijeme:</strong> {{ termin.startDate }} {{ termin.time }}</p>
          <p><strong>Sport:</strong> {{ termin.sport }}</p>
          <p><strong>Opis:</strong> {{ termin.opis }}</p>
          <p class="needed"><strong>Potrebno:</strong> {{ termin.slotsNeeded }}</p>

          <button
            v-if="!termin.prijavljen && termin.slotsNeeded > 0"
            @click="prijaviSe(termin.id)"
            class="btn btn-success">
            Prijava
          </button>
          <button v-else-if="termin.prijavljen"
            @click="otkaziSe(termin.id)"
            class="btn btn-warning">
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
import { db, auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {
  collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove,
} from 'firebase/firestore';

const functions = getFunctions();

export default {
  data() {
    return {
      termini: [],
      userId: null,
    };
  },
  created() {
    this.initAuthState();
  },
  methods: {
    initAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userId = user.uid;
          this.fetchTermini();
        } else {
          this.userId = null;
          this.termini = [];
        }
      });
    },
    async fetchTermini() {
      if (this.userId === null) return;
      const querySnapshot = await getDocs(collection(db, 'termini'));
      this.termini = [];
      querySnapshot.forEach((doc) => {
        const termin = doc.data();
        termin.id = doc.id;
        termin.prijavljen = termin.prijavljeni && termin.prijavljeni.includes(this.userId);
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
    async obrisiTermin(id) {
      if (confirm('Jeste li sigurni da želite obrisati ovaj termin?')) {
        const deleteFunction = httpsCallable(functions, 'deleteTermin');
        try {
          const result = await deleteFunction({ terminId: id });
          alert(result.data.message);
          this.fetchTermini();
        } catch (error) {
          alert('Greška pri brisanju termina: ' + error.message);
        }
      }
    },
    isPrijavljen(id) {
      const termin = this.termini.find((t) => t.id === id);
      return termin && termin.prijavljeni && termin.prijavljeni.includes(this.userId);
    },
    getCardStyle(sport) {
      if (sport === 'kosarka') {
        return {
          backgroundImage: `url(${require('@/assets/basketball.jpg')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      } else if (sport === 'nogomet') {
        return {
          backgroundImage: `url(${require('@/assets/football.jpg')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      }
      return {};
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
  margin-top: 20px;
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
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-termin:hover,
.btn-moj-termin:hover {
  background-color: #28a745;
}

.termini-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  justify-content: center;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
  padding-bottom: 100px;
}

.termin-card {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-blend-mode: lighten;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.termin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.termin-header {
  position: relative;
}

.termin-header h3 {
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.sport-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.btn-delete {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
}

.termin-info p {
  color: #666;
  margin: 5px 0;
  line-height: 1.5;
}

.termin-info p strong {
  color: #333;
}

.termin-info .needed,
.termin-info .popunjeno {
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
  margin-top: 10px;
}

.btn-prijava {
  background-color: #28a745;
}

.btn-prijava:hover {
  background-color: #28a745;
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
  background-color: #28a745;
  padding: 10px 0;
}

.nav-link {
  color: #fff;
  text-align: center;
  font-size: 16px;
}
</style>
