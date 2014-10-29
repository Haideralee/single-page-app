jQuery(document).ready(function($){
    $('.nav li').click(function () {
        $(this).addClass('active').siblings(this).removeClass('active');
    });
});
