<template>
    <Layout>
        <div class="tags">
            <router-link v-for="tag in tags" :key="tag.id" class="tag" :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    import {mixins} from 'vue-class-component';
    import {TagHelper} from '@/mixins/TagHelper';

    @Component({
        components: {Button},
        computed: {
            tags() {
                return this.$store.state.tagList;
            }
        }
    })
    export default class Labels extends mixins(TagHelper) {
        created() {
            this.$store.commit('fetchTags');
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        background: #ffffff;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
            min-height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e6e6e6;

            svg {
                color: #666;
                margin-right: 16px;
                width: 16px;
                height: 16px;
            }
        }
    }

    .createTag-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }


</style>