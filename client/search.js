var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['title', 'content'];

PackageSearch = new SearchSource('posts', fields, options);

Template.searchResult.helpers({
  getPackages: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return PackageSearch.getStatus().loading;
  }
});

Template.searchResult.rendered = function() {
  PackageSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PackageSearch.search(text);
  }, 200)
});

Template.home.onRendered(function() {
  let settings = 'pjs-settings.json';
  this.autorun(() => {
    if (particlesJS) {
      console.log(`loading particles.js config from "${settings}"...`)
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('particles-js', settings, function () {
        console.log('callback - particles.js config loaded');
      });
    }
  });
});

StandardLegends = new Mongo.Collection(null);

Template.searchBox.helpers({
  settings: function() {
    return {
      position: Session.get("position"),
      limit: 5,
      rules: [
        {
          // token: '',
          collection: StandardLegends,
          field: 'legend',
          matchAll: true,
          template: Template.standardLegends
        }
      ]
    };
  },
  legends: function() {
    return StandardLegends.find();
  }
});

[
  {
    legend: '110° HOT WATER RETURN',
    code: '355',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: '110° HOT WATER RETURN',
    code: '360',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: '110° HOT WATER SUPPLY',
    code: '361',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: '110° HOT WATER SUPPLY',
    code: '356',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: '140° HOT WATER RETURN',
    code: '357',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: '140° HOT WATER RETURN',
    code: '362',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: '140° HOT WATER SUPPLY',
    code: '364',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: '140° HOT WATER SUPPLY',
    code: '358',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: 'ACID',
    code: '100',
    year: '2007',
    color: 'Black',
    bg: 'Orange'
  },
  {
    legend: 'ACID',
    code: '108',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: 'ACID VENT',
    code: '102',
    year: '2007',
    color: 'Black',
    bg: 'Orange'
  },
  {
    legend: 'ACID VENT',
    code: '106',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: 'ACID WASTE',
    code: '105',
    year: '2007',
    color: 'Black',
    bg: 'Orange'
  },
  {
    legend: 'ACID WASTE',
    code: '107',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: 'AIR',
    code: '111',
    year: '2007',
    color: 'White',
    bg: 'Blue'
  },
  {
    legend: 'AMMONIA',
    code: '115',
    year: '2007',
    color: 'Black',
    bg: 'Orange'
  },
  {
    legend: 'AMMONIA',
    code: '117',
    year: '1996',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: 'ARGON',
    code: '118',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: 'ASBESTOS FREE',
    code: '119',
    year: '2007',
    color: 'White',
    bg: 'Blue'
  },
  {
    legend: 'BOILER BLOW DOWN',
    code: '120',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: 'BOILER FEED WATER',
    code: '121',
    year: '2007',
    color: 'White',
    bg: 'Green'
  },
  {
    legend: 'CARBON DIOXIDE',
    code: '122',
    year: '2007',
    color: 'Black',
    bg: 'Yellow'
  },
  {
    legend: 'CARBON DIOXIDE',
    code: '124',
    year: '2007',
    color: 'White',
    bg: 'Silver'
  },
  {
    legend: 'FREE FOOD',
    code: '42',
    year: '2014',
    color: 'Red',
    bg: 'White'
  },
  {
    legend: '',
    code: '',
    year: '',
    color: '',
    bg: ''
  }
].forEach(function (obj) {
  StandardLegends.insert(obj);
});
