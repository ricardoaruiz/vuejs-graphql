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
                            <div class="col-md-9">
                                {{item.description}}
                            </div>
                            <div class="col-md-2">
                                <span :class="bageClass(item.available)">
                                    {{item.available ? 'Disponível' : 'Não disponível'}}
                                </span>
                            </div>
                            <div class="col-md-1 text-right">
                                <button class="btn btn-primary" @click="deleteItem(item)" v-if="item.available">
                                    <span class="fa fa-shopping-cart"></span>
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
    name: 'DomainList',
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
        },
        bageClass(available) {
            return [
                'badge',
                {
                    'badge-success' : available,
                    'badge-danger' : !available,
                }
            ]
        }        
    }
}
</script>

<style scoped>
.titulo-secao {
	margin-top: 20px;
}
</style>