<template>
	<div class="scroll_wrap" ref="scroll_wrap">
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	const DIRECTION_H = 'horizontal'
	const DIRECTION_V = 'vertical'

	export default{
		name: "my_scroll",
		props:{
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: false
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: null
			},
			pullup: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			},
			direction: {
				type: String,
				default: DIRECTION_V
			}
		},
		data(){
			return {

			}
		},
		created(){
		},
		mounted(){
            this.$nextTick(()=>{
                this._initScroll()
            })
            // setTimeout(() => {
            //     this._initScroll()
            // }, 20)
		},
		computed:{
		},
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        },
		methods:{
			_initScroll() {
                if (!this.$refs.scroll_wrap) {
                return
                }
                this.scroll = new BScroll(this.$refs.scroll_wrap, {
                probeType: this.probeType,
                click: this.click,
                eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
                })
                if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
                }
                if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                    this.$emit('scrollToEnd')
                    }
                })
                }
                if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                })
                }
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
			
		},
		filters:{
		},
		components:{ 
		}

	}
</script>

<style lang="scss" scoped>
.scroll_wrap{
    height: 100%;
    overflow: hidden;
}
</style>