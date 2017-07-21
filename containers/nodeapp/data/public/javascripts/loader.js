function load(){
  var banner = $('.loading')
  var atags = $('a')
  banner.fadeOut(1000,function(){})

  atags.on('click', function(e){
    banner.fadeIn(100, function(){
      console.log(e.currentTarget.href)
      window.location.href = e.currentTarget.href
    })
    e.preventDefault()

  })
}
