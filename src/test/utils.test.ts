import * as utils from '../utils.js';

describe('Word', function () {
  const Word = utils.Word;

  describe('#capitalize()', function () {
    it('It returns a word with its first letter in uppercase.', function () {
      const value1 = new Word('box').capitalize();
      const value2 = new Word('churches').capitalize();
      const value3 = new Word('class').capitalize();
      const value4 = new Word('countries').capitalize();
      const value5 = new Word('dog').capitalize();
      const value6 = new Word('entries').capitalize();
      const value7 = new Word('leg').capitalize();
      const value8 = new Word('pies').capitalize();
      const value9 = new Word('service').capitalize();

      chai.expect(value1).to.equal('Box');
      chai.expect(value2).to.equal('Churches');
      chai.expect(value3).to.equal('Class');
      chai.expect(value4).to.equal('Countries');
      chai.expect(value5).to.equal('Dog');
      chai.expect(value6).to.equal('Entries');
      chai.expect(value7).to.equal('Leg');
      chai.expect(value8).to.equal('Pies');
      chai.expect(value9).to.equal('Service');
    });
  });

  describe('#format()', function () {
    it('It formats a word so that it\'s in the same format as another word.', function () {
      const value1 = new Word('Industry').format('Zone');
      const value2 = new Word('Idea').format('year');
      const value3 = new Word('House').format('Walls');
      const value4 = new Word('Game').format('values');
      const value5 = new Word('flower').format('Unit');
      const value6 = new Word('family').format('table');
      const value7 = new Word('entry').format('Schools');
      const value8 = new Word('dog').format('reasons');
      const value9 = new Word('Countries').format('Question');
      const value10 = new Word('Classes').format('party');
      const value11 = new Word('Churches').format('Offices');
      const value12 = new Word('Cats').format('names');
      const value13 = new Word('cars').format('Map');
      const value14 = new Word('boxes').format('key');
      const value15 = new Word('apples').format('Lifes');
      const value16 = new Word('airplanes').format('jobs');

      chai.expect(value1).to.equal('Industry');
      chai.expect(value2).to.equal('idea');
      chai.expect(value3).to.equal('Houses');
      chai.expect(value4).to.equal('games');
      chai.expect(value5).to.equal('Flower');
      chai.expect(value6).to.equal('family');
      chai.expect(value7).to.equal('Entries');
      chai.expect(value8).to.equal('dogs');
      chai.expect(value9).to.equal('Country');
      chai.expect(value10).to.equal('class');
      chai.expect(value11).to.equal('Churches');
      chai.expect(value12).to.equal('cats');
      chai.expect(value13).to.equal('Car');
      chai.expect(value14).to.equal('box');
      chai.expect(value15).to.equal('Apples');
      chai.expect(value16).to.equal('airplanes');
    });
  });

  describe('#isCapitalized()', function () {
    it('It indicates whether the first letter of a word is capitalized.', function () {
      const value1 = new Word('Box').isCapitalized();
      const value2 = new Word('church').isCapitalized();
      const value3 = new Word('Class').isCapitalized();
      const value4 = new Word('country').isCapitalized();
      const value5 = new Word('Dog').isCapitalized();
      const value6 = new Word('entry').isCapitalized();
      const value7 = new Word('Leg').isCapitalized();
      const value8 = new Word('pie').isCapitalized();
      const value9 = new Word('Service').isCapitalized();

      chai.expect(value1).to.be.true;
      chai.expect(value2).to.be.false;
      chai.expect(value3).to.be.true;
      chai.expect(value4).to.be.false;
      chai.expect(value5).to.be.true;
      chai.expect(value6).to.be.false;
      chai.expect(value7).to.be.true;
      chai.expect(value8).to.be.false;
      chai.expect(value9).to.be.true;
    });
  });

  describe('#isSingular()', function () {
    it('It indicates whether a word is in singular form.', function () {
      const value1 = new Word('box').isSingular();
      const value2 = new Word('churches').isSingular();
      const value3 = new Word('class').isSingular();
      const value4 = new Word('countries').isSingular();
      const value5 = new Word('dog').isSingular();
      const value6 = new Word('entries').isSingular();
      const value7 = new Word('leg').isSingular();
      const value8 = new Word('pies').isSingular();
      const value9 = new Word('service').isSingular();

      chai.expect(value1).to.be.true;
      chai.expect(value2).to.be.false;
      chai.expect(value3).to.be.true;
      chai.expect(value4).to.be.false;
      chai.expect(value5).to.be.true;
      chai.expect(value6).to.be.false;
      chai.expect(value7).to.be.true;
      chai.expect(value8).to.be.false;
      chai.expect(value9).to.be.true;
    });
  });

  describe('#toPlural()', function () {
    it('It returns the plural form of a word in singular form.', function () {
        const value1 = new Word('box').toPlural();
        const value2 = new Word('church').toPlural();
        const value3 = new Word('class').toPlural();
        const value4 = new Word('country').toPlural();
        const value5 = new Word('dog').toPlural();
        const value6 = new Word('entry').toPlural();
        const value7 = new Word('leg').toPlural();
        const value8 = new Word('pie').toPlural();
        const value9 = new Word('service').toPlural();
  
        chai.expect(value1).to.equal('boxes');
        chai.expect(value2).to.equal('churches');
        chai.expect(value3).to.equal('classes');
        chai.expect(value4).to.equal('countries');
        chai.expect(value5).to.equal('dogs');
        chai.expect(value6).to.equal('entries');
        chai.expect(value7).to.equal('legs');
        chai.expect(value8).to.equal('pies');
        chai.expect(value9).to.equal('services');
    });

    it('It returns the plural form of a word in plural form.', function () {
      const value1 = new Word('boxes').toPlural();
      const value2 = new Word('churches').toPlural();
      const value3 = new Word('classes').toPlural();
      const value4 = new Word('countries').toPlural();
      const value5 = new Word('dogs').toPlural();
      const value6 = new Word('entries').toPlural();
      const value7 = new Word('legs').toPlural();
      const value8 = new Word('pies').toPlural();
      const value9 = new Word('services').toPlural();

      chai.expect(value1).to.equal('boxes');
      chai.expect(value2).to.equal('churches');
      chai.expect(value3).to.equal('classes');
      chai.expect(value4).to.equal('countries');
      chai.expect(value5).to.equal('dogs');
      chai.expect(value6).to.equal('entries');
      chai.expect(value7).to.equal('legs');
      chai.expect(value8).to.equal('pies');
      chai.expect(value9).to.equal('services');
    });
  });

  describe('#toSingular()', function () {
    it('It returns the singular form of a word in plural form.', function () {
      const value1 = new Word('boxes').toSingular();
      const value2 = new Word('churches').toSingular();
      const value3 = new Word('classes').toSingular();
      const value4 = new Word('countries').toSingular();
      const value5 = new Word('dogs').toSingular();
      const value6 = new Word('entries').toSingular();
      const value7 = new Word('legs').toSingular();
      const value8 = new Word('pies').toSingular();
      const value9 = new Word('services').toSingular();

      chai.expect(value1).to.equal('box');
      chai.expect(value2).to.equal('church');
      chai.expect(value3).to.equal('class');
      chai.expect(value4).to.equal('country');
      chai.expect(value5).to.equal('dog');
      chai.expect(value6).to.equal('entry');
      chai.expect(value7).to.equal('leg');
      chai.expect(value8).to.equal('pie');
      chai.expect(value9).to.equal('service');
    });
  });

  describe('#uncapitalize()', function () {
    it('It returns a word with its first letter in lowercase.', function () {
      const value1 = new Word('Box').uncapitalize();
      const value2 = new Word('church').uncapitalize();
      const value3 = new Word('Class').uncapitalize();
      const value4 = new Word('country').uncapitalize();
      const value5 = new Word('Dog').uncapitalize();
      const value6 = new Word('entry').uncapitalize();
      const value7 = new Word('Leg').uncapitalize();
      const value8 = new Word('pie').uncapitalize();
      const value9 = new Word('Service').uncapitalize();

      chai.expect(value1).to.equal('box');
      chai.expect(value2).to.equal('church');
      chai.expect(value3).to.equal('class');
      chai.expect(value4).to.equal('country');
      chai.expect(value5).to.equal('dog');
      chai.expect(value6).to.equal('entry');
      chai.expect(value7).to.equal('leg');
      chai.expect(value8).to.equal('pie');
      chai.expect(value9).to.equal('service');
    });
  });

  it('It returns the singular form of a word in singular form.', function () {
    const value1 = new Word('box').toSingular();
    const value2 = new Word('church').toSingular();
    const value3 = new Word('class').toSingular();
    const value4 = new Word('country').toSingular();
    const value5 = new Word('dog').toSingular();
    const value6 = new Word('entry').toSingular();
    const value7 = new Word('leg').toSingular();
    const value8 = new Word('pie').toSingular();
    const value9 = new Word('service').toSingular();

    chai.expect(value1).to.equal('box');
    chai.expect(value2).to.equal('church');
    chai.expect(value3).to.equal('class');
    chai.expect(value4).to.equal('country');
    chai.expect(value5).to.equal('dog');
    chai.expect(value6).to.equal('entry');
    chai.expect(value7).to.equal('leg');
    chai.expect(value8).to.equal('pie');
    chai.expect(value9).to.equal('service');
  });
});

