// console.log('Hello World')
// var carousel = new ch.Carousel(ch('.demo-carousel')[0], {
//   pagination: true
// });

var carousel = new ch.Carousel(el('.demo-carousel')[0], {
  'async': 3,
  'arrows': true,
  'pagination': true
}).on('itemsadd', function (collection) {
  // Inject content into the added <li> elements
  $.each(collection, function (i, e) {
    e.innerHTML = 'Content into one of newly inserted <li> elements.';
  });
});

var dropdown1 = new ch.Dropdown(document.querySelector('.demo-dropdown1'));