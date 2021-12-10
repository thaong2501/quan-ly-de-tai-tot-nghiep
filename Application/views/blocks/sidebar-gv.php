<?php 
    $currentPage = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
?>

<ul class="sidebar-list" >
    <div style="display: flex; justify-content: end;">
        <i class="fas fa-times" id="close-menu"></i>
    </div>
    <li class="sidebar-item">
        <a href="<?php echo getBaseUrl()."gv"?>" class="sidebar-link <?php  if($currentPage == getBaseUrl()) echo "active "?>">
            <i class="fas fa-home"></i>
            Trang chủ
        </a>
    </li>
    <li class="sidebar-item">
        <a href="" class="sidebar-link">
            <i class="fas fa-user"></i>
            Thông tin cá nhân
        </a>
        <ul class="sidebar-child">
            <li class="sidebar-child__item">
                <a href="<?php echo getBaseUrl()."gv/account/profile";?>" class="sidebar-child__link <?php  if($currentPage == getBaseUrl()."gv/account/profile") echo "active "?>">
                    <i class="fas fa-chevron-right"></i>
                    Cập nhật thông tin
                </a>
            </li>
            <li class="sidebar-child__item">
                <a href="<?php echo getBaseUrl()."gv/account/password";?>" class="sidebar-child__link <?php  if($currentPage == getBaseUrl()."gv/account/password") echo "active "?>">
                    <i class="fas fa-chevron-right"></i>
                    Đổi mật khẩu
                </a>
            </li>
        </ul>
    </li>
    <li class="sidebar-item">
        <a href="" class="sidebar-link">
            <i class="fas fa-clipboard-list"></i>
            Quản lý đề tài
        </a>
        <ul class="sidebar-child">
            <li class="sidebar-child__item">
                <a href="<?php echo getBaseUrl()."gv/thesis/thesislist";?>" class="sidebar-child__link <?php  if($currentPage == getBaseUrl()."gv/thesis/thesislist") echo "active "?>">
                    <i class="fas fa-chevron-right"></i>
                    Danh sách đề tài
                </a>
            </li>
            <li class="sidebar-child__item">
                <a href="<?php echo getBaseUrl()."gv/thesis/thesissample";?>" class="sidebar-child__link <?php  if($currentPage == getBaseUrl()."gv/thesis/thesissample") echo "active "?>">
                    <i class="fas fa-chevron-right"></i>
                    Đề tài mẫu
                </a>
            </li>
        </ul>
    </li>
    <li class="sidebar-item">
        <a href="" class="sidebar-link">
            <i class="fas fa-users"></i>
            Nhóm hướng dẫn
        </a>
        <ul class="sidebar-child" id="listGroup"></ul>
    </li>
</ul>

<div class="copyright">
    <p>Made by Team 23 <i class="fas fa-heart"></i></p>
    <p>&copy 2021, HaUI</p>
</div>
