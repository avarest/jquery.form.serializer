
describe 'jquery.form.serializer', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  afterEach ->
    @sandbox.restore()

  it 'should define a jQuery function named getSerializedForm', ->
    expect($()).to.respondTo('getSerializedForm')

  describe '.getSerializedForm()', ->
    it 'should create an instance of Serializer passing the first form in the
    matching set', ->
      @sandbox.spy($._jQueryFormSerializer, 'Serializer')
      @sandbox.stub($._jQueryFormSerializer.Serializer.prototype, "toJSON")

      form1 = $("<form/>").get(0)
      form2 = $("<form/>").get(0)

      $forms = $()
      $forms = $forms.add(form1)
      $forms = $forms.add(form2)

      $forms.getSerializedForm()

      expect($._jQueryFormSerializer.Serializer).to.have.been.calledOnce
      expect($._jQueryFormSerializer.Serializer.getCall(0).args[0].get(0)).to.eq(form1)

    it 'should return the toJSON function response', ->
      @sandbox.stub($._jQueryFormSerializer.Serializer.prototype, "toJSON")
        .returns("test response")

      expect($().getSerializedForm()).to.eql("test response")
