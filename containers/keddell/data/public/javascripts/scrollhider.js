function scrollHide() {
  console.log("scrollHide loaded")


  var parent = document.getElementsByClassName('scrollable');
  var child = document.getElementsByClassName('inner-scroll');

  for(var i=0; i < (child.length - 1); i++) {
    // change padding by the offsetWidth
    var offset = child[i].offsetWidth - child[i].clientWidth
    child[i].style.paddingRight = offset + "px"
    // width
    var width = child[i].offsetWidth
    child[i].offsetWidth = width + offset
    console.log(offset)
    console.log( width + offset)
  }
}
