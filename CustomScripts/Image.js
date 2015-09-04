var imageModule = (function () {
    var Image = (function () {
        var Image = {};
        Object.defineProperties(Image, {
            init: {
                value: function (src) {
                    this.src = src;
                    return this;
                }
            },
            src: {
                get: function () {
                    return this._src;
                },
                set: function (value) {
                    this._src = value;
                }
            }
        });
        return Image;
    }());


    return {
        getImage: function (src) {
            return Object.create(Image).init(src);
        }
    };
}());

