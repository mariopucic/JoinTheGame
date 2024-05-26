<template>
    <div class="container profile-edit">
       <div class="back">
        <button @click="goBack" class="btn-back">&larr;</button>
    </div>
        <img src="@/assets/logo.png" alt="Logo" class="logo">
        <h2 class="text-center">Postavi profil</h2>
        <div class="picture-upload">
            <input type="text" @change="onFileChange" id="fileInput" class="file-input" />
            <label for="fileInput" class="picture-label">
                <i class="fa fa-camera"></i>
                <span>Dodaj sliku</span>
            </label>
        </div>
        <form @submit.prevent="saveChanges" class="form-container">
            <div class="form-group mb-3">
                <input type="text" v-model="name" class="form-control" placeholder="Ime" required />
            </div>
            <div class="form-group mb-3">
                <input type="text" class="form-control" v-model="game" placeholder="Igra" requred />
            </div>
            <div class="form-group mb-3">
                <select class="form-control" v-model="level" required>
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
                <textarea class="form-control" v-model="description" placeholder="Dodatni opis..." rows="2"></textarea>
            </div>
            <button class="btn btn-success btn-full-widith">Spremi</button>
        </form>
    </div>

</template>

<script>
export default {
    data() {
        return {
            name: '',
            game: '',
            level: '',
            description: '',
            picture: null
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0]
            this.picture = file;
        },
        saveChanges(){
            //Spremi promjene u profilu
        },
        goBack(){
        this.$router.push('/home')
        }
    }
}

</script>

<style scoped>
.home-container {
    padding: 20px;
    display: block;
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
.profile-edit{
    max-width: 300px;
    margin: auto;
    text-align: center;
}
.picture-upload{
    margin-top: 20px;
    margin-bottom: 20px;
}
.file-input{
    display: none;
}
.picture-label {
    display: inline-block;
    padding: 50px;
    border: 2px solid #bbbbbb;
    border-radius: 8px;
    cursor: pointer;
}
.picture-label i {
    margin-right: 8px;
}
.profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
}
.btn-full-width {
    width: 100px;
}
</style>