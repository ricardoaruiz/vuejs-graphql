<template>
	<section>

		<!-- Header -->
		<div class="slogan">
			<h1 class="titulo">Gerador de domínios</h1>
			<h6 class="text-secondary">Gerador de nome de domínios</h6>
		</div>

		<!-- Content -->
		<div class="app container">

			<div class="row">

				<!-- Prefixos -->
				<div class="col-md">
					<ItemList 
							title="Prefixos" 
							:items="items.prefix" 
							@onAddItem="addPrefix"
							@onDeleteItem="deleteItem"
					/>
				</div>					

				<!-- Sufixos -->
				<div class="col-md">
					<ItemList 
							title="Sufixos" 
							:items="items.sufix" 
							@onAddItem="addSufix"
							@onDeleteItem="deleteItem"
					/>
				</div>
				
			</div>

			<div class="row">

				<!-- Domínios -->
				<div class="col-md">
					<DomainList 
							title="Domínios" 
							:items="domains"
					/>
				</div>

			</div>
		</div>

	</section>
</template>

<script>
import ItemList from './components/ItemList';
import DomainList from './components/DomainList';
import DomainService from './services/DomainService'

export default {
	name: "app",
	components: {
		ItemList, DomainList
	},
	data() {
		return {
			items: {
				prefix: [],
				sufix: []
			},
			domains: []
		};
	},
	methods: {
		addPrefix(prefix) {
			this.addItem('prefix', prefix);
		},
		addSufix(sufix) {
			this.addItem('sufix', sufix);
		},		
		listItems(type) {
			return DomainService.listItems(type)
				.then(response => {
					this.items[type] = response.data.items
				})			
		},
		listDomains() {
			return DomainService.listDomains()
				.then(response => this.domains = response.data.domains)
		},
		addItem(type, description) {
			DomainService.addItem({type, description})
				.then(response => {
					this.items[type].push(response.data.newItem);
					
					if (type == "prefix") this.prefix = "";
					else this.sufix = "";

					this.listDomains();
			});
		},
		deleteItem(item) {
			DomainService.removeItem(item)
				.then(response => {
					const deleted = response.data.deleted;
					if (deleted) {
						const deletedItem = this.items[item.type].find(i => i.id === item.id);
						this.items[item.type].splice(this.items[item.type].indexOf(deletedItem), 1);
						
						this.listDomains();
					}	
				});
		},
		generate() {
			this.domains = [];

			let id = 0;
			for (const prefix of this.items.prefix) {
				id++;
				for(const sufix of this.items.sufix) {
					this.domains.push({
						id,
						description: prefix.description + sufix.description
					});
				}
			}
		}
	},
	created() {
		Promise.all([
			this.listItems("prefix"),
			this.listItems("sufix"),
			this.listDomains()
		]).catch(error => console.log(error));
	}
};
</script>

<style>
.slogan {
	text-align: center;
}
.titulo {
	margin: 30px 0;
}
.subtitulo {
	margin: 30px 0;
}
.app {
	background: #f1f1f1;
	padding: 30px;
}
.titulo-secao {
	margin-top: 20px;
}
</style>
