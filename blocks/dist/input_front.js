document.addEventListener("click", function (evt) {
    // gestion input number increment / decrement
    var element = evt.target.closest(".input-button-plus") || evt.target.closest(".input-button-minus");
    var group = evt.target.closest(".input-group");
    var input = group && group.querySelector('input[type="number"]');
    if (element && group && input) {
        var value = parseInt(input.value) || 0;
        if (element.classList.contains("input-button-plus")) value++;
        else value--;

        if (input.getAttribute("max") && value > parseInt(input.getAttribute("max"))) {
            value = parseInt(input.getAttribute("max"));
        }

        if (input.getAttribute("min") && value < parseInt(input.getAttribute("min"))) {
            value = parseInt(input.getAttribute("min"));
        }

        input.value = value;
        clearValidated(input);
        return;
    }

    // gestion to confirm
    var element = evt.target.closest(".to-confirm");
    var container = evt.target.closest(".flex-group");
    var group = container && container.querySelector(".input-group");
    var input = group && group.querySelector("input");
    if (element && group && input) {
        group.classList.add("validated");
        input.addEventListener(
            "input",
            function (evt) {
                clearValidated(evt.target);
            }.bind(this)
        );
        return;
    }

    // check lors du submit

    var btn = evt.target.closest('input[type="submit"]');
    var form = btn && btn.closest("form");
    var toCompletes = form && form.querySelectorAll(".to-confirm");
    if (toCompletes && toCompletes.length > 0) {
        let formValidated = true;

        toCompletes.forEach(function (item) {
            var container = item.closest(".flex-group");
            var group = container && container.querySelector(".input-group");
            if (!group.classList.contains("validated")) {
                formValidated = false;
            }
        });

        if (!formValidated) {
            evt.preventDefault();
            evt.stopPropagation();
            form.querySelector(".wp-block-gutenberg-alert.not-validated").classList.add("show");
        }
    }
});

function clearValidated(input) {
    var group = input.closest(".input-group");
    if (group && group.classList.contains("validated")) {
        group.classList.remove("validated");
        input.removeEventListener("input", clearValidated);
    }
}
