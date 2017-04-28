<template>
    <div id="pagination">
        <ul class="pagesize_box">
            <li @click="onPrevClick">上一页</li>
            <template v-for="(pageNo,index) in paging_number_list">
                <li>{{pageNo}}</li>
            </template>
            <li @click="onNextClick">下一页</li>
        </ul>
    </div>
</template>
<script>
    export default{
        name: 'pagination',
        props: ['option'],
        data(){
            return {
                paging_number_list: [],
            }
        },

        computed: {},

        methods: {
            //获取分页需要的渲染内容
            getPagingNoList(list){
//        let [totalPages, currentPage] = [list.totalPages, list.page.pageNo];
                let [currentPage, totalPages] = [parseInt(6), parseInt(6)];

                let page_number = [];
                let firsr_concat = [1, '...'];
                let last_concat = ['...', totalPages];

                if (totalPages <= 5) {
                    for (let i = 0; i < totalPages; i++) {
                        page_number.push(i + 1);
                    }
                } else {
                    if (currentPage === 1) {
                        page_number = [1, 2, '...', totalPages]
                    } else if (currentPage === 2) {
                        for (let i = 0; i < currentPage; i++) {
                            page_number.push(i + 1);
                        }
                        page_number = page_number.concat(last_concat);
                    } else if (currentPage >= 4 && currentPage <= totalPages - 3) {
                        page_number = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                    } else if (currentPage >= totalPages - 2 && currentPage === totalPages) {
                        page_number = [1, '...', totalPages - 1, totalPages]
                    } else {
                        page_number = [1, 2, 3, 4, '...', totalPages];
                    }
                }

                this.paging_number_list = page_number;


//        if (parseInt(currentPage) === 1) {
//          page_number = [currentPage, currentPage + 1];
//        } else {
//          page_number = [currentPage - 1, currentPage, currentPage + 1];
//          page_number = firsr_concat.concat(page_number);
//        }
//
//        if (parseInt(totalPages) >= 5) {
//          this.paging_number_list = page_number.concat(last_concat);
//        } else {
//          this.paging_number_list = page_number
//        }
            },

            //上一页
            onPrevClick(){
                console.log('1')
            },
            //下一页
            onNextClick(){

            },
            // 点击页码刷新数据
            onPageClick (index) {
//        this.pageMake(index);
            },
            //发起请求
            getRequest(option){
                console.log(option);
                lh_http('post', option.url, option.param).done(response => {
                    let response_data = response.data;

                    //如果请求失败抛出错误
                    if (!response.status) {
                        throw response_data
                    }
                    console.log(response_data.list, 12111);

                    this.getPagingNoList(response_data.list);

                    //原封不动的导出请求数据
                    this.$emit('pagination_response', response)
                })
            }
        },
        beforeMount(){
            this.getRequest(this.option);
        }
    }
</script>

<style lang="scss" scoped>
    #pagination {
        .pagesize_box {
            font-size: 0;
            li {
                cursor: pointer;
                line-height: 20px;
                font-size: 12px;
                color: #666;
                padding: 0 6px;
                border-radius: 2px;
                border: 1px solid #999999;
                display: inline-block;
                vertical-align: middle;
                &:not(:first-child) {
                    margin-left: 6px;
                }
            }
        }
    }
</style>
