<template>
    <div class="container profile-edit">
       <div class="back">
        <button @click="goBack" class="btn-back">&larr;</button>
    </div>
        <img src="@/assets/logo.png" alt="Logo" class="logo">
        <h2 class="text-center">Postavi profil</h2>
        <form @submit.prevent="saveChanges" class="form-container">
            <div class="form-group mb-3">
                <input type="text" v-model="name" class="form-control" placeholder="Ime" required />
            </div>
            <div class="form-group mb-3">
                <select class="form-control" v-model="gender" required>
                    <option value="" disabled>Spol</option>
                    <option value="muško">Muško</option>
                    <option value="žensko">Žensko</option>
                </select>
            </div>
            <div class="sports-container">
            <div class="form-group mb-3">
                <label>Košarka</label>
                <input type="checkbox" v-model="sports.kosarka.selected" />
                <select v-if="sports.kosarka.selected" class="form-control" v-model="sports.kosarka.level">
                    <option value="" disabled>Razina</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Amateur">Amateur</option>
                    <option value="Semi-Pro">Semi-Pro</option>
                    <option value="Professional">Professional</option>
                    <option value="World Class">World Class</option>
                    <option value="Legendary">Legendary</option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label>Nogomet</label>
                <input type="checkbox" v-model="sports.nogomet.selected" />
                <select v-if="sports.nogomet.selected" class="form-control" v-model="sports.nogomet.level">
                    <option value="" disabled>Razina</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Amateur">Amateur</option>
                    <option value="Semi-Pro">Semi-Pro</option>
                    <option value="Professional">Professional</option>
                    <option value="World Class">World Class</option>
                    <option value="Legendary">Legendary</option>
                </select>
            </div>
        </div>
            <div class="form-group mb-3">
                <textarea class="form-control" v-model="description" placeholder="Dodatni opis..." rows="5"></textarea>
            </div>
            <button class="btn btn-success btn-full-widith">Spremi</button>
        </form>
    </div>

</template>

<script>
import { auth, db } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            name: '',
            gender: '',
            sports: {
                kosarka: { selected: false, level: '' },
                nogomet: { selected: false, level: '' }
            },
            description: ''
        };
    },
    created() {
        this.loadUserProfile();
    },
    methods: {
        async loadUserProfile() {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                this.name = data.name;
                this.gender = data.gender;
                this.sports.kosarka = data.sports.kosarka;
                this.sports.nogomet = data.sports.nogomet;
                this.description = data.description;
            } else {
                console.log("No such document!");
            }
        },
        async saveChanges() {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDocRef, {
                name: this.name,
                gender: this.gender,
                sports: {
                    kosarka: this.sports.kosarka,
                    nogomet: this.sports.nogomet
                },
                description: this.description
            }, { merge: true });
            alert('Profil je uspješno ažuriran!');
            this.$router.push('/home');
        },
        goBack() {
            this.$router.push('/home');
        }
    }
}
</script>

<style scoped>
.container.profile-edit{
    padding: 20px;
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background: #fff;
}
.btn-back{
    font-size: 24px;
    border: none;
    background: none;
    cursor: pointer;
    color: #28a745;
}
.logo {
    height: 50px;
}
.profile-edit{
    max-width: 300px;
    margin: auto;
    text-align: center;
}
.sports-container {
    display: flex;
    justify-content: space-between;
}
input[type="checkbox"] {
    transform: scale(1.5); 
    margin: 10px; 
    cursor: pointer; 
}

.btn-full-width {
    width: 100px;
}
</style>