describe('getRelevantSymbols()', function () {
  const getRelevantSymbols = utils.getRelevantSymbols;

  it('It returns an array of relevant symbols for a for... of loop.', function () {
    {
      const symbol = 'person';
      const text = 'for (const person of persons) {';
      const symbols = getRelevantSymbols(symbol, text);

      chai.expect(symbols.length).to.equal(2);
      chai.expect(symbols.at(0)?.value).to.equal('person');
      chai.expect(symbols.at(1)?.value).to.equal('persons');
    }
    {
      const symbol = 'persons';
      const text = 'for (const person of persons) {';
      const symbols = utils.getRelevantSymbols(symbol, text);
  
      chai.expect(symbols.length).to.equal(2);
      chai.expect(symbols.at(0)?.value).to.equal('person');
      chai.expect(symbols.at(1)?.value).to.equal('persons');
    }
  });

  it('It returns an array of relevant symbols for a method call.', function () {
    {
      const symbol = 'persons';
      const text = 'persons.forEach(person => {';
      const symbols = getRelevantSymbols(symbol, text);
  
      chai.expect(symbols.length).to.equal(2);
      chai.expect(symbols.at(0)?.value).to.equal('persons');
      chai.expect(symbols.at(1)?.value).to.equal('person');
    }
    {
      const symbol = 'person';
      const text = 'for (const person of persons) {';
      const symbols = utils.getRelevantSymbols(symbol, text);
  
      chai.expect(symbols.length).to.equal(2);
      chai.expect(symbols.at(0)?.value).to.equal('person');
      chai.expect(symbols.at(1)?.value).to.equal('persons');
    }
    {
      const symbol = 'items';
      const text = 'items.push(element);';
      const symbols = utils.getRelevantSymbols(symbol, text);

      chai.expect(symbols.length).to.equal(1);
      chai.expect(symbols.at(0)?.value).to.equal('items');
    }
    {
      const symbol = 'item';
      const text = 'const item = items.find(item => item)';
      const symbols = utils.getRelevantSymbols(symbol, text);

      chai.expect(symbols.length).to.equal(3);
      chai.expect(symbols.at(0)?.value).to.equal('item');
      chai.expect(symbols.at(1)?.value).to.equal('items');
      chai.expect(symbols.at(2)?.value).to.equal('item');
    }
  });
});

