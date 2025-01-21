<script setup>
import { ref } from 'vue';
import Carousel from 'primevue/carousel';

const props = defineProps({
    sectionTitle: String
})

const comics = ref([   
        "asterix.jpg",
        "blueberry.jpg",
        "scottpilgrim1.jpg",
        "spiderman.jpg",
        "starwarsep1.jpg",
        "valerian.jpg"
    ])

const comicImage = (keyword) => {
    return "/images/comicsCover/" + keyword;
}

</script>

<template>
    <div class="p-7">
        <h2 class="uppercase text-3xl font-bold">{{ sectionTitle }}</h2>
        <section class="flex gap-x-2 p-2 relative overflow-hidden">
            <div v-for="comic of comics" class="w-60 h-80">
                <img :src="comicImage(comic)" :alt="comic" class="w-full h-full">
            </div>
        </section>
    </div>
</template>

<style scoped></style>