/**
 * Hàm dùng cho toàn chương trình
 * Author: Văn Anh (26/12/2022)
 */
const MISAEnum = {
  Mode: {
    Add: 0, // Trạng thái thêm
    Edit: 1, // Trạng thái sửa
    Duplicate:2, //Trạng thái nhân bản
    Watch: 4, //Trạng thái xem 
  },
  StatusCode: {
    OK: 200, //Trả về thành công ở những phương thứ như GET, POST , PUT , DELETE
    CREATED: 201, //Trả về khi một Resouce vừa được tạo thành công.
    NOCONTENT: 204, //Trả về khi Resource xoá thành công.
    NOTMODIFIED: 304, //Client có thể sử dụng dữ liệu cache.
    BADREQUEST: 400, //Request không hợp lệ.
    UNAUTHORIZED: 401, //Request cần có auth.
    FORBIDDEN: 403, //Client không có quyền truy cập.
    NOTFOUND: 404, //Server không tìm thấy resource từ URI.
    METHODNOTALLOWED: 405, //Phương thức không cho phép với user hiện tại.
    GONE: 410, //Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.
    UNSUPPORTEDMEDIATYPE: 415, //Không hỗ trợ kiểu Resource này.
    UNPROCESSABLEENTITY: 422, //Dữ liệu không được xác thực.
    TOOMANYREQUEST: 429, //Request bị từ chối do bị giới hạn
    NTERNALSERVERERROR: 500, //Máy chủ bị lỗi.
  },
  KEY_CODE: {
    ENTER: 13, //Phím enter
    ROW_DOWN: 40, //Phím down
    ROW_UP: 38, //Phím up
  },
  ERRORCODE: {
    Exception: 0,
    DuplicateCode: 7,
    EmptyCode: 6,
    InsertFailed: 1,
    UpdateFailed: 3,
    DeleteFailed:2,
    InvalidInput: 9,

  },
  HEIGHT: {
    HEIGHT_PAY_CONTENT: 647, // Chiều cao phần content trang phiếu chi
    HEIGHT_PAY_MASTER: 370, // Chiều cao phần master trang phiếu chi
    HEIGHT_PAY_DETAIL: 230, // CHiều cao phần detail trang phiếu chi
  },
  TypeAccount:{
    DEBT: 1, // Dư nơ
    HERMAPHRODITE: 2, //Lưỡng tính
    SURPLUS: 3, //Dư có
    NOBALANCE: 4, //Khống có số dư
  },
  STATUS_PAYMENT_SAVE:{
    SAVE_ADD: 0, // Cất và Thêm
    SAVE_CLOSE: 1, //Cất và đống
  },
  MAX_LENGTH_PAYMENT:{
    NUMBER: 20,
  }

};
export  default MISAEnum;