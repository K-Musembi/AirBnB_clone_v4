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
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
