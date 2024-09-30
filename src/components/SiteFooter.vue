<template>
    <div class="w-full h-16 flex justify-center border-t border-transparent bg-related3 xl:px-4 dark:border-greyBlue">
        <div class="w-innerWidth flex gap-2 justify-center items-center xl:w-full">
            <span>© 2024 熊語清風</span>
            |
            <RouterLink to="/privacy-policy-statement" class="text-primary border-none">隱私權宣告
            </RouterLink>
            |
            <span class="flex justify-center items-center">
                <a href="mailto:bearune.official@gmail.com"
                    class="!text-dGrey no-style-a flex gap-1 justify-center items-center hover:bg-transparent">
                    <IconMail />
                    <span>聯絡信箱</span>
                </a>
            </span>
        </div>
    </div>
</template>

<script setup>
import { IconMail } from '@/assets/icons';
</script>

<style lang="scss" scoped></style>