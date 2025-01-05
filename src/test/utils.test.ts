import * as utils from '../utils.js';

const expect = chai.expect;

describe('Word', function () {
  const Word = utils.Word;

  describe('#capitalize()', function () {
    it('It returns a word with its first letter in uppercase.', function () {
      const values = [
        new Word('box').capitalize(),
        new Word('churches').capitalize(),
        new Word('class').capitalize(),
        new Word('countries').capitalize(),
        new Word('dog').capitalize(),
        new Word('entries').capitalize(),
        new Word('leg').capitalize(),
        new Word('pies').capitalize(),
        new Word('service').capitalize(),
      ];

      expect(values.shift()).to.equal('Box');
      expect(values.shift()).to.equal('Churches');
      expect(values.shift()).to.equal('Class');
      expect(values.shift()).to.equal('Countries');
      expect(values.shift()).to.equal('Dog');
      expect(values.shift()).to.equal('Entries');
      expect(values.shift()).to.equal('Leg');
      expect(values.shift()).to.equal('Pies');
      expect(values.shift()).to.equal('Service');
    });
  });

  describe('#format()', function () {
    it('It formats a word so that it\'s in the same format as another word.', function () {
      const values = [
        new Word('Industry').format('Zone'),
        new Word('Idea').format('year'),
        new Word('House').format('Walls'),
        new Word('Game').format('values'),
        new Word('flower').format('Unit'),
        new Word('family').format('table'),
        new Word('entry').format('Schools'),
        new Word('dog').format('reasons'),
        new Word('Countries').format('Question'),
        new Word('Classes').format('party'),
        new Word('Churches').format('Offices'),
        new Word('Cats').format('names'),
        new Word('cars').format('Map'),
        new Word('boxes').format('key'),
        new Word('apples').format('Lifes'),
        new Word('airplanes').format('jobs'),
      ];

      expect(values.shift()).to.equal('Industry');
      expect(values.shift()).to.equal('idea');
      expect(values.shift()).to.equal('Houses');
      expect(values.shift()).to.equal('games');
      expect(values.shift()).to.equal('Flower');
      expect(values.shift()).to.equal('family');
      expect(values.shift()).to.equal('Entries');
      expect(values.shift()).to.equal('dogs');
      expect(values.shift()).to.equal('Country');
      expect(values.shift()).to.equal('class');
      expect(values.shift()).to.equal('Churches');
      expect(values.shift()).to.equal('cats');
      expect(values.shift()).to.equal('Car');
      expect(values.shift()).to.equal('box');
      expect(values.shift()).to.equal('Apples');
      expect(values.shift()).to.equal('airplanes');
    });
  });

  describe('#isCapitalized()', function () {
    it('It indicates whether the first letter of a word is capitalized.', function () {
      const values = [
        new Word('Box').isCapitalized(),
        new Word('church').isCapitalized(),
        new Word('Class').isCapitalized(),
        new Word('country').isCapitalized(),
        new Word('Dog').isCapitalized(),
        new Word('entry').isCapitalized(),
        new Word('Leg').isCapitalized(),
        new Word('pie').isCapitalized(),
        new Word('Service').isCapitalized(),
      ];

      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
    });
  });

  describe('#isSingular()', function () {
    it('It indicates whether a word is in singular form.', function () {
      const values = [
        new Word('box').isSingular(),
        new Word('churches').isSingular(),
        new Word('class').isSingular(),
        new Word('countries').isSingular(),
        new Word('dog').isSingular(),
        new Word('entries').isSingular(),
        new Word('leg').isSingular(),
        new Word('pies').isSingular(),
        new Word('service').isSingular(),
      ];

      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
      expect(values.shift()).to.be.false;
      expect(values.shift()).to.be.true;
    });
  });

  describe('#toPlural()', function () {
    it('It returns the plural form of a word in singular form.', function () {
      const values = [
        new Word('box').toPlural(),
        new Word('church').toPlural(),
        new Word('class').toPlural(),
        new Word('country').toPlural(),
        new Word('dog').toPlural(),
        new Word('entry').toPlural(),
        new Word('leg').toPlural(),
        new Word('pie').toPlural(),
        new Word('service').toPlural(),
        new Word('life').toPlural(),
      ];
  
      expect(values.shift()).to.equal('boxes');
      expect(values.shift()).to.equal('churches');
      expect(values.shift()).to.equal('classes');
      expect(values.shift()).to.equal('countries');
      expect(values.shift()).to.equal('dogs');
      expect(values.shift()).to.equal('entries');
      expect(values.shift()).to.equal('legs');
      expect(values.shift()).to.equal('pies');
      expect(values.shift()).to.equal('services');
      expect(values.shift()).to.equal('lives');
    });

    it('It returns the plural form of a word in plural form.', function () {
      const values = [
        new Word('boxes').toPlural(),
        new Word('churches').toPlural(),
        new Word('classes').toPlural(),
        new Word('countries').toPlural(),
        new Word('dogs').toPlural(),
        new Word('entries').toPlural(),
        new Word('legs').toPlural(),
        new Word('pies').toPlural(),
        new Word('services').toPlural(),
      ];

      expect(values.shift()).to.equal('boxes');
      expect(values.shift()).to.equal('churches');
      expect(values.shift()).to.equal('classes');
      expect(values.shift()).to.equal('countries');
      expect(values.shift()).to.equal('dogs');
      expect(values.shift()).to.equal('entries');
      expect(values.shift()).to.equal('legs');
      expect(values.shift()).to.equal('pies');
      expect(values.shift()).to.equal('services');
    });
  });

  describe('#toSingular()', function () {
    it('It returns the singular form of a word in plural form.', function () {
      const values = [
        new Word('boxes').toSingular(),
        new Word('churches').toSingular(),
        new Word('classes').toSingular(),
        new Word('countries').toSingular(),
        new Word('dogs').toSingular(),
        new Word('entries').toSingular(),
        new Word('legs').toSingular(),
        new Word('pies').toSingular(),
        new Word('services').toSingular(),
      ];

      expect(values.shift()).to.equal('box');
      expect(values.shift()).to.equal('church');
      expect(values.shift()).to.equal('class');
      expect(values.shift()).to.equal('country');
      expect(values.shift()).to.equal('dog');
      expect(values.shift()).to.equal('entry');
      expect(values.shift()).to.equal('leg');
      expect(values.shift()).to.equal('pie');
      expect(values.shift()).to.equal('service');
    });
  });

  describe('#uncapitalize()', function () {
    it('It returns a word with its first letter in lowercase.', function () {
      const values = [
        new Word('Box').uncapitalize(),
        new Word('church').uncapitalize(),
        new Word('Class').uncapitalize(),
        new Word('country').uncapitalize(),
        new Word('Dog').uncapitalize(),
        new Word('entry').uncapitalize(),
        new Word('Leg').uncapitalize(),
        new Word('pie').uncapitalize(),
        new Word('Service').uncapitalize(),
      ];

      expect(values.shift()).to.equal('box');
      expect(values.shift()).to.equal('church');
      expect(values.shift()).to.equal('class');
      expect(values.shift()).to.equal('country');
      expect(values.shift()).to.equal('dog');
      expect(values.shift()).to.equal('entry');
      expect(values.shift()).to.equal('leg');
      expect(values.shift()).to.equal('pie');
      expect(values.shift()).to.equal('service');
    });
  });

  it('It returns the singular form of a word in singular form.', function () {
    const values = [
      new Word('box').toSingular(),
      new Word('church').toSingular(),
      new Word('class').toSingular(),
      new Word('country').toSingular(),
      new Word('dog').toSingular(),
      new Word('entry').toSingular(),
      new Word('leg').toSingular(),
      new Word('pie').toSingular(),
      new Word('service').toSingular(),
    ];

    expect(values.shift()).to.equal('box');
    expect(values.shift()).to.equal('church');
    expect(values.shift()).to.equal('class');
    expect(values.shift()).to.equal('country');
    expect(values.shift()).to.equal('dog');
    expect(values.shift()).to.equal('entry');
    expect(values.shift()).to.equal('leg');
    expect(values.shift()).to.equal('pie');
    expect(values.shift()).to.equal('service');
  });
});

