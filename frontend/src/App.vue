<template>
	<section>
		<div class="slogan">
			<h1 class="titulo">Gerador de domínios</h1>
			<br />
			<h6 class="text-secondary">Gerador de nome de domínios</h6>
		</div>
		<div class="app">
			<div class="container">
				<div class="row">
					<div class="col-md">
						<h4 class="titulo-secao">
							Prefixos
							<span class="badge badge-primary">{{items.prefix.length}}</span>
						</h4>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item" v-for="prefix in items.prefix" :key="prefix.id">
										<div class="row">
											<div class="col-md">
												{{prefix.description}}
											</div>
											<div class="col-md text-right">
												<button class="btn btn-primary" @click="deleteItem(prefix)">
													<span class="fa fa-trash"></span>
												</button>												
											</div>											
										</div>
									</li>
								</ul>
								<div class="mt-2 input-group">
									<input type="text" class="form-control" @keyup.enter="addItem('prefix', prefix)" v-model="prefix" />
									<div class="input-group-append">
										<button class="btn btn-primary" @click="addItem('prefix', prefix)">
											<span class="fa fa-plus"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md">
						<h4 class="titulo-secao">
							Sufixos
							<span class="badge badge-primary">{{items.sufix.length}}</span>
						</h4>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item" v-for="sufix in items.sufix" :key="sufix.id">
										<div class="row">
											<div class="col-md">
												{{sufix.description}}
											</div>
											<div class="col-md text-right">
												<button class="btn btn-primary" @click="deleteItem(sufix)">
													<span class="fa fa-trash"></span>
												</button>												
											</div>											
										</div>
									</li>
								</ul>
								<div class="mt-2 input-group">
									<input type="text" class="form-control" @keyup.enter="addItem('sufix',sufix)" v-model="sufix" />
									<div class="input-group-append">
										<button class="btn btn-primary" @click="addItem('sufix',sufix)">
											<span class="fa fa-plus"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md">
						<h4 class="titulo-secao">
							Domínios
							<span class="badge badge-primary">{{domains.length}}</span>
						</h4>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item" v-for="domain in domains" :key="domain">{{domain}}</li>
								</ul>
								<div class="mt-3 input-group">
									<input type="text" class="form-control" />
									<div class="input-group-append">
										<button class="btn btn-primary">
											<span class="fa fa-plus"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import DomainService from './services/DomainService'
import axios from "axios";
export default {
	name: "app",
	data() {
		return {
			prefix: "",
			sufix: "",
			items: {
				prefix: [],
				sufix: []
			},
			domains: []
		};
	},
	methods: {
		listItems(type) {
			return DomainService.listItems(type)
				.then(response => {
					this.items[type] = response.data.items
				})			
		},		
		addItem(type, description) {
			DomainService.addItem({type, description})
				.then(response => {
					this.items[type].push(response.data.newItem);
					
					if (type == "prefix") this.prefix = "";
					else this.sufix = "";

					this.generate();
			});
		},
		deleteItem(item) {
			DomainService.removeItem(item)
				.then(response => {
					const deleted = response.data.deleted;
					if (deleted) {
						const deletedItem = this.items[item.type].find(i => i.id === item.id);
						this.items[item.type].splice(this.items[item.type].indexOf(deletedItem), 1);
						this.generate();
					}	
				});
		},
		generate() {
			this.domains = [];

			for (const prefix of this.items.prefix) {
				for(const sufix of this.items.sufix) {
					this.domains.push(prefix.description + sufix.description);
				}
			}
		}
	},
	created() {
		Promise.all([
			this.listItems("prefix"),
			this.listItems("sufix")
		]).then(() => this.generate());
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
