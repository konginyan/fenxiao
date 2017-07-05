<template>
	<div class="catalog-wrap">
		<div class="catalog-content" v-for="(item,i) in catalogList">
			<text class="catalog-subtitle">{{item.title}}</text>
			<div class="catalog-list" v-for="inner in item.detailList">
				<div class="catalog-item"  @click="catalogSelect(inner)">
					<text class="catalog-index" :class="[inner.cataIndex===selectIndex ? 'catalog-active' : '']">{{inner.cataIndex}}</text>
					<icon v-if="inner.type==='Video'" class="catalog-play " :class="[inner.cataIndex==selectIndex ? 'catalog-active' : '']" name="icon-play" ></icon>
					<icon v-if="inner.type==='html'" class="catalog-play" size="30px" :class="[inner.cataIndex==selectIndex ? 'catalog-active' : '']" name="icon-web" ></icon>
					<text class="catalog-title" :class="[inner.cataIndex===selectIndex ? 'catalog-active' : '']">{{inner.name}}</text>
					<div v-if="false" class="catalog-total">127M</div>
					<icon v-if="false" class="catalog-down" name="icon-download"></icon>
					<icon v-if="false" class="catalog-loading" name="icon-loading"></icon>
				</div>
			</div>
		</div>
		<prompt v-if="isShowPrompt" text="还没有目录" src="/image/empty-catalog.png"></prompt>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from '../../js/ajax.js';
import prompt from '../components/prompt.vue';
const storage = weex.requireModule('storage');
var globalEvent = weex.requireModule('globalEvent');

	export default {
		props : {
			currentIndex : {
				type : String
			}
		},
		data () {
			return {
				selectIndex : 0,
				courseId : '',
				catalogList : [],
				total : 0,
				isShowPrompt : false
				
			}
		},
		mounted(){
			this.courseId = buiweex.getPageParams().courseId;
			this.getCatalog();	 
			this.getRecord();
			this.selectIndex = this.currentIndex;


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
					
				}else if(type === 'html'){
					this.$emit('webSrc' , inner.url);
					buiweex.push(buiweex.getContextPath() + "/web.weex.js",{
						url : inner.url,
						name : inner.name
					});
				}
				this.saveRecord(inner);
				
				
			},
			saveRecord (inner) {
				storage.setItem(this.courseId,JSON.stringify(inner));
			},
			getRecord () {
				let courseId = this.courseId;
				try{
					storage.getItem(courseId,e=>{
						// buiweex.alert(e.data !== 'undefined');
						if (e.data != 'undefined') {

							let data = JSON.parse(e.data);
							this.selectIndex = data.cataIndex;
						}else{
							this.selectIndex = '01';
						}
						
						
					})
				}catch(e){
					this.selectIndex = '01';
				}
				
			},
			getCatalog() {
				ajax({
					url : 'ba/api/course/catalogweex',
					data : {
						id : this.courseId,
					}
				}).then((res) =>{
					if (res.r && res.r.length === 0) {
						this.isShowPrompt = true;
					}else{
						this.isShowPrompt = false;
					}
					res.r && res.r.forEach(item=>{
						item && item.detailList && item.detailList.forEach(inner=>{
							this.total += 1;
							let cataIndex = this.total < 10 ? '0' + this.total : this.total;
							inner.cataIndex = cataIndex;
						})
					})

					this.catalogList = res.r || [];
					// console.log(this.catalogList);
					
				},(errorT,status) =>{
					
				})
			},

		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	prompt
	    },
	    watch : {
			currentIndex (val) {
				console.log(val);
				this.selectIndex = val;
			}
		}
	}
</script>

<style src="../../css/customer/catalog.css"></style>


