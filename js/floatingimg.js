var margin = 30;

function sizeSpacer(spacer) {
    spacer.style.height = 0;
    var container = spacer.parentNode;
    var img = spacer.nextElementSibling || spacer.nextSibling;
    var lastContentNode = container.children[container.children.length - 1];
    var h = Math.max(0, container.clientHeight - img.clientHeight);
    spacer.style.height = h + "px";
    while (h > margin && img.getBoundingClientRect().bottom > lastContentNode.getBoundingClientRect().bottom + margin) {
        spacer.style.height = --h + "px";
    }
}

onload = onresize = function () {
    sizeSpacer(document.getElementById("spacer"));   
}