<?php $page = 'password' ?>
    <div class="content-wrapper">
        <div class="heading">
            <h1 class="display-4">Đổi mật khẩu</h1>
        </div>
        <div class="main-content">
            <div class="form-wrapper">
                <form>
                    <div class="row mb-3">
                        <label for="" class="col-lg-2 col-form-label required">Mật khẩu cũ</label>
                        <div class="col-lg-10">
                            <input class="form-control" type="password" id="oldPass">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="" class="col-lg-2 col-form-label required">Mật khẩu mới</label>
                        <div class="col-lg-10">
                            <input class="form-control" type="password" id="newPass">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="" class="col-lg-2 col-form-label required">Nhập lại mật khẩu mới</label>
                        <div class="col-lg-10">
                            <input class="form-control" type="password" id="rePass">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="" class="col-lg-2 col-form-label"></label>
                        <div class="col-lg-10">
                            <button type="button" onclick="changePass();" class="btn btn-primary btn-warning btn-submit">Xác nhận</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</div>