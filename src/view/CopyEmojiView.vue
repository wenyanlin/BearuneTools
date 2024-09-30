<template>
    <div class="h-full flex justify-center items-center sm:px-4">
        <div class="w-innerWidth columns justify-center items-center py-8 xl:px-4 sm:w-full">
            <div class="col-span-12 flex flex-col sm:col-span-8 xs:col-span-4">
                <h1>Emoji大全</h1>
                <div>點擊表情符號即可複製。目前共有<b>{{ total }}</b>種Emjio可以複製，並提供膚色及髮色切換。</div>
            </div>
            <div
                class="col-span-12 grid grid-cols-12 gap-6 relative sm:col-span-8 sm:grid-cols-8 xs:col-span-4 xs:grid-cols-4">
                <div class="col-span-2 flex flex-col gap-2 sticky top-20 h-fit xl:col-span-3 sm:col-span-8 sm:static xs:col-span-4">
                    <div class="flex flex-col p-4 frame gap-2 bg-white">
                        <h3>過濾器</h3>
                        <div class="flex flex-col gap-2 pb-2 border-b border-greyBlue">
                            <!-- <h4>目前使用</h4> -->
                            <div class="filtering flex justify-between items-center">
                                <div class="tag" v-if="isTargetSkin !== 'all'" @click="switchSkin('all')">
                                    <div>{{
                                        emojiNavSkin.find((emoji) => emoji.codePoint === isTargetSkin).name }}</div>
                                    <div class="close w-4 h-4"></div>
                                </div>
                                <!-- <div v-for="item in isActive" :key="item"></div> -->
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h4>膚色</h4>
                            <div class="flex justify-between flex-wrap sm:justify-start">
                                <div v-for="(item, index) in emojiNavSkin" :key="item.slug"
                                    :class="{ 'active': isTargetSkin === item.codePoint }"
                                    class="nav-skin cursor-pointer border-b-2 border-transparent hover:bg-sliver"
                                    @click="switchSkin(item.codePoint)">
                                    <span class="text-xl">{{ emojiNavSkin[index].character }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="flex flex-col gap-2">
                            <h4>髮色</h4>
                            <div class="flex justify-between">
                                <div v-for="(item, index) in emojiNavHairColor" :key="item">
                                    <span class="text-xl">{{ emojiNavHairColor[index] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h4>情緒</h4>
                            <div class="flex justify-between">
                                <div v-for="(item, index) in emojiNavMood" :key="item">
                                    <span class="text-xl">{{ emojiNavMood[index] }}</span>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="flex flex-col p-4 frame gap-2 bg-white">
                        <h3>近期使用</h3>
                        <div class="text-xl">
                            <span
                                class="segoe-ui-emoji inline-flex py-1 text-center border border-transparent cursor-pointer rounded select-none hover:border-primary active:bg-greyBlue"
                                v-for="item in history" :key="item" @click="copyEmoji(`${item}`)">
                                {{ item }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-span-8 flex flex-col gap-2
                sm:col-span-7 xs:col-span-4">
                    <!-- <div class="frame emoji-section" id="recent">
                        <div class="p-4 border-b border-lGrey dark:border-sliver">
                            <h2><span class="segoe-ui-emoji">🕙</span>近期使用</h2>
                        </div>
                        <div class="p-4 leading-8 text-3xl min-h-16">

                        </div>
                    </div> -->
                    <div class="frame emoji-section" v-for="(cate, index) in allEmoji" :key="cate.slug" :id="cate.slug">
                        <div class="p-4 border-b border-lGrey dark:border-sliver">
                            <h2>
                                <span class="segoe-ui-emoji"
                                    v-if="cate['slug-en'] !== 'people-body' || (cate['slug-en'] === 'people-body' && isTargetSkin === 'all')">{{
                                        emojiNav[index]
                                    }}</span>
                                <span class="segoe-ui-emoji" v-else>{{
                                    emojiNavSkin.find((emoji) => emoji.codePoint === isTargetSkin).character }}</span>
                                {{ cate.slug }}
                            </h2>
                        </div>
                        <div class="p-4 leading-8 text-3xl"
                            v-if="cate['slug-en'] !== 'people-body' || !targetSkinSet.length">
                            <span
                                class="segoe-ui-emoji inline-flex py-1 text-center border border-transparent cursor-pointer rounded select-none hover:border-primary active:bg-greyBlue"
                                v-for="item in cate.subCategories" :key="item.slug"
                                @click="copyEmoji(`${item.character}`)">
                                {{ item.character }}
                            </span>
                        </div>
                        <div class="p-4 leading-8 text-3xl" v-else>
                            <span
                                class="segoe-ui-emoji inline-flex py-1 text-center border border-transparent cursor-pointer rounded select-none hover:border-primary active:bg-greyBlue"
                                v-for="item in targetSkinSet" :key="item.slug" @click="copyEmoji(`${item.character}`)">
                                {{ item.character }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 sticky top-20 h-fit flex flex-col frame xl:col-span-1 xs:col-span-4 xs:hidden">
                    <div class="p-4 flex flex-col gap-2 lg:px-2">
                        <h3 class="xl:hidden">目錄</h3>
                        <div class="flex flex-col justify-between lg:items-center">
                            <!-- <div @click="scrollToSection('recent')" id="nav-recent" class="segoe-ui-emoji nav-emoji pl-2 relative border border-transparent cursor-pointer rounded select-none flex items-center
                                hover:bg-sliver active:bg-greyBlue">
                                <span class="text-2xl">🕙</span><span class="text-base">近期使用</span>
                            </div> -->
                            <div v-for="(item, index) in allEmoji" :key="item" @click="scrollToSection(item.slug)"
                                :id="`nav-${item.slug}`" class="segoe-ui-emoji nav-emoji pl-2 relative border border-transparent cursor-pointer rounded select-none flex items-center
                                hover:bg-sliver active:bg-greyBlue xl:pl-0">
                                <span class="text-2xl lg:text-xl"
                                    v-if="item['slug-en'] !== 'people-body' || (item['slug-en'] === 'people-body' && isTargetSkin === 'all')">
                                    {{ emojiNav[index] }}
                                </span>
                                <span class="text-2xl lg:text-xl" v-else>{{ emojiNavSkin.find((emoji) => emoji.codePoint === isTargetSkin).character }}</span>
                                <span class="text-base xl:hidden">{{ item.slug }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import allEmoji from '@/plugins/emoji.json';

const peopleEmoji = ref({});

const emojiNav = [
    "☺️", "👶", "🐻", "🍉", "⚾", "🌏", "📌", "🛜", "🏳️‍🌈"
];

const isTargetSkin = ref('all');
const targetSkinSet = ref([]);
const emojiNavSkin = [
    {
        name: '標準皮膚',
        character: '👶',
        codePoint: ''
    },
    {
        name: '淺皮膚',
        character: '👶🏻',
        codePoint: '1F3FB'
    },
    {
        name: '黃皮膚',
        character: '👶🏼',
        codePoint: '1F3FC'
    },
    {
        name: '淺褐皮膚',
        character: '👶🏽',
        codePoint: '1F3FD'
    },
    {
        name: '褐皮膚',
        character: '👶🏾',
        codePoint: '1F3FE'
    },
    {
        name: '深皮膚',
        character: '👶🏿',
        codePoint: '1F3FF'
    }
];
// const emojiNavHairColor = [
//     "👩‍🦳", "👱‍♀️", "👩", "👩‍🦰", "👩🏽", "👩🏻"
// ];
// const emojiNavMood = [
//     "😀", "😐", "🙁"
// ]
const total = ref(0);

const switchSkin = (code) => {
    isTargetSkin.value = code;
    if (code == 'all') {
        targetSkinSet.value = peopleEmoji.value.subCategories;
    }
    else if (code !== '') {
        const normalEmoji =
            targetSkinSet.value = peopleEmoji.value.subCategories.filter((emoji) => emoji.codePoint.split(' ')[1] === code || emoji.hasSkin === false);
    }
    else {

        targetSkinSet.value = peopleEmoji.value.subCategories.filter((emoji) => !emojiNavSkin.find((skin) => skin.codePoint === emoji.codePoint.split(' ')[1]));
    }
};


const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        const topOffset = 96;
        const sectionPosition = section.getBoundingClientRect().top + window.scrollY - topOffset;
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
};

const getEmojiLength = () => {
    total.value = allEmoji.reduce((acc, c) => {
        return acc + c.subCategories.length;
    }, 0);
};

const history = ref(JSON.parse(localStorage.getItem('emojiHistory')) || []);

const addEmojiToHistory = (emoji) => {
    if (!history.value.includes(emoji)) {
        history.value.push(emoji);
        if (history.value.length > 18) {
            history.value.shift();
        }
        localStorage.setItem('emojiHistory', JSON.stringify(history.value));
    }
};

const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji).then(() => {
        addEmojiToHistory(emoji);
    });
};

const active = ref([]);

const updateActive = (id, ra) => {
    const index = active.value.findIndex(i => i.id === id);
    if (index === -1) {
        active.value.push({
            id,
            ratio: ra
        });
    } else {
        active.value[index].ratio = ra;
    }
    active.value.sort((a, b) => {
        // 首先按 ratio 排序
        if (b.ratio === a.ratio) {
            // 如果 ratio 相同，則按其在視窗中的出現順序進行排序
            const aElement = document.getElementById(a.id);
            const bElement = document.getElementById(b.id);

            // 判斷元素的相對位置
            return (aElement.getBoundingClientRect().top - bElement.getBoundingClientRect().top);
        }
        return b.ratio - a.ratio; // 否則按 ratio 排序
    });;
    // console.log(active.value);
};
const observer = () => {
    const callback = (entries) => {
        entries.forEach((entry) => {
            const entryId = entry.target.id;
            if (entry.isIntersecting) {
                updateActive(entryId, entry.intersectionRatio);
                document.querySelectorAll(".nav-emoji").forEach((tocItem) => {
                    tocItem.classList.remove("target");
                });
                const targetElement = document.querySelector(`#nav-${active.value[0].id}`);
                if (targetElement) {
                    targetElement.classList.add('target'); // 使用 classList.add 添加類名
                }
            } else {
                const index = active.value.findIndex(i => i.id === entryId);
                if (index !== -1) {
                    active.value.splice(index, 1);
                }
            }
        });
    };
    const observer = new IntersectionObserver(callback, {
        rootMargin: '-64px 0px 0px 0px',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    });
    const emojiSection = document.querySelectorAll('.emoji-section');
    emojiSection.forEach((item) => observer.observe(item));
};

onMounted(() => {
    // getAllEmoji();
    peopleEmoji.value = allEmoji.find((item) => item['slug-en'] === 'people-body');
    getEmojiLength();
    observer();

});

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');

.noto-color-emoji-regular {
    font-family: 'Noto Color Emoji', 'Noto Color Emoji', sans-serif;
    font-weight: 400;
}

.segoe-ui-emoji {
    font-family: 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
    font-weight: 400;
}

.filtering {
    .tag {
        @apply cursor-pointer bg-primary text-sm flex justify-center items-center py-1 px-2 rounded text-white duration-150;
        @apply hover:bg-shade2 hover:text-sliver;

        .close {
            @apply relative;

            &::before,
            &::after {
                @apply content-[''] absolute m-auto inset-0 w-3/4 h-0.5 bg-white rounded;
            }

            &::before {
                @apply rotate-45;
            }

            &::after {
                @apply -rotate-45;
            }
        }
    }
}

.nav-skin {
    &.active {
        @apply bg-sliver border-primary;
    }
}

.nav-emoji {
    &::before {
        @apply content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-0.5 h-full bg-greyBlue rounded lg:hidden;
    }

    &.target {
        @apply text-primary bg-sliver;

        &::before {
            @apply content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-0.5 h-full bg-primary rounded lg:hidden;
        }
    }
}
</style>