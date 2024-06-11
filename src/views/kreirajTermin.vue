<template>
  <div class="kreiraj-termin-container">
    <div class="back">
      <button @click="goBack" class="btn-back">&larr;</button>
    </div>
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <h2 class="text-center">Kreiraj termin</h2>
    <div class="form-group mb-3">
      <input
        type="text"
        v-model="name"
        class="form-control"
        placeholder="Naziv"
        required/>
    </div>
    <div class="form-group mb-3 sport-buttons">
      <button
        type="button"
        @click="selectSport('kosarka')"
        :class="{ selected: sport === 'kosarka' }"
        class="btn-sport">
        Košarka
      </button>
      <button
        type="button"
        @click="selectSport('nogomet')"
        :class="{ selected: sport === 'nogomet' }"
        class="btn-sport">
        Nogomet
      </button>
    </div>
    <div class="form-group mb-3">
      <input
        type="text"
        v-model="location"
        class="form-control"
        placeholder="Lokacija"
        required/>
    </div>
    <div class="form-group mb-3 date-group">
      <input
        type="date"
        v-model="startDate"
        class="form-control"
        placeholder="Datum (početak)"
        required/>
      <input
        type="time"
        v-model="time"
        class="form-control"
        placeholder="Vrijeme"
        required/>
    </div>
    <div class="form-group mb-3">
      <input
        type="number"
        v-model="slotsNeeded"
        class="form-control"
        placeholder="Potrebno igrača"
        required/>
    </div>
    <div class="form-group mb-3">
      <select
        v-model="gender"
        class="form-control"
        required
        @change="clearPlaceholder"
        ref="genderSelect">
        <option value="" disabled selected>Spol</option>
        <option value="male">Muški</option>
        <option value="female">Ženski</option>
        <option value="any">Bilo koji</option>
      </select>
    </div>
    <div class="form-group mb-3 age-group">
      <input
        type="number"
        v-model="minGod"
        class="form-control"
        placeholder="Min godina"
        required/>
      <input
        type="number"
        v-model="maxGod"
        class="form-control"
        placeholder="Max godina"
        required/>
    </div>
    <div class="form-group mb-3">
      <textarea
        v-model="opis"
        class="form-control"
        placeholder="Dodatni opis..."
        rows="5"
      ></textarea>
    </div>
    <button
      type="submit"
      @click="createTermin"
      class="btn btn-success btn-full-width"
      :disabled="!isFormValid">
      Kreiraj
    </button>
  </div>
</template>

<script>
import { db, auth } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      userId: null,
      name: '',
      location: '',
      startDate: '',
      time: '',
      slotsNeeded: '',
      gender: '',
      minGod: '',
      maxGod: '',
      opis: '',
      sport: '',
      isFormValid: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectSport(sport) {
      this.sport = sport;
      this.validateForm();
    },
    clearPlaceholder() {
      this.$refs.genderSelect.placeholder = '';
    },
    validateForm() {
      this.isFormValid =
        this.name &&
        this.location &&
        this.startDate &&
        this.time &&
        this.slotsNeeded > 0 &&
        this.gender &&
        this.minGod >= 0 &&
        this.maxGod >= 0 &&
        this.sport;
    },
    async createTermin() {
      if (this.userId && this.isFormValid) {
        try {
          const termin = {
            userId: this.userId,
            name: this.name,
            location: this.location,
            startDate: this.startDate,
            time: this.time,
            slotsNeeded: this.slotsNeeded,
            gender: this.gender,
            minGod: this.minGod,
            maxGod: this.maxGod,
            opis: this.opis,
            sport: this.sport,
          };
          await addDoc(collection(db, 'termini'), termin);
          this.$router.push('/home');
        } catch (error) {
          alert('Greška pri kreiranju termina. Pokušajte ponovno.');
        }
      } else {
        alert('Molimo popunite sva polja ispravno prije kreiranja termina.');
      }
    },
  },
  watch: {
    name: 'validateForm',
    location: 'validateForm',
    startDate: 'validateForm',
    time: 'validateForm',
    slotsNeeded: 'validateForm',
    gender: 'validateForm',
    minGod: 'validateForm',
    maxGod: 'validateForm',
    sport: 'validateForm',
  },
  created() {
    const currentUser = auth.currentUser;
    if (currentUser) {
      this.userId = currentUser.uid;
    }
    this.validateForm();
  },
};
</script>


<style scoped>
.kreiraj-termin-container {
  padding: 20px;
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: #fff;
}

.btn-back {
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: #4a90e2;
}

.logo {
  height: 60px;
}

.sport-buttons {
  display: flex;
  justify-content: space-around;
}

.btn-sport {
  flex: 1;
  margin: 0 5px;
  background-color: #f0f0f0;
  color: #333;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-sport.selected {
  background-color: #4a90e2;
  color: #fff;
  border-color: #357abd;
}

.date-group,
.age-group {
  display: flex;
  justify-content: space-between;
}

.date-group .form-control,
.age-group .form-control {
  flex: 1;
  margin: 0 5px;
}

.btn-full-width {
  background-color: #28a745;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-full-width:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.form-group {
  margin-bottom: 20px;
}
</style>
