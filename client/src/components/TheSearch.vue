<template>
    <div class="search-div">
        <input v-model="inputValue" class="search" placeholder="Procure o artista/banda" type="text" @keydown.enter="onSearch">
        <img @click="onSearch()" class="search-icon" src="../assets/img/icons/search-icon.svg" alt="Ícone de pesquisa">
    </div>
</template>

<script>

// Import vue functions
import { ref } from 'vue'
// Import store
import { useStore } from 'vuex'

export default {
    setup(props, { emit }) {
        // Store initialization
        const store = useStore();

        // Variables
        let inputValue = ref('')

        // Handling research method
        const onSearch = () => {
            let artistFormated = inputValue.value.replace(' ', '+');
            // Calling the storeArtist action
            store.dispatch('storeArtist', `https://api.spotify.com/v1/search?q=${artistFormated}&type=artist&limit=8`)
                .catch(error => {
                    console.log(error)
                    emit('apperAlert', {
                        type: 'error',
                        message: 'Erro ao buscar artistas'
                    })
                })
        }

        // Returning the variables
        return {
            store,
            onSearch,
            inputValue
        }
    }

}

</script>

<style scoped>
/* Mobile First */
.search-div {
    position: relative;
    margin-bottom: 2rem;
}

.search {
    font-family: sans-serif;
    width: 90vw;
    height: 3.2rem;
    background-color: #35294D;
    color: #B3B1B1;
    font-size: 1em;
    border: none;
    outline: none;
    border-radius: 46px;
    padding: 1rem;
    box-sizing: border-box;
}

.search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    cursor: pointer;
}

@media (min-width: 780px) {
    .search {
        width: 70vw;
    }
}
</style>
