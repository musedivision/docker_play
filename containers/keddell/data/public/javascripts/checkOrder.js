function checkOrder() {

  $('.changeOrder').on('click', function(e){
    var projectName = e.target.value
    console.log(projectName)
    var box = $( '.'+projectName )
    console.log(box)
    var sorted = box.sortable('toArray', { attribute: 'data-unique'})
    console.log(sorted)
    var post = {
     "name": projectName,
      "order": sorted
    }
    $.post( "edit/api/order", post)
    .done(function(data){
      console.log(data)
    }).fail(function(err){
      console.error(err)
    })
  })
}

function removeImage() {
  $('.close').on('click', function(e){
    var parent = $(this)[0].parentElement
    var photo = parent.attributes["data-unique"].nodeValue
    // post request to remove pic
    var projectName = $(this).attr('data-title')
    console.log(projectName);
    var post = {
     "name": projectName,
      "photo": photo
    }
    console.log(post);
    $.post( "edit/api/order/delete", post)
    .done(function(data){
      console.log(data)
      parent.remove()
    }).fail(function(err){
      console.error(err)
    })
  })
}