describe('getRelevantSymbols()', function () {
  const getRelevantSymbols = utils.getRelevantSymbols;

  it('It returns an array of relevant symbols for a for... of loop.', function () {
    {
      const symbol = 'person';
      const text = 'for (const person of persons) {';
      const symbols = getRelevantSymbols(symbol, text);

      expect(symbols.length).to.equal(2);
      expect(symbols.at(0)?.value).to.equal('person');
      expect(symbols.at(1)?.value).to.equal('persons');
    }
    {
      const symbol = 'persons';
      const text = 'for (const person of persons) {';
      const symbols = utils.getRelevantSymbols(symbol, text);
  
      expect(symbols.length).to.equal(2);
      expect(symbols.at(0)?.value).to.equal('person');
      expect(symbols.at(1)?.value).to.equal('persons');
    }
  });

  it('It returns an array of relevant symbols for a method call.', function () {
    {
      const symbol = 'persons';
      const text = 'persons.forEach(person => {';
      const symbols = getRelevantSymbols(symbol, text);
      
      expect(symbols.length).to.equal(2);
      expect(symbols.at(0)?.value).to.equal('persons');
      expect(symbols.at(1)?.value).to.equal('person');
    }
    {
      const symbol = 'person';
      const text = 'for (const person of persons) {';
      const symbols = utils.getRelevantSymbols(symbol, text);
  
      expect(symbols.length).to.equal(2);
      expect(symbols.at(0)?.value).to.equal('person');
      expect(symbols.at(1)?.value).to.equal('persons');
    }
    {
      const symbol = 'items';
      const text = 'items.push(element);';
      const symbols = utils.getRelevantSymbols(symbol, text);

      expect(symbols.length).to.equal(1);
      expect(symbols.at(0)?.value).to.equal('items');
    }
    {
      const symbol = 'item';
      const text = 'const item = items.find(item => item)';
      const symbols = utils.getRelevantSymbols(symbol, text);

      expect(symbols.length).to.equal(4);
      expect(symbols.at(0)?.value).to.equal('item');
      expect(symbols.at(1)?.value).to.equal('items');
      expect(symbols.at(2)?.value).to.equal('item');
      expect(symbols.at(3)?.value).to.equal('item');
    }
  });
});

