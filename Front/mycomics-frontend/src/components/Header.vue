<script setup>
import { ref } from 'vue';

const subscriberName = ref("");

</script>


<template>
    <header class="p-4 bg-gray-900 flex justify-between align-center">
        <img src="/images/logo.svg" alt="">
        <nav>
            <ul class="flex gap-5">
                <li>
                    <a href="" class="uppercase">
                        home
                    </a>
                </li>
                <li>
                    <a href="" class="uppercase">
                        my favorites
                    </a>
                </li>
                <li>
                    <a href="" class="uppercase">
                        comics
                    </a>
                </li>

            </ul>
        </nav>
    </header>
</template>




<style scoped>
header {
    display: flex;
    height: 10vh;
}

img {
    height: 80%;
}
</style>