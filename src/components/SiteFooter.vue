<template>
    <div
        class="w-full h-fit py-8 flex justify-center border-t border-transparent bg-related3 xl:px-4 dark:border-greyBlue">
        <div class="w-innerWidth flex gap-4 justify-between items-center xl:w-full">
            <span><a href="mailto:bearune.official@gmail.com"
                    class="no-style-a hover:bg-transparent text-4xl text-black">
                    <IconMail />
                </a></span>
            <div class="flex gap-4">
                <span>© 2024 熊語清風 版權所有</span>
                <RouterLink to="/privacy-policy-statement" class="text-dGrey border-none">隱私權宣告
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { IconBin, IconMail } from '@/assets/icons';
</script>

<style lang="scss" scoped></style>