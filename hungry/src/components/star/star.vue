<template>
    <div class="star" :class="starType">
        <span class="icon-star" v-for="item in items" :class="item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }

    },
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        items() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/common/css/mixin';
.star {
    font-size: 0;
    .icon-star {
        display: inline-block;
        background-repeat: no-repeat;
    }
    &.star-48 {
        .icon-star {
            width: 20px;
            height: 19px;
            margin-right: 22px;
            background-size: contain;
            &.on {
                .bg-img('images/star48_on');
            }
            &.half {
                .bg-img('images/star48_half');
            }
            &.off {
                .bg-img('images/star48_off');
            }
        }
    }
    &.star-36 {
        .icon-star {
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background-size: contain;
            &.on {
                .bg-img('images/star36_on');
            }
            &.half {
                .bg-img('images/star36_half');
            }
            &.off {
                .bg-img('images/star36_off');
            }
        }
    }
    &.star-24 {
        .icon-star {
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: contain;
            &.on {
                .bg-img('images/star24_on');
            }
            &.half {
                .bg-img('images/star24_half');
            }
            &.off {
                .bg-img('images/star24_off');
            }
        }
    }
}
</style>
