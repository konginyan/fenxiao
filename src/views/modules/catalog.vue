<template>
	<div class="catalog-wrap">
		<div class="catalog-content" v-for="(item,i) in catalogList">
			<text class="catalog-subtitle">{{item.title}}</text>
			<div class="catalog-list" v-for="inner in item.detailList">
				<div class="catalog-item"  @click="catalogSelect(inner)">
					<text class="catalog-index" :class="[inner.cataIndex===selectIndex ? 'catalog-active' : '']">{{inner.cataIndex}}</text>
					<icon v-if="inner.type==='Video'" class="catalog-play " :class="[inner.cataIndex===selectIndex ? 'catalog-active' : '']" name="icon-play" ></icon>
					<icon v-if="inner.type==='html'" class="catalog-play" size="30px" :class="[inner.cataIndex===selectIndex ? 'catalog-active' : '']" name="icon-web" ></icon>
					<text class="catalog-title" :class="[inner.cataIndex===selectIndex ? 'catalog-active' : '']">{{inner.name}}</text>
					<div v-if="false" class="catalog-total">127M</div>
					<icon v-if="false" class="catalog-down" name="icon-download"></icon>
					<icon v-if="false" class="catalog-loading" name="icon-loading"></icon>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from '../../js/ajax.js';

const storage = weex.requireModule('storage');
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				selectIndex : 0,
				courseId : '',
				catalogList : [],
				total : 0,
				
			}
		},
		mounted(){
			this.courseId = buiweex.getPageParams().courseId;
			this.getCatalog();	 
			this.getRecord();
			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			catalogSelect (inner) {
				
				this.selectIndex = inner.cataIndex;
				let type = inner.type;
				if (type === 'Video') {
					this.$emit('videoSrc' , inner.url);
					// console.log(inner.url);
					this.saveRecord(inner);
				}else if(type === 'html'){
					buiweex.push(buiweex.getContextPath() + "/web.weex.js",{
						url : inner.url
					});
				}
				
				// console.log(inner);
				
			},
			saveRecord (inner) {
				let mainId = inner.mainId,
					cataIndex = inner.cataIndex;
				storage.setItem(this.courseId, cataIndex);
			},
			getRecord () {
				let courseId = this.courseId;
				storage.getItem(courseId,e=>{
					let data = e.data;
					this.selectIndex = data;
					console.log(data);
				})
			},
			getCatalog() {
				ajax({
					url : 'ba/api/course/catalogweex',
					data : {
						id : this.courseId,
					}
				}).then((res) =>{
					
					res.r && res.r.forEach(item=>{
						item && item.detailList && item.detailList.forEach(inner=>{
							this.total += 1;
							let cataIndex = this.total < 10 ? '0' + this.total : this.total;
							inner.cataIndex = cataIndex;
						})
					})

					this.catalogList = res.r;
					// console.log(this.catalogList);
					
				},(errorT,status) =>{
					
				})
			},
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    }
	}
</script>

<style src="../../css/customer/catalog.css"></style>


