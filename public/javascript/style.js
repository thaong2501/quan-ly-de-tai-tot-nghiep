$(document).ready(() => {

  $('#header-menu-icon').click(() => {
    $('#sidebar').toggle()
  })

  $('#close-menu').click(() => {
    $("#sidebar").hide();
  })

  $(window).resize(() => {
    if($(window).width() >= 768) {
      $("#sidebar").show();
    } else {
      $("#sidebar").hide();
    }
  })
})