describe('getSymbols()', function () {
  const getSymbols = utils.getSymbols; 

  it('It returns a list of symbols for a for... of loop.', function () {
    const text = 'for (const person of persons) {';
    const regex = utils.regexes.forOfLoop;
    const symbols = getSymbols(text, regex);
  
    chai.expect(symbols.length).to.equal(2);
    chai.expect(symbols.at(0)?.value).to.equal('person');
    chai.expect(symbols.at(1)?.value).to.equal('persons');
  });

  it('It returns a list of symbols for a method call.', function () {
    const text = 'persons.forEach(person => {';
    const regex = utils.regexes.methodCall;
    const symbols = getSymbols(text, regex);
  
    chai.expect(symbols.length).to.equal(2);
    chai.expect(symbols.at(0)?.value).to.equal('persons');
    chai.expect(symbols.at(1)?.value).to.equal('person');
  });

  it('It returns a list of symbols for a sort method.', function () {
    const text = 'persons.sort((personA, personB));';
    const regex = utils.regexes.sortMethod;
    const symbols = getSymbols(text, regex);
  
    chai.expect(symbols.length).to.equal(3);
    chai.expect(symbols.at(0)?.value).to.equal('persons');
    chai.expect(symbols.at(1)?.value).to.equal('person');
    chai.expect(symbols.at(2)?.value).to.equal('person');
  });

  it('It returns a list of symbols for a declaration.', function () {
    const text = 'const person = persons[0];';
    const regex = utils.regexes.declaration;
    const symbols = getSymbols(text, regex);
  
    chai.expect(symbols.length).to.equal(2);
    chai.expect(symbols.at(0)?.value).to.equal('person');
    chai.expect(symbols.at(1)?.value).to.equal('persons');
  });
});