describe('Word', function () {
  const Word = exports.Word;

  describe('#toSingular()', function () {
    it('Returns the singular form of a word.', function () {
       const value1 = (new Word('boxes')).toSingular();
       const value2 = (new Word('churches')).toSingular();
       const value3 = (new Word('classes')).toSingular();
       const value4 = (new Word('countries')).toSingular();
       const value5 = (new Word('dogs')).toSingular();
       const value6 = (new Word('entries')).toSingular();
       const value7 = (new Word('lies')).toSingular();
       const value8 = (new Word('pies')).toSingular();
       const value9 = (new Word('services')).toSingular();

       chai.expect(value1).to.equal('box');
       chai.expect(value2).to.equal('church');
       chai.expect(value3).to.equal('class');
       chai.expect(value4).to.equal('country');
       chai.expect(value5).to.equal('dog');
       chai.expect(value6).to.equal('entry');
       chai.expect(value7).to.equal('lie');
       chai.expect(value8).to.equal('pie');
       chai.expect(value9).to.equal('service');
    });
  });
});