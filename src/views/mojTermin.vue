<template>
  <div class="moji-termini-wrapper">
    <div class="header">
      <button @click="goBack" class="btn-back">&larr;</button>
      <div class="title-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
        <h2 class="text-center">Moji termini</h2>
      </div>
    </div>
    <div v-if="filteredTermini.length > 0" class="termini-list">
      <div v-for="termin in filteredTermini" :key="termin.id" class="termin-card position-relative" :style="getCardStyle(termin.sport)">
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
          <button @click="otkaziSe(termin.id)" class="btn btn-warning">
            Otkaži
          </button>
        </div>
      </div>
    </div>
    <div v-else class="no-termini">
      <p>Nema mojih termina</p>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, arrayRemove, deleteDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      termini: [],
      userId: null,
      filteredTermini: [],
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
          this.filteredTermini = [];
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
        if (termin.userId === this.userId || (termin.prijavljeni && termin.prijavljeni.includes(this.userId))) {
          this.termini.push(termin);
        }
      });
      this.filteredTermini = this.termini;
    },
    async otkaziSe(id) {
      const terminIndex = this.filteredTermini.findIndex((termin) => termin.id === id);
      if (terminIndex !== -1) {
        const termin = this.filteredTermini[terminIndex];
        if (termin.prijavljeni && termin.prijavljeni.includes(this.userId)) {
          this.filteredTermini[terminIndex].slotsNeeded += 1;
          await updateDoc(doc(db, 'termini', id), {
            slotsNeeded: this.filteredTermini[terminIndex].slotsNeeded,
            prijavljeni: arrayRemove(this.userId),
          });
          this.filteredTermini.splice(terminIndex, 1);
          alert(`Otkazali ste prijavu za termin ${termin.name}`);
        }
      }
    },
    async obrisiTermin(id) {
      if (confirm('Jeste li sigurni da želite obrisati ovaj termin?')) {
        try {
          await deleteDoc(doc(db, 'termini', id));
          this.filteredTermini = this.filteredTermini.filter((termin) => termin.id !== id);
          alert('Termin je uspješno obrisan.');
        } catch (error) {
          alert('Greška pri brisanju termina: ' + error.message);
        }
      }
    },
    goBack() {
      this.$router.push('/home');
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
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
}

.btn-back {
  font-size: 36px;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
  color: #28a745;
  margin-right: 350px; 
  position: absolute;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  height: 60px;
  margin-bottom: 10px;
}

.text-center {
  color: #2a2a2a;
}

.moji-termini-wrapper {
  padding: 20px;
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

.termin-info .needed {
  color: #e53e3e;
  font-weight: bold;
}

.btn-otkazi {
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  background-color: #dc3545;
}

.btn-otkazi:hover {
  background-color: #b72a2a;
}

.no-termini {
  text-align: center;
  margin-top: 50px;
  color: #666;
  font-size: 18px;
}
</style>