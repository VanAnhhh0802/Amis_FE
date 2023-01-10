/**
 * Hàm dùng toàn chương trình
 * Author: Văn Anh (26/12/2022)
 */
export default {
  Url: {
    Employees: "https://amis.manhnv.net/api/v1/Employees",
    Departments: "https://cukcuk.manhnv.net/api/v1/Departments",
    Positions: "https://cukcuk.manhnv.net/api/v1/Positions",
  },
  //Các thông báo exception gửi từ backend hiển thị cho người dùng
  ExceptionMsg: {
    BADREQUEST: "Dữ liệu đầu vào không hợp lệ.",
    UNAUTHORIZED: "Hệ thống MISA chưa được ủy quyền.",
    FORBIDDEN: "Không có quyền truy cập tài nguyên này.",
    NOTFOUND: "Server không tìm thấy bất kì tài nguyên nào.",
    NTERNALSERVERERROR: "Có lỗi xảy ra phía máy chủ. Vui lòng liên hệ MISA!.",
  },
  //Thông báo nhập thiếu
  IsEmpty: {
    Code: "Mã không được để trống",
    Name: "Tên nhân viên không được để trống",
    DepartmentName: "Phòng ban không được để trống",
  },
  //Thông báo lỗi
  ErrorMsg: {
    CloseMsg: "Bạn có muốn hủy bỏ khai báo này không", // Lời nhắn khi đóng form mà chưa lưu
    CloseEditedMsg:
      "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?.", // Lời nhắn khi đóng mà trước đó đã sửa đổi
    ValidateEmpty: "Cần phải nhập thông tin: .", // Lời nhắn khi nhập thiếu
    ValidateDuplicateCode: "Mã nhân viên đã tồn tại.", // Lời nhắn khi trùng mã nhân viên
  },
  //Các title form
  TitleModal: {
    Insert: "Thêm nhân viên",
    Update: "Sửa nhân viên",
    Replication: "Nhân bản nhân viên", // Chưa dùng
  },
  //Các title của hàm
  TitleFunction: {
    Insert: "Thêm nhân viên",
    Export: "Xuất khẩu nhân viên",
    Delete: "Xoá nhân viên",
    CategoryFilter: "Loại nhân viên",
    DepartmentFilter: "Bộ phận sử dụng",
    Search: "Tìm kiếm nhân viên",
  },
  TextVi: {
    Header: {
      CompanyName: "Công ty TNHH Sản xuất - Thương mại - Dịch vụ Qui Phúc",
      EmployeeName: "Hồ Văn Anh",
    },
    Content: {
      Title: "Nhân viên",
      Add: "Thêm mới nhân viên",
    },
    Table: {
      Search: "Tìm kiếm theo mã, tên nhân viên",
      /* Tên cột */
      EmployeeCode: "Mã nhân viên",
      EmployeeName: "Tên nhân viên",
      Gender: "Giới tính",
      DateOfBirth: "Ngày sinh",
      Identity: "Số CMND",
      DepartmentName: "Chức danh",
      PositionName: "Tên đơn vị",
      BankNumber: "Số tài khoản",
      BankName: "Tên ngân hàng",
      BankBranch: "Chi nhánh",
      Function: "Chức năng",
      /* Tên chức năng */
      Edit: "Sửa",
      Replicate: "Nhân bản",
      Delete: "Xoá",
      Stop: "Ngừng sử dụng",
      RecordInPage: " bản ghi trên 1 trang",
    },
    Modal: {
      AddModal: "Thêm nhân viên",
      UpdateModal: "Thông tin nhân viên",
      EmployeeCode: "Mã",
      EmployeeName: "Tên",
      DateOfBirth: "Ngày sinh",
      Gender: "Giới tính",
      DepartmentName: "Đơn vị",
      IdentityNumber: "Số CMND",
      IdentityDate: "Ngày cấp",
      PositionName: "Chức danh",
      IdentityPlace: "Nơi cấp",
      Address: "Địa chỉ",
      Phone: "ĐT di động",
      Telephone: "ĐT cố định",
      Email: "Email",
      BankAccountNumber: "Tài khoản ngân hàng",
      BankName: "Tên ngân hàng",
      BankBranch: "Chi nhánh",

      /* Tên chức năng */
      Cancel: "Huỷ",
      Close: "Đóng",
      Save: "Cất",
      SaveAndAdd: "Cất và Thêm",
      Insert: "Thêm",
      Update: "Sửa",
      Accept: "Đồng ý",
      Yes: "Có",
      No: "Không",
    },
    Dialog: {
      Save: "Cất",
      NotSave: "Không cất",
      No: "Không",
      Yes: "Có",
      Close: "Đóng",
      Cancel: "Huỷ bỏ",
      Delete: "Xoá",
      Accept: "Đồng ý",
      Title: {
        Delete: "Xoá nhân viên",
        Change: "Dữ liệu đã thay đổi",
        Error: "Có lỗi!",
      },
      Text: {
        Save: "Bạn có muốn cất không?",
        Employee: "Nhân viên",
        After: "sẽ bị xoá.",
      },
    },
    ErrorMessage: {
      DuplicateCode: "Mã nhân viên đã tồn tại.",
      EmptyCode: "Mã không được để trống.",
      EmptyName: "Tên nhân viên không được để trống.",
      EmptyDepartmentName: "Tên đơn vị không được để trống.",
    },
    //
    ToastMessage: {
      Success: {
        Title: "Thành công!",
        Delete: "Nhân viên đã bị xoá.",
        Insert: "Nhân viên đã được thêm.",
        Update: "Nhân viên đã được thay đổi.",
      },
    },
  },
};
