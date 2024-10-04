import * as utils from '../utils.js';

describe('Word', function () {
  const Word = utils.Word;

  describe('#isSingular()', function () {
    it('It indicates whether a word is in singular form.', function () {
      const value1 = (new Word('box')).isSingular();
      const value2 = (new Word('church')).isSingular();
      const value3 = (new Word('class')).isSingular();
      const value4 = (new Word('country')).isSingular();
      const value5 = (new Word('dog')).isSingular();
      const value6 = (new Word('entry')).isSingular();
      const value7 = (new Word('lie')).isSingular();
      const value8 = (new Word('pie')).isSingular();
      const value9 = (new Word('service')).isSingular();

      chai.expect(value1).to.be.true;
      chai.expect(value2).to.be.true;
      chai.expect(value3).to.be.true;
      chai.expect(value4).to.be.true;
      chai.expect(value5).to.be.true;
      chai.expect(value6).to.be.true;
      chai.expect(value7).to.be.true;
      chai.expect(value8).to.be.true;
      chai.expect(value9).to.be.true;
    });
  });

  describe('#toPlural()', function () {
    it('It returns the plural form of a word in singular form.', function () {
        const value1 = (new Word('box')).toPlural();
        const value2 = (new Word('church')).toPlural();
        const value3 = (new Word('class')).toPlural();
        const value4 = (new Word('country')).toPlural();
        const value5 = (new Word('dog')).toPlural();
        const value6 = (new Word('entry')).toPlural();
        const value7 = (new Word('lie')).toPlural();
        const value8 = (new Word('pie')).toPlural();
        const value9 = (new Word('service')).toPlural();
  
        chai.expect(value1).to.equal('boxes');
        chai.expect(value2).to.equal('churches');
        chai.expect(value3).to.equal('classes');
        chai.expect(value4).to.equal('countries');
        chai.expect(value5).to.equal('dogs');
        chai.expect(value6).to.equal('entries');
        chai.expect(value7).to.equal('lies');
        chai.expect(value8).to.equal('pies');
        chai.expect(value9).to.equal('services');
    });

    it('It returns the plural form of a word in plural form.', function () {
      const value1 = (new Word('boxes')).toPlural();
      const value2 = (new Word('churches')).toPlural();
      const value3 = (new Word('classes')).toPlural();
      const value4 = (new Word('countries')).toPlural();
      const value5 = (new Word('dogs')).toPlural();
      const value6 = (new Word('entries')).toPlural();
      const value7 = (new Word('lies')).toPlural();
      const value8 = (new Word('pies')).toPlural();
      const value9 = (new Word('services')).toPlural();

      chai.expect(value1).to.equal('boxes');
      chai.expect(value2).to.equal('churches');
      chai.expect(value3).to.equal('classes');
      chai.expect(value4).to.equal('countries');
      chai.expect(value5).to.equal('dogs');
      chai.expect(value6).to.equal('entries');
      chai.expect(value7).to.equal('lies');
      chai.expect(value8).to.equal('pies');
      chai.expect(value9).to.equal('services');
    });
  });

  describe('#toSingular()', function () {
    it('It returns the singular form of a word in plural form.', function () {
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

  it('It returns the singular form of a word in singular form.', function () {
    const value1 = (new Word('box')).toSingular();
    const value2 = (new Word('church')).toSingular();
    const value3 = (new Word('class')).toSingular();
    const value4 = (new Word('country')).toSingular();
    const value5 = (new Word('dog')).toSingular();
    const value6 = (new Word('entry')).toSingular();
    const value7 = (new Word('lie')).toSingular();
    const value8 = (new Word('pie')).toSingular();
    const value9 = (new Word('service')).toSingular();

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


describe('getRelevantSymbols()', function () {
  const getRelevantSymbols = utils.getRelevantSymbols;

  it('It returns an array of relevant symbols for a for... of loop.', function () {
    {
      const text = 'for (const person of persons) {';
      const value = getRelevantSymbols(text);

      chai.expect(value.at(0)?.value).to.equal('person');
    }
    {
      const text = 'for (const person of persons) {';
      const value = utils.getRelevantSymbols(text);
  
      chai.expect(value.at(0)?.value).to.equal('person');
    }
  });

  it('It returns an array of relevant symbols for a method and callback function.', function () {
    {
      const text = 'persons.forEach(person => {';
      const value = getRelevantSymbols(text);
  
      chai.expect(value.at(0)?.value).to.equal('persons');
    }
    {
      const text = 'for (const person of persons) {';
      const value = utils.getRelevantSymbols(text);
  
      chai.expect(value.at(0)?.value).to.equal('person');
    }
  });
});