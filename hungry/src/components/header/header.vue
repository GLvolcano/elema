<template>
    <div class="header">
        <div class="headertop">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name"> {{seller.name}} </span>
                </div>
                <div class="way-time"> {{seller.description}}/{{seller.deliveryTime}}分钟送达 </div>
                <div v-if="seller.supports" class="supports">
                    <span class="icon " :class="type[seller.supports[0].type]"></span>
                    <span class="text"> {{seller.supports[0].description}} </span>
                </div>
            </div>
            <div v-if="seller.supports" class="supports-count" @click="detial_show">
                <span class="count"> {{seller.supports.length}}个 </span>
                <i class="icon icon-keyboard_arrow_right "></i>
            </div>
        </div>
        <div class="bulletin-warpper" @click="detial_show">
            <!-- <span class="icon-bulletin"></span> -->
            <p class="text"> {{seller.bulletin}} </p>
            <i class=" icon icon-keyboard_arrow_right"></i>
        </div>
        <div class="header-bg">
            <img :src="seller.avatar">
        </div>
        <div class="detial" v-show="detialShow">
            <div class="detial-wrapper clearfix">
                <div class="detial-main ">
                    <div class="name"> {{seller.name}} </div>
                    <div class="star-warpper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <div v-if="seller.supports" class="supports">
                        <ul class="supports-list">
                            <li v-for="item in seller.supports" class="support-item">
                                <span class="icon " :class="type[item.type]"></span>
                                <span class="text"> {{item.description}} </span>
                            </li>
                        </ul>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content"> {{seller.bulletin}} </p>
                    </div>

                </div>
            </div>
            <div class="detial-close" @click="detial_close">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>    

<script type="text/ecmascript-6">
import star from '@/components/star/star';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            type: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            detialShow: false
        };
    },
    methods: {
        detial_close() {
            this.detialShow = false;
        },
        detial_show() {
            this.detialShow = true;
        }
    },
    components: {
        star
    }
};
</script>

<style lang="less" scope>
@import '../../assets/common/css/mixin';
.header {
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    color: #fff;
    overflow: hidden;
    .headertop {
        position: relative;
        padding: 24px 24px 18px 12px;
        font-size: 0;
        .avatar {
            display: inline-block;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            .v-ag(top);
            margin-top: 2px;
            margin-left: 16px;
            .title {
                height: 18px;
                line-height: 18px;
                .brand {
                    display: inline-block;
                    .v-ag(top);
                    width: 30px;
                    height: 18px;
                    .bg-img('images/brand');
                    background-size: contain;
                }
                .name {
                    font-size: 16px;
                    font-weight: bold;
                    margin-left: 6px;
                }
            }
            .way-time {
                font-size: 12px;
                margin-top: 8px;
                height: 12px;
                font-weight: 200;
                line-height: 12px;
            }
            .supports {
                height: 12px;
                margin-top: 10px;
                font-size: 0;
                .icon {
                    display: inline-block;
                    .v-ag(top);
                    width: 12px;
                    height: 12px;
                    background-size: contain;
                    &.decrease {
                        .bg-img('images/decrease_1')
                    }
                }
                .text {
                    margin-left: 4px;
                    font-size: 10px;
                    line-height: 12px;
                }
            }
        }
        .supports-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            font-size: 10px;
            padding: 7px 8px;
            border-radius: 12px;
            font-weight: 200;
            line-height: 10px;
            background: rgba(0, 0, 0, 0.2);
            .icon {
                margin-left: 2px;
                margin-top: 2px;
                .v-ag(top);
            }
        }
    }
    .bulletin-warpper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 16px 0 38px;
        background-color: rgba(7, 17, 27, 0.2);
        background-size: 22px 12px;
        background-repeat: no-repeat;
        background-position: 12px center;
        .bg-img('images/bulletin');
        .text {
            font-size: 10px;
            height: 28px;
            font-weight: 200;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon {
            position: absolute;
            right: 12px;
            font-size: 10px;
            top: 9px;
        }
    }
    .header-bg {
        position: absolute;
        width: 100%;
        min-width: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        filter: blur(10px);
        img {
            width: 100%;
        }
    }
    .detial {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        backdrop-filter: blur(10px);
        .detial-wrapper {
            width: 100%;
            min-height: 100%;
            .detial-main {
                margin-top: 64px;
                padding-bottom: 64px;
                .name {
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 700;
                    text-align: center;
                }
                .star-warpper {
                    text-align: center;
                    margin-top: 16px;
                }
                .title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line {
                        flex: 1;
                        position: relative;
                        top: -9px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .text {
                        padding: 0 12px;
                        font-weight: 700;
                        font-size: 14px;
                    }
                }
                .supports {
                    width: 80%;
                    box-sizing: border-box;
                    margin: 0 auto;
                    padding: 0 12px;
                    .supports-list {
                        font-size: 0;
                        .support-item {
                            margin-bottom: 12px;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .icon {
                                display: inline-block;
                                width: 12px;
                                height: 12px;
                                background-size: contain;
                                &.decrease {
                                    .bg-img('images/decrease_2');
                                }
                                &.discount {
                                    .bg-img('images/discount_2');
                                }
                                &.guarantee {
                                    .bg-img('images/guarantee_2');
                                }
                                &.invoice {
                                    .bg-img('images/invoice_2');
                                }
                                &.special {
                                    .bg-img('images/special_2');
                                }
                            }
                            .text {
                                vertical-align: top;
                                font-size: 12px;
                                margin-left: 6px;
                                line-height: 12px;
                                font-weight: 200;
                            }
                        }
                    }
                }
                .bulletin {
                    width: 80%;
                    margin: 0 auto;
                    box-sizing: border-box;
                    padding: 0 12px;
                    font-size: 12px;
                    line-height: 24px;
                    font-weight: 200;
                    
                }
            }
        }
        .detial-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
}
</style>
