<?php 
    $css = null;
    $javascript = ['user.js','sv.js', 'style.js']; // add file javascript

    $this->view('blocks/headHTML',[
        'css'=>$css,
        'js'=>$javascript
    ]);

    $this->view('blocks/headHTML');
?>                            
<body>
    <div>
        <!-- Header -->
        <?php  $this->view('blocks/header');?> 
    </div>
    <div class="page-main">
            <!-- Sidebar -->
            <div class="sidebar scrollbar" id="sidebar">
                <?php $this->view('blocks/sidebar-sv');?> 
            </div>
            <!-- Content -->
            <div class="content">
                <?php $this->view('pages/sv/'.$data['page']);?>
            </div>
        </div>
    </div>
</body>