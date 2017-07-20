
// button to create new project
function showNewProject() {
  var container = $('.newProjectContainer')
  $('#newToggle').on('click', function(e){
    container.toggle()
  })
  container.toggle()
}

// toggle editing projects
function editProject() {
  $('.editProject').on('click', function(e){
    e.preventDefault()
    var panel = $(this)
    var check = panel[0].offsetParent.nextElementSibling.style.display
    if(check !== "none") {
      panel[0].offsetParent.nextElementSibling.style.display = "none"
    } else {
      panel[0].offsetParent.nextElementSibling.style.display = "block"
    }


  })
}
