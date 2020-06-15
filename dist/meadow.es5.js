/*!
 * meadow.js v1.1.3
 * (c) 2020 Nguyen Thanh
 * Released under the MIT License.
 */
!function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    global.Meadow = factory();
  }
}(this || self, function () {
  "use strict";
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var path = "images";
  var BIRDS = ["greenbird", "bluebird", "redbird", "ufo"];
  var CLASS_PUBLIC = "_" + Math.random().toString().replace(/\./g, "");

  function random(_1, _2) {
    if (arguments.length === 1) return "length" in _1 ? _1[Math.floor(Math.random() * _1.length)] : Math.random() * _1;
    if (arguments.length === 2) return _1 + Math.random() * (_2 - _1);
  }

  function getWidth(el) {
    return parseFloat(window.getComputedStyle(el).width);
  }

  function getHeight(el) {
    return parseFloat(window.getComputedStyle(el).height);
  }

  function exCSS(r) {
    return document.documentElement.style[r] != null;
  }

  var mprefix = ' -webkit- -moz- -ms- -o- -khtml-'.split(' '),
      xprefix = /\-(?:webkit|moz|ms|o|khtml)\-/i,
      _prefix = mprefix.length;

  function prefix(r) {
    r = r.replace(xprefix, '');
    var i = 0;

    while (i < _prefix) {
      if (exCSS(mprefix[i] + r)) return mprefix[i] + r;
      i++;
    }

    return undefined;
  }

  function domify(html) {
    var vnode = document.createElement("div");
    vnode.innerHTML = html;
    return vnode.children[0];
  }

  function getPrefix() {
    return prefix("animation").replace("animation", "");
  }

  var device = {
    get ww() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },

    get wh() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

  };

  var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (e) {
    window.setTimeout(e, 100 / 6);
  };

  var BirdFly =
  /*#__PURE__*/
  function () {
    function BirdFly(el, style) {
      _classCallCheck(this, BirdFly);

      this.$el = el;
      this.$style = style;
      var d = Math.random();
      if (d < 0.5) this.x = -getWidth(this.$el);else this.x = device.ww;
      if (this.x > 0) this.reverse();
      this.y = random(0, device.wh);
      this.speedX = d < 0.5 ? 1 : -1;
      this.speedY = this.y < device.wh / 2 ? random(0.5, 2) : random(-0.5, -2);
      this.update();
    }

    _createClass(BirdFly, [{
      key: "reverse",
      value: function reverse() {
        this.$el.style[prefix("transform")] = "rotateY(180deg)";
      }
    }, {
      key: "draw",
      value: function draw() {
        this.$el.style.top = this.y + "px";
        this.$el.style.left = this.x + "px";
      }
    }, {
      key: "update",
      value: function update() {
        if (this.x > device.ww || this.y + getHeight(this.$el) < 0 || this.y > device.wh) {
          this.$el.remove();
          this.$style.remove();
          return;
        }

        this.draw();
        this.x += this.speedX;
        this.y += this.speedY;
        requestAnimationFrame(this.update.bind(this));
      }
    }]);

    return BirdFly;
  }();

  function createBird(url) {
    var name = random(BIRDS);
    var width,
        height,
        key = Math.random().toString().replace(/\./g, "");
    if (name == "deliverybird" || name == "redbird") width = 24;else width = height = 33;
    if (name == "deliverybird") height = 30;
    if (name == "redbird") height = 27;
    var style = "\n\t._".concat(key, "-").concat(name, "-parent {\n\t\twidth: ").concat(width, "px;\n\t\theight: ").concat(height, "px;\n\t\tposition: fixed;\n\t\tpoint-events: none;\n\t\tz-index: ", 9e99, ";\n\t}\n\t._").concat(key, "-").concat(name, " {\n\t\twidth: ").concat(width, "px;\n\t\theight: ").concat(height, "px;\n\t\tbackground: url(\"").concat(url, "/").concat(name, "_0.png\") 100% center no-repeat;\n\t\t").concat(prefix("animation"), ": _").concat(key, "-").concat(name, "-animate .35s linear infinite;\n\t}\n\n\t@").concat(getPrefix(), "keyframes _").concat(key, "-").concat(name, "-animate {\n\t\t0% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_0.png\");\n\t\t\t").concat(prefix("transform"), ": translateY(-3px);\n\t\t}\n\t\t17% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_1.png\");\n\t\t\t").concat(prefix("transform"), ": translateY(-2px);\n\t\t}\n\t\t34% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_2.png\");\n\t\t\t").concat(prefix("transform"), ": translateY(-1px);\n\t\t}\n\t\t51% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_ground.png\")\n\t\t\t").concat(prefix("transform"), ": translateY(0px);\n\t\t}\n\t\t68% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_2.png\");\n\t\t\t").concat(prefix("transform"), ": translateY(-1px);\n\t\t}\n\t\t85% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_1.png\");\n\t\t\t").concat(prefix("transform"), ": translateY(-2px);\n\t\t}\n\t\t100% {\n\t\t\tbackground-image: url(\"").concat(url, "/").concat(name, "_0.png\");\n\t\t\t").concat(prefix("transform"), ": translateY(-3px);\n\t\t}\n\t}");

    var _style = domify("<style type=\"text/css\" data-id=\"".concat(key, "-css\"></style>"));

    _style.innerHTML = style;
    document.head.appendChild(_style);
    var el = domify("<div class=\"_".concat(key, "-").concat(name, "-parent _").concat(CLASS_PUBLIC, "-bird\">\n\t\t<div class=\"_").concat(key, "-").concat(name, "\"></div>\n\t</div>"));
    document.body.appendChild(el);

    try {
      new BirdFly(el, _style);
    } catch (e) {
      console.log(e + "");
    }

    return key;
  }

  function _createBird() {
    createBird(path);
    setTimeout(function () {
      return document.querySelectorAll("._".concat(CLASS_PUBLIC, "-bird")).length < 2 && _createBird();
    }, random(5000, 10000));
  }

  function getCount(array, value) {
    return array.reduce(function (a, b) {
      return a + (b == value);
    }, 0);
  }

  function getItems() {
    var res = [];

    for (var i = 0; i < device.ww / 36; i++) {
      var val = Math.round(random(0, 20));

      if (getCount(res, val) > 1) {
        i--;
        continue;
      }

      res.push(val);
    }

    return res;
  }

  var items = getItems();

  function createGardens() {
    var key = Math.random().toString().replace(/\./g, "");
    var el = "\n    \t<div class=\"fixed-bottom text-center mx-0 px-0 _".concat(CLASS_PUBLIC, "-gardens\" style=\"point-events: none;z-index: ", 9e99, ";\">") + items.map(function (e, index) {
      var deg = random(-25.7, 25.7);
      return "\n\t\t\t<img class=\"mr-2 ".concat(index == 0 ? 'ml-0 ' : index == 8 ? 'mr-0 ' : '', "_").concat(key, "-gardents-item-").concat(index, "\"\n\t\t\t\tsrc=\"").concat(path, "/plant_").concat(e, ".png\">\n\t\t\t<style type=\"text/css\">\n\t\t\t\t\n    \t\t\t._").concat(key, "-gardents-item-").concat(index, " {\n\t\t\t\t\t").concat(prefix("transform-origin"), ": center bottom;\n\t\t\t\t\t").concat(prefix("transform"), ": rotate(").concat(deg, "deg) translateY(3px);\n\t\t\t\t\t").concat(prefix("animation"), ": _").concat(key, "-gardents-item-").concat(index, "-animate 5s ease-in-out 100;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t@").concat(getPrefix(), "keyframes _").concat(key, "-gardents-item-").concat(index, "-animate {\n    \t\t\t\t0%, 100% {\n    \t\t\t\t    ").concat(prefix("transform"), ": rotate(").concat(deg, "deg) translateX(").concat(deg > 0 ? 3 : -3, "px) translateY(3px);\n    \t\t\t\t}\n    \t\t\t\t50% {\n    \t\t\t\t    ").concat(prefix("transform"), ": rotate(").concat(-deg, "deg) translateX(").concat(deg > 0 ? -3 : 3, "px) translateY(3px);\n    \t\t\t\t}\n\t\t\t\t}\n\t\t\t</style>\n\t\t\t\t");
    }).join("\n") + "\n\t\t</div>\n    "; //console.log( el )

    document.body.appendChild(domify(el));
  }

  var methods = {
    createBird: _createBird,
    createGardens: createGardens,
    _createBird: createBird,
    all: function all() {
      this.createBird();
      this.createGardens();
    },

    set path(e) {
      path = e;
    },

    get path() {
      return path;
    },

    set birds(e) {
      BIRDS = e;
    },

    get birds() {
      return BIRDS;
    },

    remove: function remove() {
      [].slice.call(document.querySelectorAll("._" + CLASS_PUBLIC + "-gardens")).forEach(function (e) {
        return e.remove();
      });
    },
    update: function update() {
      var length = ~~(device.ww / 36) + 1;

      if (items.length > length) {
        items = items.slice(0, 9);
      } else {
        for (var i = 0; i < length - items.length; i++) {
          var val = Math.round(random(0, 20));

          if (getCount(items, val) > 1) {
            i--;
            continue;
          }

          items.push(val);
        }
      }

	   methods.remove()
      methods.createGardens();
    },

    set resize(e) {
      if (e === false) {
        window.removeEventListener("resize", this.update);
        window.removeEventListener("orientationchange", this.update);
      }
    }

  };
  window.addEventListener("resize", methods.update);
  window.addEventListener("orientationchange", methods.update);
  return methods;
});
