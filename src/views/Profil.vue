<template>
    <div class="container profile-edit">
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
            
        }
    }
}

</script>

<style>

</style>