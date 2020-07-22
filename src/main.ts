import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

Vue.config.productionTip = false;

// tagList store
window.tagList = tagListModel.fetch();
window.findTag = (id) => {
    return window.tagList.filter(t => t.id === id)[0];
};
window.createTag = (name) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
        window.alert('标签名重复了');
    } else if (message === 'success') {
        window.alert('添加成功');
    }
};
window.removeTag = (id) => {
    return tagListModel.remove(id);
};
window.updateTag = (id, name) => {
    return tagListModel.update(id, name);
};

// recordList store
window.recordList = recordListModel.fetch();
window.createRecord = (record) => recordListModel.create(record);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
