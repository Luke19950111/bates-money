<template>
    <Layout>
        <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>
        <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>
        <ol>
            <li v-for="(group, index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id" class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constants/intervalList';
    import recordTypeList from '@/constants/recordTypeList';

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get result() {
            const {recordList} = this;
            type HashTableValue = { title: string; items: RecordItem[] }
            const hashTable: { [key: string]: HashTableValue } = {};
            for (let i = 0; i < recordList.length; i++) {
                const [date, time] = recordList[i].createdAt!.split('T');
                hashTable[date] = hashTable[date] || {title: date, items: []};
                hashTable[date].items.push(recordList[i]);
            }
            return hashTable;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        type = '-';
        intervalList = intervalList;
        interval = 'day';
        recordTypeList = recordTypeList;

        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.join(',');
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item {
        background: white;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }

    ::v-deep .interval-tabs-item {
        height: 48px;
    }

    %item{
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        @extend %item;
    }
    .record{
        background: white;
        @extend %item;
    }
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color: #999999;
    }
</style>