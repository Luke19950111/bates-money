<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
        <div class="notes">
            <FormItem field-name="日期" type="date" placeholder="在此输入日期" :value.sync="record.createdAt"/>
        </div>
        <div class="notes">
            <FormItem field-name="备注" placeholder="在此输入备注" :value.sync="record.notes"/>
        </div>
        <Tags @update:value="record.tags = $event"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constants/recordTypeList';

    @Component(
        {
            components: {Tabs, Tags, FormItem, NumberPad}
        }
    )
    export default class Money extends Vue {
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()};

        recordTypeList = recordTypeList;

        get recordList() {
            return this.$store.state.recordList;
        }

        created() {
            this.$store.commit('fetchRecords');
        }

        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }

        saveRecord() {
            if (!this.record.tags || this.record.tags.length === 0) {
                return window.alert('请至少选择一个标签');
            }
            this.$store.commit('createRecord', this.record);
            this.record.notes = '';
        }
    }
</script>
<style lang="scss" scoped>
    ::v-deep .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        /*padding: 12px 0;*/
        /*border: 1px solid;*/
    }
</style>
