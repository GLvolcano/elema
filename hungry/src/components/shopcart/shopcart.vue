<template>
    <div class="shopCart">
        <div class="content">
            <div class="cart-left">
                <div class="cart-logo">
                    <div class="cart-icon " :class="{'highlight':this.totalCount>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="total-price" :class="{'highlight':this.totalPrice>0}">￥{{totalPrice}}</div>
                <div class="delivery-pay">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="cart-right">
                <div class="pay" :class="payClass">
                    {{pay}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import cartControl from '@/components/cartcontrol/cartcontrol';
export default {
    props: {
        selectFoods: {
            type: Array,
            default() {
                return [{
                    price: 10,
                    count: 1
                }];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 20
        }
    },
    computed: {
        totalPrice() {
            let totle = 0;
            this.selectFoods.forEach((food) => {
                totle += food.price * food.count;
            });
            return totle;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        pay() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'no-enough';
            } else {
                return 'enough';
            }
        }
    }
    // components: {
    //     cartControl
    // }
};
</script>

<style lang="less" scoped>
@import '../../assets/common/css/mixin';
.shopCart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 46px;
    .content {
        display: flex;
        background: #141d27;
        color: rgba(255, 255, 255, 0.4);
        .cart-left {
            flex: 1;
            font-size: 0;
            .cart-logo {
                position: relative;
                display: inline-block;
                vertical-align: top;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background: #141d27;
                .cart-icon {
                    width: 100%;
                    height: 100%;
                    background: #2b343c;
                    border-radius: 50%;
                    text-align: center;
                    .icon-shopping_cart {
                        font-size: 24px;
                        color: rgba(255, 255, 255, 0.4);
                        line-height: 44px;
                    }
                    &.highlight {
                        background: #00a0dc;
                        .icon-shopping_cart {
                            color: #fff;
                        }
                    }
                }
            }
            .total-price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                padding-right: 12px;
                box-sizing: border-box;
                font-size: 16px;
                line-height: 24px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                &.highlight {
                    color: #fff;
                }
            }
            .delivery-pay {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 10px;
                font-size: 10px;
                font-weight: 700;
                text-align: center;
                line-height: 24px;
            }
        }
        .cart-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                font-size: 12px;
                line-height: 46px;
                font-weight: 700;
                text-align: center;
                &.no-enough {
                    background: #2b333b;
                }
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }
}
</style>