describe('getSymbols()', function () {
  const getSymbols = utils.getSymbols; 

  it('It returns a list of symbols for a for... of loop.', function () {
    const text = 'for (const person of persons) {';
    const regex = utils.regexes.symbols;
    const symbols = getSymbols(text, regex);
  
    expect(symbols.length).to.equal(2);
    expect(symbols.at(0)?.value).to.equal('person');
    expect(symbols.at(1)?.value).to.equal('persons');
  });

  it('It returns a list of symbols for a method call.', function () {
    const text = 'persons.forEach(person => {';
    const regex = utils.regexes.symbols;
    const symbols = getSymbols(text, regex);
  
    expect(symbols.length).to.equal(3);
    expect(symbols.at(0)?.value).to.equal('persons');
    expect(symbols.at(1)?.value).to.equal('forEach');
    expect(symbols.at(2)?.value).to.equal('person');
  });

  it('It returns a list of symbols for a sort method.', function () {
    const text = 'persons.sort((person1, person2));';
    const regex = utils.regexes.symbols;
    const symbols = getSymbols(text, regex);
  
    expect(symbols.length).to.equal(4);
    expect(symbols.at(0)?.value).to.equal('persons');
    expect(symbols.at(1)?.value).to.equal('sort');
    expect(symbols.at(2)?.value).to.equal('person1');
    expect(symbols.at(3)?.value).to.equal('person2');
  });

  it('It returns a list of symbols for a declaration.', function () {
    const text = 'const person = persons[0];';
    const regex = utils.regexes.symbols;
    const symbols = getSymbols(text, regex);
  
    expect(symbols.length).to.equal(2);
    expect(symbols.at(0)?.value).to.equal('person');
    expect(symbols.at(1)?.value).to.equal('persons');
  });
});

