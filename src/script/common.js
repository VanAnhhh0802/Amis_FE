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
}

export default commonJs;