<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
            <i class="icon-remove_circle_outline"></i>
        </div>
        <div class="cart-content" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add"  @click.stop.prevent="addCart">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
            // this.$dispatch('cart.add', event.target);
        },
        decreaseCart(event) {
            if (!event._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/common/css/mixin';
.cartcontrol {
    font-size: 0;
    .cart-decrease,
    .cart-content,
    .cart-add {
        display: inline-block;
        color: rgb(0, 160, 200);
        font-size: 24px;
        line-height: 24px;
    }
    .cart-decrease,
    .cart-add {
        padding: 6px;
    }
    .cart-content{
        vertical-align: top;
        margin-top: 7px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .cartcontent {
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
}
</style>
