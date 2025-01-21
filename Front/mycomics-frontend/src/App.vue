<script setup>
import ComicsSection from "./components/ComicsSection.vue";
import Header from "./components/Header.vue"
import { ref } from "vue";

const categories = ref(["Aventure", "ComicStrip", "SF", "Western"])

const categoryImage = (keyword)=> {
  return "/images/category/logo-" + keyword + ".png";
}
</script>

<template>
  <Header />
  <div id="hero">
    <img src="/images/Garfield.png" alt="logo garfield">
  </div>
  <div class="flex md:justify-center gap-3 p-8">
    <div class="category-tile" v-for="category of categories">
      <img :src="categoryImage(category)" alt="">
    </div>
  </div>
  <ComicsSection sectionTitle="les nouveautés"/>

</template>


<style scoped>
#hero {
  background-image: url("/images/herolarge.jpg");
  height: 90vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hero img {
  height: 50vh;
}

.category-tile{
  border: 2px solid white;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: .5rem;
}
</style>
