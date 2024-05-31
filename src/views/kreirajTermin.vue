<template>
  <div class="kreiraj-termin-container">
    <div class="back">
        <button @click="goBack" class="btn-back">&larr;</button>
    </div>
    <img src="@/assets/logo.png" alt="Logo" class="logo">
    <h2 class="text-center">Kreiraj termin</h2>
      <div class="form-group mb-3">
        <input type="text" v-model="name" class="form-control" placeholder="Naziv" required />
      </div>
      <div class="form-group mb-3 sport-buttons">
        <button type="button" @click="selectSport('kosarka')" :class="{ selected: sport === 'kosarka' }" class="btn-sport">Košarka</button>
        <button type="button" @click="selectSport('nogomet')" :class="{ selected: sport === 'nogomet' }" class="btn-sport">Nogomet</button>
      </div>
      <div class="form-group mb-3">
        <input type="text" v-model="location" class="form-control" placeholder="Lokacija" required />
      </div>
      <div class="form-group mb-3 date-group">
        <input type="date" v-model="startDate" class="form-control" placeholder="Datum (početak)" required />
        <input type="time" v-model="time" class="form-control" placeholder="Vrijeme" required />
      </div>
      <div class="form-group mb-3">
        <input type="number" v-model="slotsNeeded" class="form-control" placeholder="Potrebno igrača" required />
      </div>
      <div class="form-group mb-3">
        <select v-model="gender" class="form-control" required @change="clearPlaceholder"> 
          <option value="" disabled selected>Spol</option>
          <option value="male">Muški</option>
          <option value="female">Ženski</option>
          <option value="any">Bilo koji</option>
        </select>
      </div>
      <div class="form-group mb-3 age-group">
        <input type="number" v-model="minGod" class="form-control" placeholder="Min godina" required />
        <input type="number" v-model="maxGod" class="form-control" placeholder="Max godina" required />
      </div>
      <div class="form-group mb-3">
        <textarea v-model="opis" class="form-control" placeholder="Dodatni opis..." rows="5"></textarea>
      </div>
      <button type="submit" class="btn btn-success btn-full-width">Kreiraj</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      location: '',
      startDate: '',
      time: '',
      slotsNeeded: '',
      gender: '',
      minGod: '',
      maxGod: '',
      opis: '',
      sport: ''
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    selectSport(sport){
      this.sport = sport
    },
    clearPlaceholder(){
      if(this.gender !== '')
        this.$refs.genderSelect.value = this.gender
     
    }
  }
}
</script>

<style scoped>
.kreiraj-termin-container {
  padding: 20px;
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.btn-back{
    font-size: 24px;
    border: none;
    background: none;
    cursor: pointer;
    color: green;
}
.logo {
    height: 50px;
}
.sport-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-sport {
  width: 48%;
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-sport.selected {
  background-color: #ccc;
  border: 2px solid red;
}

.date-group {
  display: flex;
  justify-content: space-between;
}

.date-group .form-control {
  width: 48%;
}

.age-group {
  display: flex;
  justify-content: space-between;
}

.age-group .form-control {
  width: 48%;
}

.btn-full-width {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}
</style>
