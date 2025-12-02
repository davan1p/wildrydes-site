// pick-price.js: Handles Pick A Price popup logic for ride.html
$(function() {
  // Create modal HTML and append to body
  var modalHtml = `
    <div class="modal fade" id="pickPriceModal" tabindex="-1" role="dialog" aria-labelledby="pickPriceModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="pickPriceModalLabel">Pickup Price Offer</h4>
          </div>
          <div class="modal-body" style="text-align:center;">
            <p>Your ride price is: <span id="randomPrice" style="font-weight:bold;font-size:1.5em;"></span></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" id="acceptPrice">Okay</button>
            <button type="button" class="btn btn-danger" id="cancelRide">Cancel Ride</button>
          </div>
        </div>
      </div>
    </div>
  `;
  $(document.body).append(modalHtml);

  // Listen for click on 'Set pickup' (request) button
  $('#request').on('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    // Only show if enabled
    if (!$(this).prop('disabled')) {
      // Generate random price between $10 and $50
      var price = Math.floor(Math.random() * 41) + 10;
      $('#randomPrice').text('$' + price);
      // store price on modal element for later retrieval
      $('#pickPriceModal').data('price', price);
      $('#pickPriceModal').modal('show');
    }
  });

  // Okay button: continue ride
  $(document).on('click', '#acceptPrice', function() {
    var price = $('#pickPriceModal').data('price');
    $('#pickPriceModal').modal('hide');
    // Trigger a global event that ride logic can listen to
    $(document).trigger('priceAccepted', [price]);
  });

  // Cancel button: cancel ride
  $(document).on('click', '#cancelRide', function() {
    var price = $('#pickPriceModal').data('price');
    $('#pickPriceModal').modal('hide');
    // Trigger a global event that ride logic can listen to
    $(document).trigger('priceCancelled', [price]);
  });
});

