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
    // inputValidation (rules,name,value) {
    //   const FORM_FIELD = RESOURCES.FORM_FIELD;
    //   const {NOT_EMPTY,ADULT,HAS_FORMAT,MAX_LENGTH} = RESOURCES.FORM_RULES;
  
    //   const ERROR = RESOURCES.ERROR;
    //   const regexConstant = regexConstants;
    //   for (const rule of rules) {
    //     var arrRule = rule.split("|");
    //     var nameRule = arrRule[0];
    //     var keyRule = arrRule[1];
    //     switch (nameRule) {
    //       case NOT_EMPTY:{
    //         if(!value.trim()) return ERROR[rule](FORM_FIELD[name]);
    //         break;
    //       }
    //       case ADULT:{
    //         if (value) {
    //           const date = new Date(value).getTime();
    //           const dateNow = new Date().getTime();
    //           if (date > dateNow) {
    //             return ERROR[rule](FORM_FIELD[name]);
    //           }
    //           if(FORM_FIELD[name] == RESOURCES.FORM_FIELD.DateOfBirth) {
    //             if(new Date().getFullYear() - new Date(value).getFullYear() < 18)
    //               return ERROR[rule](FORM_FIELD[name]);
    //           }
    //         }
    //         break;
    //       }
    //       case HAS_FORMAT:{
            
    //         if(value.trim() && !regexConstant[name].test(value))
    //         {
    //           return ERROR[rule](FORM_FIELD[name]);
    //         }
    //         break;
    //       }
    //       case MAX_LENGTH: {
    //         if (value && value.length > keyRule)
    //         return ERROR[nameRule](FORM_FIELD[name], keyRule);
    //       break;
    //       }
    //       default:
    //         break;
    //     }
    //   }
    // }
}

export default commonJs;