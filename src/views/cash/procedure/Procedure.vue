<template >
    <div class="main-content">
        <div class="content-wrapper">
            <div class="content-title">NGHIỆP VỤ TIỀN MẶT</div>
                <div class="content-container">
                    <div class="content-item collect-money">
                        Thu tiền
                    </div>
                    <router-link to="/pay/pay-detail" class="content-item pay-item">
                        Chi tiền
                    </router-link>
                    <div class="content-item fund-inventory">
                        Kiểm kê quỹ
                    </div>
                </div>
            </div>
            <div class="content-footer">
                <router-link to="/account" class="footer-content">
                    <div class="icon-new w-h-24 footer-account-icon"></div>
                    <div class="footer-title">Hệ thống tài khoản</div>
                </router-link>
            </div>
    </div>
</template>
<script>
export default {
    name:"ProcedureHome",
};

</script>
<style scoped>
    @import url(./procedure.css);
</style>