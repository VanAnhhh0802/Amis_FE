/**
* Hàm xử lý lỗi trả về
* @param {Mã lỗi} error 
* Author: Văn ANh(3/2/2023)
*/
export const exception = {
    handleException(error) {
        if (error.response.status == resource.STATUSCODE.BadRequest) {
            switch (error.response.data.errorCode) {
            case MISAEnum.ERRORCODE.DuplicateCode:
                this.isShowLoading = false;
                //Trả về lỗi 400 thì hiển thị thông báo mã đã bị trùng
                this.dialogMessage = error.response.data.userMsg;
                this.isShowDialog = true;
                this.$refs.EmployeeCode.inputFocus();
                break;
            // eslint-disable-next-line
            case MISAEnum.ERRORCODE.InvalidInput:
                this.dialogMessage = error.response.data.userMsg;
                break;
                default:
                break;
            }
        } 
        else if (error.response.status == resource.STATUSCODE.ServerError) {
            this.dialogMessage = error.response.data.userMsg;
            this.isShowDialog = true;
        }
        else {
            for(const property in resource.STATUSCODES) {
                if(error.response.status == property.Code) {
                this.dialogMessage = property.Message;
                this.isShowDialog = true;
                }
            }
        }
    }
}

export default handleException;
