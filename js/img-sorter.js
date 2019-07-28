'use strict';

(function () {

    window.activateFilter = function (buttonActive) {

        var imgFilters = document.querySelector('.img-filters');
        var photosFilters = imgFilters.querySelectorAll('button');
        photosFilters.forEach(function (elem) {
            elem.classList.remove('img-filters__button--active');
        });
        buttonActive.classList.add('img-filters__button--active');
    };

    var clearPictures = function () {
        similarListElement.querySelectorAll('.picture').forEach(function (element) {
            element.remove();
        });
    };

    var onFilterButtonClick = function (evt) {
        clearPictures();
        activateFilter(evt.target);
        var id = evt.target.id;
        if (id === 'filter-popular') {
            renderPhotos(picturesBlock);
        } else if (id === 'filter-new') {
            showNewFotos(picturesBlock);
        } else if (id === 'filter-discussed') {
            showDiscussedFotos(picturesBlock);
        }
    };
})();
