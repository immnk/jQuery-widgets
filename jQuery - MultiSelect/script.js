$(document).ready(function() {
    var selectedChoices = new Map();
    $('#statusMS').multiselect({
        includeSelectAllOption: true
    });
    $('#btnSelected').click(function() {
        var selected = $("#statusMS option:selected");
        var message = "";
        selected.each(function() {
            message += $(this).text() + " " + $(this).val() + "\n";
        });
        alert(message);
    });
    $("#btnDropDown").click(function() {
        $(".custom-dropdown-menu").toggleClass('hidden');
    });
    $(".custom-checkbox").click(function(index) {
        var checkedText = $(this).val();
        var isChecked = $(this).is(':checked');
        console.log(checkedText + " " + isChecked);

        if (checkedText == "All") {
            if (isChecked) {
                $(".custom-dropdown-menu li input[type='checkbox']").each(function(index) {
                    // this.setAttribute("checked", "checked");
                    $(this).prop("checked", true);
                    console.log($(this).val() + " " + $(this).is(':checked') );
                    selectedChoices.set($(this).val(), true)
                });
                $("#selectedChoices").val("All");
            } else {
                $(".custom-dropdown-menu li input[type='checkbox']").each(function(index) {
                    // this.removeAttribute("checked");
                    $(this).prop("checked", false);
                    console.log($(this).val() + " " + $(this).is(':checked') );
                    selectedChoices.set($(this).val(), false)
                });
                $("#selectedChoices").val("");
            }

        } else {
            var all = $(".all");
            if(all.is(':checked')){
                all.prop('checked', false);
                selectedChoices.set(all.val(), false);
            }
            if(isChecked)
                $(this).prop("checked", true);
            else
                $(this).prop("checked", false);
            selectedChoices.set(checkedText, isChecked);
            calculateText();
        }
    })

    function calculateText() {
        var result = "";
        selectedChoices.forEach(function(value, key) {
            console.log(value + " - " + key);
            if (value) {
                if (result == "") {
                    result += key;
                } else {
                    result += " ," + key;
                }
                // result += key + " ,";
            }
        });
        $("#selectedChoices").val(result);
    }

});
