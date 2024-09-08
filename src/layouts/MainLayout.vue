<template>
    <SiteHeader></SiteHeader>
    <RouterView></RouterView>
    <SiteFooter></SiteFooter>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';
</script>

<style lang="scss" scoped></style>