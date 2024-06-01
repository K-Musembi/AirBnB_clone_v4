/* global $ */
$(document).read(function () {
  let amenityList = [];
  $('#amenity_id').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenityList.push({ id: amenityId, name: amenityName });
    } else {
      amenityList = amenityList.filter(amenity => amenity.id !== amenityId);
    }
    const selectedNames = amenityList.map(amenity => amenity.name);
    $('.amenities h4').text(selectedNames.join(', '));
  });
  $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify(amenityList), function (response) {
  }).fail(function (xhr, status, error) {
    console.error('Error:', error);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function (xhr, status, error) {
    console.error('Error:', error);
  });
  $.post('http://0.0.0.0:5001/api/v1/places_search', {}, function (response) {
    $.each(response.places, function (index, place) {
      const description = place.description.replace(/<Owner>.*<\/Owner>/, '');
      const article = $('<article>').addClass('place').append(
        $('<h2>').text(place.name),
        $('<p>').html(description)
      );
      $('section.places').append(article);
    });
  }).fail(function (xhr, status, error) {
    console.error('Error:', error);
  });
});
