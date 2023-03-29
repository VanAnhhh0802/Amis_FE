import MISAEnum  from "../lib/enum.js";

const commonJs = {
    formatDate(date) {
        try {
          if (date) {
            //Tạo đối tượng date
            date = new Date(date);
            //Khai báo biến year gán year hiện tại
            let year = date.getFullYear();
            //Khai báo biến month gán month vì month bắt đầu từ 0 nên ta + thêm 1
            let month = date.getMonth() + 1;
            //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
            // month < 10 ? `0${month}` : `${month}`;
            if (month < 10) {
              month = "0" + month;
            } else {
              month = "" + month;
            }
            //Khai báo biến day và gán day bằng ngày hiện tại
            let day = date.getDate();
            //Dùng toán tử 3 ngôi để thêm 0 đằng trước ngày nhỏ hơn 10
            // day < 10 ? `0${day}` : `${day}`;
            if (day < 10) {
              day = "0" + day;
            } else {
              day = "" + day;
            }
            return `${day}/${month}/${year}`;
          } else {
            ("");
          }
        } catch (error) {
          console.log(error);
        }
    },
    formatGender(gender){
      if (gender == 0){
        gender = "Nam";
      }
      else if (gender == 1){
        gender = "Nữ"
      }
      else {
        gender = "Khác"
      }
    },
    formatMoney(money){
      try {
        if (money){
          money = new Intl.NumberFormat("vi-VI").format(
            money
        )
        }
        else{
          money = "0"
        }
        return money;

      }
      catch(error) {
        return "";
      }
    },
    formatActiveAccount(active){
      if (active == true){
        active = "Đang sử dụng"
      }
      else if (active  == false){
        active = "Ngừng sử dụng"
      }
      else {
        active = ""
      }
      return active;
    },
    formatTypeAccount(type){
      if (MISAEnum.TypeAccount.DEBT === 1){
        type = "Dư nợ"

      }
      else if (MISAEnum.TypeAccount.HERMAPHRODITE === 2){
        type = "Lưỡng tính"
      }
      else if (MISAEnum.TypeAccount.SURPLUS === 3){
        type = "Dư có"
      }
      else if(MISAEnum.TypeAccount.SURPLUS === 4) {
        type = "Khống có số dư"
      }
      else {
        type = ""
      }
      return type
    }

}

export default commonJs;