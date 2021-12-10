<div class="admin-main">
    <div class="heading">
        <h1 class="display-4">Quản lý giảng viên</h1>
    </div>
    <div class="admin-main-content">
        <!-- Add lecturers -->
        <div class="text-center">
            <button type="button" class="btn btn-info btn-add" data-bs-toggle="modal" data-bs-target="#add-student"><i class="fas fa-plus-circle pd-4" ></i>Thêm giảng viên</button>
        </div>
        <div class="modal fade" id="add-student" tabindex="-1" aria-labelledby="add-student-Label" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Thêm giảng viên</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <fieldset >
                                <div class="mb-3">
                                    <label for="nameTeacherAdd" class="form-label required">Họ và tên</label>
                                    <input type="text" id="nameTeacherAdd" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="nsTeacherAdd" class="form-label required">Số lượng SV hướng dẫn</label>
                                    <input type="text" id="nsTeacherAdd" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="birthdayTeacherAdd" class="form-label pd-20 required">Ngày sinh</label>
                                    <input type="date" id="birthdayTeacherAdd" name="trip-start" value="" min="1965-01-01" max="1995-12-31">
                                </div>
                                <div class="mb-3">
                                    <label for="phoneTeacherAdd" class="form-label ">Số điện thoại</label>
                                    <input type="text" id="phoneTeacherAdd" class="form-control" placeholder="">
                                </div>
                                <div class="mb-3">
                                    <label for="emailTeacherAdd" class="form-label ">Email</label>
                                    <input type="text" id="emailTeacherAdd" class="form-control" placeholder="">
                                </div>
                                <div class="mb-3">
                                    <label for="addressTeacherAdd" class="form-label">Địa chỉ</label>
                                    <input type="text" id="addressTeacherAdd" class="form-control" placeholder="">
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" onclick="createTeacher();" class="btn btn-info">Thêm</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search -->
        <div class="wrapper text-center">
            <div class="input-group rounded d-inline-flex mt-3">
                <input type="search" id="searchTeacher" class="form-control rounded" placeholder="Tìm kiếm..." aria-label="Search"
                    aria-describedby="search-addon" />
                <button class="input-group-text border-0 search-btn" onclick="setListTeacher();" id="search-addon">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>

        <!-- Lecturers list -->
        <div class="student-list">
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã GV</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Số lượng SV hướng dẫn</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col" class="w-15">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="listTeacher">
    
                    </tbody>
                    <!-- Edit lecturer info -->
                    <div class="modal fade" id="update-lecturer-info" tabindex="-1" aria-labelledby="update-lecturer-info-Label" aria-hidden="true">
                        <div class="modal-dialog modal-xl mt-0">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalLabel">Sửa thông tin giảng viên</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <fieldset >
                                            <div class="mb-3">
                                                <label for="nameTeacherFix" class="form-label">Họ và tên</label>
                                                <input type="text" id="nameTeacherFix" class="form-control" value="Trần Phương Nhung">
                                            </div>
                                            <div class="mb-3">
                                                <label for="nsTeacherFix" class="form-label">Số lượng SV hướng dẫn</label>
                                                <input type="text" id="nsTeacherFix" class="form-control" value="20">
                                            </div>
                                            <div class="mb-3">
                                                <label for="birthdayTeacherFix" class="form-label pd-20">Ngày sinh</label>
                                                <input type="date" id="birthdayTeacherFix" name="trip-start" value="" min="1965-01-01" max="1995-12-31">
                                            </div>
                                            <div class="mb-3">
                                                <label for="phoneTeacherFix" class="form-label ">Số điện thoại</label>
                                                <input type="text" id="phoneTeacherFix" class="form-control" value="0734566542">
                                            </div>
                                            <div class="mb-3">
                                                <label for="emailTeacherFix" class="form-label ">Email</label>
                                                <input type="text" id="emailTeacherFix" class="form-control" value="email@gmail.com">
                                            </div>
                                            <div class="mb-3">
                                                <label for="addressTeacherFix" class="form-label">Địa chỉ</label>
                                                <input type="text" id="addressTeacherFix" class="form-control" value="Hà Nội">
                                            </div>
                                            <div class="mb-3">
                                                <label for="avatarTeacherFix" class="form-label ">Ảnh</label>
                                                <input type="file" id="avatarTeacherFix" class="form-control">
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="button" onclick="updateTeacher();" class="btn btn-info">Sửa</button>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- Delete lecturer -->
                    <div class="modal fade" id="delete-student" tabindex="-1" aria-labelledby="delete-student-Label" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalLabel">Xác nhận xóa</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Bạn có chắc chắn muốn xóa hay không?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="button"  onclick="deleteTeacher();" class="btn btn-info" data-bs-dismiss="modal">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </table>
            </div>
        </div>
    </div>
</div>