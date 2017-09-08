<template>
    <div class="goods">
        <div class="sub-nav" v-if="goods" ref="menuWrapper">
            <ul class="goodnav-list">
                <li v-for="(goodNav,index) in goods" class="goodnav-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <p class="text">
                        <span v-if="goodNav.type!=-1" class="icon" :class="classMap[goodNav.type]"></span>{{goodNav.name}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="foods-warpper" v-if="goods" ref="foodsWrapper">
            <ul class="foods-list">
                <li v-for="good in goods" class="food-list-hook">
                    <h1 class="name"> {{good.name}} </h1>
                    <ul>
                        <li v-for="food in good.foods" class="food-item" >
                            <div class="icon">
                                <img width="54" height="54" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="title"> {{food.name}} </h2>
                                <p class="desc"> {{food.description}} </p>
                                <p class="sell-data">
                                    <span class="count"> 月售{{food.sellCount}}份 </span>
                                    <span class="rating"> 好评率{{food.rating}}%</span>
                                </p>

                                <div class="price">
                                    ￥
                                    <span class="now">{{food.price}} </span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}} </span>
                                </div>
                            </div>
                            <div class="cartcontrol-warpper">
                                <cart-control :food="food"></cart-control>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from '@/components/shopcart/shopcart';
import cartControl from '@/components/cartcontrol/cartcontrol';

const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        };
    },
    created() {
        this.$http.get('api/goods').then((responts) => {
            let res = responts.data;
            if (res.errno === ERR_OK) {
                this.goods = Object.assign([], this.goods, res.data);
                this.$nextTick(() => {
                    this.__initScroll();
                    this._calculateHeight();
                });
            };
        });
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    methods: {
        selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodScroll.scrollToElement(el, 300);
        },
        // selectFood(food, event) {
        //     if (!event._constructed) {
        //         return;
        //     }
        //     this.selectedFood = food;
        //     this.$refs.food.show();
        // },
        __initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });

            this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        }
    },
    components: {
        shopcart,
        cartControl
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/common/css/mixin';
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .sub-nav {
        width: 80px;
        flex: 0 0 80px;
        .goodnav-list {
            background-color: #f3f5f7;
            .goodnav-item {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 54px;
                line-height: 14px;
                padding: 0 12px;
                font-size: 12px;
                font-weight: 200;
                color: rgb(77, 85, 93);
                box-sizing: border-box;
                .border-1px(bottom, rgba(7, 17, 27, 0.1));
                &:last-child::after {
                    border-bottom: 0px;
                }
                &.current {
                    color: rgb(7, 17, 27);
                    background: #fff;
                    .border-1px(bottom, #fff);
                }
                .text {
                    line-height: 14px;
                    .icon {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 2px;
                        vertical-align: top;
                        background-size: contain;
                        &.decrease {
                            .bg-img('images/decrease_3');
                        }
                        &.discount {
                            .bg-img('images/discount_3');
                        }
                        &.guarantee {
                            .bg-img('images/guarantee_3');
                        }
                        &.invoice {
                            .bg-img('images/invoice_3');
                        }
                        &.special {
                            .bg-img('images/special_3');
                        }
                    }
                }
            }
        }
    }
    .foods-warpper {
        flex: 1;
        .foods-list {
            width: 100%;
            .name {
                padding-left: 12px;
                height: 26px;
                background: #f3f5f7;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                line-height: 26px;
                color: rgb(147, 153, 159);
            }
            .food-item {
                position: relative;
                display: flex;
                margin: 0 18px;
                padding: 18px 0;
                .border-1px(top, rgba(7, 17, 27, 0.1));
                &:last-child:after {
                    display: none;
                }
                .icon {
                    flex: 0 0 54px;
                    width: 54px;
                    height: 54px;
                }
                .content {
                    flex: 1;
                    margin-left: 10px;
                    .title {
                        font-size: 14px;
                        line-height: 14px;
                        margin-top: 2px;
                        color: rgb(7, 17, 27);
                    }
                    .desc {
                        margin: 8px 0;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .sell-data,
                    .price {
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .sell-data {
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        margin-top: 8px;
                        color: rgb(240, 20, 20);
                        line-height: 24px;
                        .now {
                            font-size: 14px;
                            margin-right: 8px;
                            font-weight: 700;
                        }
                        .old {
                            color: rgb(147, 153, 159);
                            font-size: 10px;
                            text-decoration: line-through;
                        }
                    }
                }
                .cartcontrol-warpper {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>
