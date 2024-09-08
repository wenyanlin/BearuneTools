<template>
    <label class="themeSwitch">
        <input type="checkbox" @click="props.runEvent" :checked="props.defaultChecked">
        <div>
            <div></div>
        </div>
    </label>
</template>

<script setup>

const props = defineProps({
    runEvent: Function,
    defaultChecked: {
        type: Boolean,
        default: true
    }
});

</script>

<style lang="scss" scoped>
.themeSwitch {

    &>input {
        @apply absolute opacity-0;

        &+div {
            @apply cursor-pointer relative align-middle w-10 h-5 border rounded-full border-tint1 bg-white50 duration-200;

            &:hover {
                @apply border-primary;
            }
        }

        &+div>div {
            @apply absolute top-0 left-0 w-[1.125rem] border border-primary aspect-square rounded-full bg-white50 pointer-events-none duration-300;
        }

        &:checked+div {
            @apply bg-left-top border-tint1 bg-tint1;

            &>div {
                @apply translate-x-5 border-primary bg-primary;
            }
        }
    }
}
</style>