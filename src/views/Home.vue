<template>
    
    <div class="home-container">
        <header class="header">
            <img src="@/assets/logo.png" alt="Logo" class="logo">
            <h2>Join the Game</h2>
        </header>
        <div class="button-container">
            <button @click="stvoriTermin" class="btn-termin">Kreiraj termin</button>
            <button @click="mojTermin" class="btn-moj-termin">Moji termini</button>
        </div>
       
        <div class="no-termini">
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
import {db} from '@/firebase'
import {collection, getDocs} from 'firebase/firestore'

export default {
    data(){
        return {
            termini: []
        }
    },
    created() {
        this.fetchTermini()
    },
    methods: {
        async fetchTermin() {
            const querySnapshot = await getDocs(collection(db, "termini"))
            querySnapshot.forEach((doc) => {
                const termin = doc.data()
                termin.id = doc.id
                this.termini.push(termin)
            })
        },
        stvoriTermin(){
            this.$router.push('/stvori-termin')
        },
        mojTermin(){
            this.$router.push('/moj-termin')
        }
    }
}
</script>

<style scoped>
.home-container{
    padding: 20px;
}
.header{
    text-align: center;
    margin-bottom: 20px;
}
.logo {
    height: 50px;
}
.button-container{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 20px;
}
.btn-termin{
    background-color: #f0f0f0;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
   
}
.btn-moj-termin{
    background-color: #f0f0f0;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    
}

.no-termini{
    text-align: center;
    margin-top: 20px;
}
.navbar{
    
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: green;
    padding: 10px 0;
}
.nav-link{
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    text-align: center;
}

</style>