var carousel = new ch.Carousel(ch('.carousel')[0], {
  'async': 0,
  'arrows': true,
  'pagination': true
}).on('itemsadd', function (collection) {
  // Inject content into the added <li> elements
  $.each(collection, function (i, e) {
    e.innerHTML = 'Content into one of newly inserted <li> elements.';
  });
});

var dropdown1 = new ch.Dropdown(document.querySelector('.demo-dropdown1'));