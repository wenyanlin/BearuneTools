<template>
    <div>
        <div class="text-sm">
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    item: {
        type: Object,
        default: {
            rawfile: {
                webkitRelativePath:'',
                type: '',
                size: 0,
                name: '',
                lastModifiedDate: {},
                lastModified: 0,
                webkitRelativePath: '',
            },
            originalSize: '',
            compressedSize: '',
            path: ''
        }
    }
})

</script>

<style lang="scss" scoped></style>