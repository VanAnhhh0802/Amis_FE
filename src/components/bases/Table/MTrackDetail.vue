<template lang="">
     <div class="flex-straight account-track__left-row" style="width: 50%;">
        <div class="row-left" :style="{ marginLeft: index % 2 !== 0 ? '32px' : '0' }">
            <label
                :for="`subject_${index}`"
                class="modal__header-left-wrapper account-checkbox"
                tabindex="0"
                @change="onChecked"
            >
                <input type="checkbox"  :checked="isChecked" />
                <div class="check-icon"></div>
            </label>
            <span class="track-text">{{ standard.trackText }}</span>
        </div>
        <div
            v-if="standard.isComboBox"
            class="checkbox-wrapper"
            :style="{ width: '50%', marginRight: index % 2 === 0 ? '32px' : '0' }"
        >
            <MDropCombobox
                width="100%"
                :default="standard.default"
                :options="standard.options"
                :disabled="!isChecked"
                @select="$emit('select', { identity: standard.identity, option: $event })"
            />
        </div>
    </div>
</template>
<script>
import MDropCombobox from '../combobox/MDropCombobox.vue';
export default {
    name: "MTrackDetail",
    components: {
        MDropCombobox,
    },
     
    props: {
        standard: Object,
        index: Number,
        checked: Boolean,
        selected: Number,
    },
    watch:{
        checked: function(newValue){
            console.log(this.checked);
            this.isChecked = newValue
        },
        isChecked: function (newValue) {
            console.log(newValue);
          },
        standard: function(){
            console.log(this.standard)
        }
    },
    emits:["select", "onCheckInput"],
    data(){
        return{
            isChecked: false,

        }
    },
    methods: {
        onChecked(){
            this.isChecked = !this.isChecked;
            
            this.$emit('onCheckInput', " identity: standard.identity, isChecked ")
        }
    }
}
</script>
<style scoped>
    .flex-straight{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>