describe('formatSymbol()', function () {
  const formatSymbol = utils.formatSymbol;

  it('It replaces the noun of a symbol.', function () {
    {
      const symbol = 'person';
      const noun = 'persons';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('person');
    }
    {
      const symbol = 'persons';
      const noun = 'person';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('persons');
    }
    {
      const symbol = 'dog';
      const noun = 'cat';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('cat');
    }
    {
      const symbol = 'dogs';
      const noun = 'cat';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('cats');
    }
    {
      const symbol = 'internationalHotels';
      const noun = 'destination';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('internationalDestinations');
    }
    {
      const symbol = 'internationalHotels';
      const noun = 'destinations';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('internationalDestinations');
    }
    {
      const symbol = 'internationalHotel';
      const noun = 'destination';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('internationalDestination');
    }
    {
      const symbol = 'internationalHotel';
      const noun = 'destinations';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('internationalDestination');
    }
    {
      const symbol = 'card1';
      const noun = 'invoices';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('invoice1');
    }
    {
      const symbol = 'card1';
      const noun = 'invoice';
      const value = formatSymbol(symbol, noun);

      expect(value).to.equal('invoice1');
    }
  });
});

describe('getNounInformation()', function () {
  const getNounInformation = utils.getNounInformation;

  it('It returns information about the noun of a symbol.', function () {
    {
      const noun = 'person';
      const information = getNounInformation(noun);

      expect(information).to.deep.equal({
        value: 'person',
        parts: ['person'],
        index: 0,
      });
    }
    {
      const noun = 'persons';
      const information = getNounInformation(noun);

      expect(information).to.deep.equal({
        value: 'persons',
        parts: ['persons'],
        index: 0,
      });
    }
    {
      const noun = 'internationalHotels';
      const information = getNounInformation(noun);

      expect(information).to.deep.equal({
        value: 'Hotels',
        parts: ['international', 'Hotels'],
        index: 1,
      });
    }
    {
      const noun = 'internationalHotel';
      const information = getNounInformation(noun);

      expect(information).to.deep.equal({
        value: 'Hotel',
        parts: ['international', 'Hotel'],
        index: 1,
      });
    }
    {
      const noun = 'card1';
      const information = getNounInformation(noun);

      expect(information).to.deep.equal({
        value: 'card',
        parts: ['card', '1'],
        index: 0,
      });
    }
    
  });
});

describe('getParts()', function () {
  const getParts = utils.getParts;

  it('It returns the parts of a symbol.', function () {
    {
      const symbol = 'persons';
      const parts = getParts(symbol);

      expect(parts.length).to.equal(1);
      expect(parts.at(0)).to.equal('persons');
    }
    {
      const symbol = 'helloWorld';
      const parts = getParts(symbol);

      expect(parts.length).to.equal(2);
      expect(parts.at(0)).to.equal('hello');
      expect(parts.at(1)).to.equal('World');
    }
    {
      const symbol = 'internationalHotels';
      const parts = getParts(symbol);

      expect(parts.length).to.equal(2);
      expect(parts.at(0)).to.equal('international');
      expect(parts.at(1)).to.equal('Hotels');
    }
    {
      const symbol = 'internationalHotel';
      const parts = getParts(symbol);

      expect(parts.length).to.equal(2);
      expect(parts.at(0)).to.equal('international');
      expect(parts.at(1)).to.equal('Hotel');
    }
    {
      const symbol = 'card1';
      const parts = getParts(symbol);

      expect(parts.length).to.equal(2);
      expect(parts.at(0)).to.equal('card');
      expect(parts.at(1)).to.equal('1');
    }
  });
});