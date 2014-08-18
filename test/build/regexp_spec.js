// Generated by CoffeeScript 1.7.1
(function() {
  describe('$.fn.getSerializedForm.regexp', function() {
    describe('simple', function() {
      beforeEach(function() {
        return this.regexp = $.fn.getSerializedForm.regexp.simple;
      });
      it('should match against simple field names', function() {
        return expect('simple_field').to.match(this.regexp);
      });
      it('should not match against array field names', function() {
        return expect('array_field[]').to.not.match(this.regexp);
      });
      return it('should not match against named array field names', function() {
        return expect('named_array_field[test]').to.not.match(this.regexp);
      });
    });
    describe('array', function() {
      beforeEach(function() {
        return this.regexp = $.fn.getSerializedForm.regexp.array;
      });
      it('should match against array field names', function() {
        return expect('array_field[]').to.match(this.regexp);
      });
      it('should not match against simple field names', function() {
        return expect('simple_field').to.not.match(this.regexp);
      });
      return it('should not match against named array field names', function() {
        return expect('named_array_field[test]').to.not.match(this.regexp);
      });
    });
    return describe('named', function() {
      beforeEach(function() {
        return this.regexp = $.fn.getSerializedForm.regexp.named;
      });
      it('should match against named array field names', function() {
        return expect('named_array_field[test]').to.match(this.regexp);
      });
      it('should not match against array field names', function() {
        return expect('array_field[]').to.not.match(this.regexp);
      });
      return it('should not match against simple field names', function() {
        return expect('simple_field').to.not.match(this.regexp);
      });
    });
  });

}).call(this);
