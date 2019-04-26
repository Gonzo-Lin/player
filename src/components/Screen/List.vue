<template>
    <section class="screen_temp clearfix">
        <div class="f_l ">
            <mu-button small flat round class="link" @click.native="_screen_full">
                {{ act_tag_name }}
                <mu-icon right value="chevron_right" class="link_icon" ></mu-icon>
            </mu-button>
        </div>
        <div class="f_r mt-4">
            <span class="tags_btn" v-for="tag,key in filter_hots_tags" :key="key" 
                @click="_select_sheets_tag(tag)">{{tag.name}}</span>
        </div>
    </section>
</template>

<script>
export default {
    props:{
        screen_flag: false,
        act_tag_name: {
            type: String,
            value: '',
        }
    },
    data(){
        return{
            sheets_tags: [],
        }
    },
    mounted(){
        this._get_sheets_hots();
    },
    computed:{
        filter_hots_tags(){
            var sheets_tags = this.sheets_tags.sort(this._sort_by);

            return sheets_tags.filter((tags,key)=>{
                if( key < 3){
                    console.log(tags)
                    return tags;
                }
            })
        }
    },
    methods:{
        _get_sheets_hots(){
            this.$api.get(this.ApiPath.sheets.getHotSheet,{},success=>{
                this.sheets_tags = success.data.tags
            })
        },
        _screen_full(){
            this.$emit('screen_show');
        },
        _select_sheets_tag(_data){
            this.$emit('_select_sheets_tag',_data)
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@/style/base/_color.scss';

.screen_temp{
    padding: 5px 10px;
    margin-top: 5px;
    .link{
        padding: 2px 3px 2px 10px;
        border-radius: 20px;
        border: 1px solid $border_1;
    }
}


.tags_btn{
    font-size: 14px;
    vertical-align: middle;
    display: inline-block;
    margin-right: 10px;
    line-height: 1;
    &:last-child{
        margin-right: 0;
    }
}
</style>
