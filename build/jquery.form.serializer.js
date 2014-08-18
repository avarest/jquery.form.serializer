// Generated by CoffeeScript 1.7.1

/*
 * jquery.form.serializer
 *
 * @copyright 2014, Rodrigo Díaz V. <rdiazv89@gmail.com>
 * @link https://github.com/rdiazv/jquery.form.serializer
 * @license MIT
 * @version 0.1
 */

(function() {
  (function($) {

    /*
     * About the "name" attribute
     * http://www.w3.org/TR/html4/types.html#h-6.2
     */
    var Serializer, regexp, submittable;
    regexp = {
      simple: /^[a-z][\w-:\.]*$/i,
      array: /^([a-z][\w-:\.]*)\[(.*\])$/i
    };
    submittable = {
      selector: 'input, select, textarea',
      filters: {
        enabled: function() {
          return $(this).is(":enabled");
        },
        checked: function() {
          if ($(this).is(":checkbox, :radio")) {
            return $(this).is(":checked");
          } else {
            return true;
          }
        }
      }
    };
    Serializer = (function() {
      function Serializer($this) {
        this.$this = $this;
        this.arrays = {};
      }

      Serializer.prototype.serializeField = function(name, value, fullName) {
        var cleanName, matches, response, _base;
        if (fullName == null) {
          fullName = name;
        }
        response = {};
        if (regexp.simple.test(name)) {
          response[name] = value;
        } else if (matches = name.match(regexp.array)) {
          cleanName = matches[2].replace("]", "");
          if (cleanName === "") {
            if ((_base = this.arrays)[fullName] == null) {
              _base[fullName] = [];
            }
            this.arrays[fullName].push(value);
            response[matches[1]] = this.arrays[fullName];
          } else {
            response[matches[1]] = this.serializeField(cleanName, value, name);
          }
        }
        return response;
      };

      Serializer.prototype.getSubmittableFieldValues = function() {
        var $submittable, fields, filter, _, _ref;
        fields = [];
        $submittable = this.$this.find(submittable.selector).filter("[name]");
        _ref = submittable.filters;
        for (_ in _ref) {
          filter = _ref[_];
          $submittable = $submittable.filter(filter);
        }
        $submittable.each(function() {
          var name;
          name = $(this).attr('name');
          return fields.push([name, $(this).val()]);
        });
        return fields;
      };

      Serializer.prototype.serialize = function() {
        var field, fields, values, _i, _len;
        values = {};
        fields = this.getSubmittableFieldValues();
        for (_i = 0, _len = fields.length; _i < _len; _i++) {
          field = fields[_i];
          $.extend(true, values, this.serializeField(field[0], field[1]));
        }
        return values;
      };

      return Serializer;

    })();
    $.fn.getSerializedForm = function() {
      return new $.fn.getSerializedForm.Serializer(this.first()).serialize();
    };
    $.fn.getSerializedForm.regexp = regexp;
    $.fn.getSerializedForm.submittable = submittable;
    return $.fn.getSerializedForm.Serializer = Serializer;
  })(jQuery);

}).call(this);
