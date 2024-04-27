$(document).ready(function() {
    // Lista pól tekstowych z odpowiednimi adresami URL backendu i dodatkowymi opcjami
    var fields = [
        { id: "#textfield1", url: "backend/backend1.php", minLength: 1, onSelect: logLabel },
        { id: "#textfield2", url: "backend/backend2.php", minLength: 1, onSelect: redirectToUrl },
        { id: "#textfield3", url: "backend/backend3.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield4", url: "backend/backend4.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield5", url: "backend/backend5.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield6", url: "backend/backend6.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield7", url: "backend/backend7.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield8", url: "backend/backend8.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield9", url: "backend/backend9.php", minLength: 3, onSelect: logLabel },
        { id: "#textfield10", url: "backend/backend10.php", minLength: 3, onSelect: logLabel }
    ];

    // Funkcja wspólna dla wszystkich pól tekstowych
    fields.forEach(function(field) {
        $(field.id).autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: field.url,
                    type: "GET",
                    dataType: "json",
                    data: { search: request.term },
                    success: function(data) {
                        var formattedData = $.map(data, function(item) {
                            return { label: item, value: item };
                        });
                        response(formattedData);
                    },
                    error: function() {
                        response([]);
                    }
                });
            },
            minLength: field.minLength,
            select: function(event, ui) {
                field.onSelect(ui.item);
            }
        });
    });

    // Funkcje pomocnicze dla różnych zachowań onSelect
    function logLabel(item) {
        console.log("chosen: " + item.label);
    }

    function redirectToUrl(item) {
        window.location.href = item.value;
    }
});
