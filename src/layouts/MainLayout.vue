<template>
    <div class="min-h-screen">
        <SiteHeader></SiteHeader>
        <RouterView class="min-h-[calc(100vh-8.125rem)]"></RouterView>
        <SiteFooter></SiteFooter>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';
</script>

<style lang="scss" scoped></style>