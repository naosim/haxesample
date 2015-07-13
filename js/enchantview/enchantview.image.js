var Image = function(/* image1, image2, ... */) {
    var image = {};
    var imagePath = function (name) {
        return "js/enchant.js-builds-0.8.2-b/images/" + name + ".png";
    };
    var addImage = function (name) {
        image[name] = imagePath(name);
    };
    var addImages = function (names) {
        for(var i = 0; i < names.length; i++) addImage(names[i]);
    };
    var images = arguments;
    var result = {};
    var image.all = images;

}