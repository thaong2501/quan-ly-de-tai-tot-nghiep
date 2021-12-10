<?php 
    $currentPage = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
?>

<div class="content-wrapper">
    <div class="group-heading">
        <div class="group-banner">
            <img src="<?php echo getPathImg('banner01.jpg'); ?>" alt="">
        </div>
        <div class="group-name">
            <h4 id="groupName"></h4>
        </div>
    </div>
    <div class="group-content" id="groupContent"></div>
</div>
