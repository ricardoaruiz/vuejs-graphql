<template>
    <div>
        <h4 class="titulo-secao">
            {{this.title}}
            <span class="badge badge-primary">{{this.items.length}}</span>
        </h4>
        <div class="card">
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item" v-for="item in this.items" :key="item.id">
                        <div class="row">
                            <div class="col-md">
                                {{item.description}}
                            </div>
                            <div class="col-md text-right">
                                <button class="btn btn-primary" @click="deleteItem(item)">
                                    <span class="fa fa-trash"></span>
                                </button>												
                            </div>											
                        </div>
                    </li>
                </ul>
                <div class="mt-2 input-group">
                    <input type="text" 
                           class="form-control" 
                           @keyup.enter="addItem()" 
                           v-model="item" />

                    <div class="input-group-append">
                        <button class="btn btn-primary" @click="addItem()">
                            <span class="fa fa-plus"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemList',
    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            item: ''
        }
    },
    methods: {
        addItem() {
            if (this.item) {
                this.$emit('onAddItem', this.item);
                this.item = '';
            }
        },
        deleteItem(item) {
            this.$emit('onDeleteItem', item);
        }
    }
}
</script>

<style scoped>
.titulo-secao {
	margin-top: 20px;
}
</style>