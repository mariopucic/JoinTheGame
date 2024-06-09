<template>
  <div class="moji-termini-wrapper">
    <div class="d-flex">
      <button @click="goBack" class="btn-back">&larr;</button>
            <h2 class="text-center">Moji Termini</h2>

    </div>
    <div v-if="filteredTermini.length > 0" class="termini-list">
      <div
        v-for="termin in filteredTermini"
        :key="termin.id"
        class="termin-card"
      >
        <div class="termin-info">
          <h3>{{ termin.name }}</h3>
          <p>{{ termin.location }}</p>
          <p>{{ termin.startDate }} {{ termin.time }}</p>
          <p>Sport: {{ termin.sport }}</p>
          <p>Opis: {{ termin.opis }}</p>
          <p class="needed">Potrebno: {{ termin.slotsNeeded }}</p>
          <button @click="otkaziSe(termin.id)" class="btn-otkazi">
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
import { db } from '@/firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayRemove,
} from 'firebase/firestore';

export default {
  data() {
    return {
      termini: [],
      userId: null,
      filteredTermini: [],
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
        if (termin.prijavljeni && termin.prijavljeni.includes(this.userId)) {
          this.termini.push(termin);
        }
      });
      this.filteredTermini = this.termini;
    },
    async otkaziSe(id) {
      const terminIndex = this.filteredTermini.findIndex(
        (termin) => termin.id === id
      );
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
    goBack() {
      window.history.back();
    },
  },
};
</script>

<style scoped>

.moji-termini-wrapper {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.btn-back {
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: green;
}

.termini-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  justify-content: center;
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
  color: #2a2a2a;
  font-weight: 600;
}

.termin-info p {
  color: #666;
  line-height: 1.6;
  margin: 5px 0;
}

.termin-info .needed {
  color: #e53e3e;
  font-weight: 500;
}

.no-termini {
  text-align: center;
  margin-top: 50px;
  color: #666;
  font-size: 18px;
}

.btn-otkazi {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-otkazi:hover {
  background-color: #b72a2a;
}
</style>
