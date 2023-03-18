<template lang="">
    <div class="overlay-form">
        <div :class="{ 'account-form': true, 'account-form--extend': isResize }">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">Thêm Tài khoản</div>
                </div>
                <div class="modal__header-right">
                    <div class="icon w-h-24 tooltip form-icon--help">
                        <div class="tooltip-text">Giúp(F1)</div>
                    </div>
                    <div class="modal__close-btn" @click="onClose">
                        <label
                            for="show-modal"
                            class="modal__close-btn-icon"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="account-main">
                <div class="row">
                    <MInput
                        label="Số tài khoản"
                        inputRequired="true"
                        width="25%"
                        bottom="12px"
                        full-width
                    />
                </div>
                <div class="row">
                    <MInput
                        label="Tên tài khoản"
                        inputRequired="true"
                        width="100%"
                        bottom="12px"
                        full-width
                    />
                    <MInput
                        label="Tên tiếng Anh"
                        width="100%"
                        bottom="12px"
                        full-width
                        style="margin-left: 8px"
                    />
                </div>
                <div class="row">
                    <div class="checkbox-wrapper" style="width: 25%; margin-right: 8px">
                        <label for="">Tài khoản tổng hợp</label>
                        <MDropCombobox
                        ></MDropCombobox>
                    </div>
                    <div class="checkbox-wrapper" style="width: 25%">
                        <label for="">Tài khoản tổng hợp</label>
                        <MDropCombobox
                        
                        ></MDropCombobox>
                    </div>
                </div>
                <div class="row" style="width: 100%">
                    <div class="textarea-wrapper">
                        <label class="textfield__label modal-label"> Diễn giải</label>
                        <textarea
                            class="account-form__textarea"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <label
                        for="accounting"
                        class="modal__header-left-wrapper account-checkbox"
                        tabindex="0"
                    >
                        <input
                            type="checkbox"
                            id="accounting"
                        />
                        <div class="check-icon"></div>
                    </label>
                    <span>Có hạch toán ngoại tệ
                        
                    </span>
                </div>
            </div>
            <div class="account-track-detail">
                <div
                    class="row account-track__title"
                    @click="isShowTrackDetail = !isShowTrackDetail"
                >
                    <div class="m-icon">
                        <div
                            class="account-track-detail__icon"
                            :style="{
                                transform: isShowTrackDetail ? 'rotate(90deg)' : 'rotate(0deg)',
                            }"
                        ></div>
                    </div>
                    Theo dõi chi tiết theo
                </div>
                <div class="track-detail" :style="{ height: !isShowTrackDetail ? '0' : '175px' }">
                    <MTrackDetail
                    v-for = "(item, index)  in ACCOUNT_TRACK"
                    :key="index"
                    :standard="item"
                    :index="index"
                    @select="handleSelected"
                    @onCheckInput="handleChecked"
                    :checked="item.identity"
                    ></MTrackDetail>
                </div>
            </div>
            <div class="modal-footer account-form__footer">
                <div class="modal-footer__wrapper" style="padding-right: 46px">
                    <MButton
                        type="submit"
                        class="btn btn--secondary modal-btn__secondary btn-save"
                        tabindex="0"
                        text="Cất"
                        style="height: 28px;"
                        @click="handleSubmit"
                    >
                    </MButton>
                    <MButton 
                    class="btn btn--primary btn-save-add" 
                    text="Cất và Thêm" 
                    tabindex="0" 
                    style="height: 28px;"
                    ref="refSaveBtn">
                    </MButton>
                </div>
                <MButton
                    for="show-modal"
                    class="btn btn--secondary modal-btn-cancel"
                    tabindex="0"
                    ref="refCancelBtn"
                    @click="onClose"
                    style="height: 28px;"
                    text="Hủy"
                    ></MButton
                >
            </div>

            <div class="account-form__resize" @click="isResize = !isResize">
                <div class="form-resize__icon"></div>
            </div>
        </div>
        <div class="toast-account">
            <!-- <m-toast
                v-if="state.listToast.length"
                v-for="(toast, index) in state.listToast"
                :key="index"
                :toastMessage="toast.toastMessage"
                :statusMessage="toast.statusMessage"
                :status="toast.status"
            /> -->
        </div>
    </div>
</template>
<script>
import MInput from '@/components/bases/input/MInput.vue';
import MButton from '@/components/bases/Button/MButton.vue';
import MDropCombobox from '@/components/bases/combobox/MDropCombobox.vue';
import MTrackDetail from "@/components/bases/Table/MTrackDetail.vue";
import resource from '@/lib/resource';
// import MCombobox from '@/components/bases/combobox/MCombobox.vue';
export default {
    name:"AccountDetail",
    components: {
        MInput,
        MDropCombobox,
        MTrackDetail,
        MButton,
        // MCombobox,
    },
    data(){
        return {
            isShowTrackDetail:true,
            ACCOUNT_TRACK : [
                {
                    trackText: "Đối tượng",
                    isComboBox: true,
                    options: resource.OBJECT_TYPE,
                    default: resource.OBJECT_TYPE[1].optionId,
                    identity: "Object",
                },
                {
                    trackText: "Tài khoản ngân hàng",
                    isComboBox: false,
                    options: resource.TRACK_TYPE,
                    default: resource.TRACK_TYPE[1].optionId,
                    identity: "BankAccount",
                },
                {
                    trackText: "Đối tượng THCP",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "Job",
                },
                {
                    trackText: "Công trình",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "ProjectWork",
                },
                {
                    trackText: "Đơn đặt hàng",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "Order",
                },
                {
                    trackText: "Hợp đồng bán",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "PurchaseContract",
                },
                {
                    trackText: "Hợp đồng mua",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "SaleContract",
                },
                {
                    trackText: "Khoản mục CP",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "ExpenseItem",
                },
                {
                    trackText: "Đơn vị",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "OrganizationUnit",
                },
                {
                    trackText: "Mã thống kê",
                    isComboBox: true,
                    options:resource.TRACK_TYPE,
                    default:resource.TRACK_TYPE[1].optionId,
                    identity: "Item",
                },
            ],
        }
    },
    methods: {
        handleChecked (event) {
            try {
                if (event.identity) {
                    // account[`IsTrack${event.identity}`] = event.isChecked;
                    console.log("ee");
                }
            } catch (error) {
                console.log(error);
            }
        },
        onClose(){
            console.log("click");
            this.$emit("closeDetail");
        }
    }
}
</script>
<style scoped>
@import url(./account.css);
.textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.account-form__textarea {
    resize: none;
    border-radius: 3px;
    border: 1px solid #babec5;
    font-family: inherit;
    display: block;
    padding: 9px;
    color: #000;
    font-size: 13px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color);
    outline: none;
    margin-bottom: 12px;
}

.account-form__textarea:focus {
    border: 1px solid var(--main-color);
}


.track-detail {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.track-text {
    line-height: 28px;
}

.toast-account {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
}
.form-icon--help {
  background-position: -89px -144px;
}
</style>