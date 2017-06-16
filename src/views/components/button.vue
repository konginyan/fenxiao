<template>
	<!-- <div class="btn-wrap">
		<div class="inner"> -->
			<text :class="['btn',
						 'btn-' + (disabled?'disabled':type),
						 'btn-' + (size?size:''),
						 plain ? ('btn-'+type +'-plain'):''
						  
						 ]"
				  :style="style"
				  @longpress="_longpress()"
				  @click="_click()"
				  >{{value}}</text>
	<!-- 	</div>
		</div> -->
</template>
<script>

	export default {
		props : {
			"type": {
				type : String,
				default: 'default'
			},
			"size": {
				type : String,
				default: ''
			},
			"value": {
				type : String,
				default: 'Button'
			},
            "disabled": {
            	type : Boolean,
            	default: false
            },
            "radius": {
            	type : String,
            	default: '10px'
            },
            "plain" : {
            	type : Boolean,
            	default: false
            }
		},
		data () {
			return {}
		},
		methods: {
            "_click": function (e) {
                if (!this.disabled) {
                    this.$emit("click");
                }
            },
            "_longpress": function (e) {
                if (!this.disabled) {
                    this.$emit("longpress");
                }
            }
        },
        computed : {
        	style(){
        		return {
        			'border-radius' : this.radius
        		}
        	}
        },
        mounted (){
        	
        }
	}
</script>
<style lang="sass">
	@import "../../css/common.scss";
	/* .btn-wrap{
		flex-direction : row;
		
	}
	.inner{
		flex : 1;
		flex-direction : row;
	} */
	@mixin border($width,$style,$color){
		border-left-width: $width;
		border-left-style: $style;
		border-left-color: $color;
		border-right-width: $width;
		border-right-style: $style;
		border-right-color: $color;
		border-bottom-width: $width;
		border-bottom-style: $style;
		border-bottom-color: $color;
		border-top-width: $width;
		border-top-style: $style;
		border-top-color: $color;
	}
	@mixin padding($ptb,$plr){
		padding-top: $ptb;
		padding-bottom: $ptb;
		padding-left: $plr;
		padding-right: $plr;
	}
	.btn{
		// flex : 1;
		font-size: 26px;
		text-align: center;
		@include padding(20px,40px);

	}

	.btn-large{
		font-size: 30px;
		@include padding(28px,60px);
	}
	.btn-small{
		@include padding(10px,20px);
	}

	.btn-primary {
	  background-color: $color_primary;
	  color: $color_white;
	}
	.btn-primary-plain{
		background-color: $color_white;
		color : $color_primary;
		@include border(1px,solid,$color_primary);
	}
	.btn-primary-plain:active{
		background-color: $color_white;
		color : lighten($color_primary,10%);
		@include border(1px,solid,lighten($color_primary,10%));
	
	}
	.btn-primary:active {
	  background-color: $color_dark_primary;
	}





	.btn-success {
	  background-color: $color_success;
	  color: $color_white;
	}
	.btn-success-plain{
		background-color: $color_white;
		color: $color_success;
		@include border(1px,solid,$color_success);
	}
	.btn-success-plain:active{
		background-color: $color_white;
		color : lighten($color_success,10%);
		@include border(1px,solid,lighten($color_success,10%));
	}

	.btn-success:active {
	  background-color: $color_success_active;
	}

	.btn-info {
	  background-color: $color_light_primary;
	  color: $color_white;
	}
	.btn-info-plain{
		background-color: $color_white;
		color: $color_light_primary;
		@include border(1px,solid,$color_info);
	}
	.btn-info-plain:active{
		background-color: $color_white;
		color : lighten($color_info,10%);
		@include border(1px,solid,lighten($color_info,10%));
	}

	.btn-info:active {
	  background-color: $color_primary;
	}

	.btn-warning {
	  background-color: $color_warning;
	  color: $color_white;
	}
	.btn-warning-plain{
		background-color: $color_white;
		color: $color_warning;
		@include border(1px,solid,$color_warning);
	}
	.btn-warning-plain:active{
		background-color: $color_white;
		color : lighten($color_warning,10%);
		@include border(1px,solid,lighten($color_warning,10%));
	}

	.btn-warning:active {
	  background-color: $color_warning_active;
	}

	.btn-danger {
	  background-color: $color_danger;
	  color: $color_white;
	}

	.btn-danger-plain {
	  background-color: $color_white;
	  color: $color_danger;
	  @include border(1px,solid,$color_danger);
	}
	.btn-danger-plain:active{
		background-color: $color_white;
		color : lighten($color_danger,10%);
		@include border(1px,solid,lighten($color_danger,10%));
	}


	.btn-danger:active {
	  background-color: $color_danger_active;
	}

	.btn-disabled {
	  background-color: $color_disabled;
	  border-width: 1px;
	  border-style: solid;
	  border-color: $color_default_active;
	  color: $color_subtitle;
	}

	.btn-disabled-plain {
	  background-color: $color_white;
	  color: $color_disabled;
	  @include border(1px,solid,$color_disabled);
	}

	.btn-default {
	  background-color: $color_default;
	  border-width: 1px;
	  border-style: solid;
	  border-color: $color_default_active;
	}
	.btn-default-plain {
	  background-color: $color_white;
	  color: $color_default;
	  @include border(1px,solid,$color_default);
	}
	.btn-default:active {
	  background-color: $color_default_active;
	}

	.btn-normal {
	  background-color: $color_white;
	}
	.btn-normal-plain {
	  background-color: $color_white;
	  color: $color_default;
	}
	.btn-normal:active {
	  background-color: $color_default_active;
	}



</style>