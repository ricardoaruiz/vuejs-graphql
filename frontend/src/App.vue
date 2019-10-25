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
							<span class="badge badge-primary">{{prefixes.length}}</span>
						</h4>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item" v-for="prefix in prefixes" :key="prefix">
										<div class="row">
											<div class="col-md">
												{{prefix}}
											</div>
											<div class="col-md text-right">
												<button class="btn btn-primary" @click="deletePrefix(prefix)">
													<span class="fa fa-trash"></span>
												</button>												
											</div>											
										</div>
									</li>
								</ul>
								<div class="mt-2 input-group">
									<input type="text" class="form-control" @keyup.enter="addPrefix(prefix)" v-model="prefix" />
									<div class="input-group-append">
										<button class="btn btn-primary" @click="addPrefix(prefix)">
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
							<span class="badge badge-primary">{{sufixes.length}}</span>
						</h4>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item" v-for="sufix in sufixes" :key="sufix">
										<div class="row">
											<div class="col-md">
												{{sufix}}
											</div>
											<div class="col-md text-right">
												<button class="btn btn-primary" @click="deleteSufix(sufix)">
													<span class="fa fa-trash"></span>
												</button>												
											</div>											
										</div>
									</li>
								</ul>
								<div class="mt-2 input-group">
									<input type="text" class="form-control" @keyup.enter="addSufix(sufix)" v-model="sufix" />
									<div class="input-group-append">
										<button class="btn btn-primary" @click="addSufix(sufix)">
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
import axios from "axios";
export default {
	name: "app",
	data() {
		return {
			prefix: "",
			sufix: "",
			prefixes: [],
			sufixes: [],
			domains: []
		};
	},
	methods: {
		addPrefix(prefix) {
			this.prefixes.push(prefix);
			this.prefix = "";
			this.generate();
		},
		addSufix(sufix) {
			this.sufixes.push(sufix);
			this.sufix = "";
			this.generate();
		},
		deletePrefix(prefix) {
			this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
			this.generate();
		},
		deleteSufix(sufix) {
			this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
			this.generate();
		},
		generate() {
			this.domains = [];
			for (const prefix of this.prefixes) {
				for(const sufix of this.sufixes) {
					this.domains.push(prefix + sufix);
				}
			}
		}
	},
	created() {
		axios.post("http://localhost:4000", {
			query: `
				{
					prefixes: items (type: "prefix") {
						id,
						type,
						description
					},
					sufixes: items (type: "sufix") {
						description
					}
				}
			`
		}).then(response => {
			const query = response.data;
			this.prefixes = query.data.prefixes.map(prefix => prefix.description);
			this.sufixes = query.data.sufixes.map(sufix => sufix.description);
		});
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
