(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    array = array.reverse()
    return n === undefined ? array[0] : array.slice(0, n).reverse();
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

  // collection is the array/object
  //this collection.length wont work for objects...so i need to do if statement and check if Array.isArray(collection)


  if (Array.isArray(collection) || (typeof collection == "string")) {for (var i = 0; i<collection.length; i++){

    iterator(collection[i],i,collection)

    }
  }
  else{

    var key = Object.keys(collection)
    for (var j =0; j<key.length; j++){
      iterator(collection[key[j]],key[j],collection)} //
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {

    var result = [];
    _.each(collection,function (item){
      if(test(item) === true){
        result.push(item)
      }
    })

    return result

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    //_.filter(collection, !test) WHY doesn't this work?...I am basically filtering all of the fails
var result = [];
    _.each(collection,function (item){
      if(test(item) !== true){
        result.push(item)
      }
    })

    return result

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {

  var  obj = {}; // this set of code goes through and creates and object with all of the stuff from the array
  var compare = function(val){
      if (obj[val] === undefined){
        obj[val] = 1
      }
      else {obj[val] += 1}
    }

//if given isSorted is true and iterator is defined the use it otherwise just find unique like normal
if (iterator !== undefined && isSorted == true){
  var empty = [];
  for (var  i =0; i<array.length; i++){
    empty.push(iterator(array[i]))
  }

  var finalRes = [array[0]]; //first term will always be in there, cus result have to be [true,false] or [false, true]

  _.each(empty, compare); // wil create an object with false and true

  //find the second item in object whether true or false and do indexof that item to see where it occurs in the array
  //then push the index of array into final res

  // need to convert Object.keys(obj)[1] which is "false" to false
  var targ = true
  if (Object.keys(obj)[1] === "false"){
    targ = false
  }

  var index = _.indexOf(empty,targ)

  finalRes.push(array[index])

  return finalRes;
}
else{
  //go through and store object values of each

  _.each(array, compare) //compare makes the object with note of each item

  var result = Object.keys(obj)
  var finalRes = [];

  for (var i = 0; i<result.length; i++){
    finalRes.push(Number(result[i]))
  }
  return finalRes
}



};


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    for (var j =0; j<collection.length; j++){
      result.push(iterator(collection[j]))
    }

    return result;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    if(accumulator === undefined){
      accumulator = collection[0];

      for (var i =1; i<collection.length; i++){
        accumulator = iterator(accumulator,collection[i]) //takes the total/accumlator from last time and a pass in

    }


    }
    else{ for (var i =0; i<collection.length; i++){
        accumulator = iterator(accumulator,collection[i]) //takes the total/accumlator from last time and a pass in

    }
  }


    return accumulator
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (Array.isArray(collection) || (typeof collection == "string")) {
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);
    }
    else{
      collection = Object.values(collection);
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);
    }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // iterator is identity...and then later isEven etc...

    if(iterator !== undefined){
      collection = _.map(collection,iterator)
    } // if iterator no defined it does apply it



    // TIP: Try re-using reduce() here.
    return _.reduce(collection,function(isTrue,iterator){
      if (!!iterator === true && isTrue === true){ //can't use deeply equal
        return true //basically this logic is that if it is ever false, it will keep looping into the false category
      }
      return false
    },true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
if (collection.length === 0){
  return false;
}

// use map to create inverted of collection...consider applying iterator function first
//want to apply the interator inside of map so i dont do it calledTwice
//dont include the iterator inside the .every call for the inverter then
if(iterator !== undefined){
  collection = _.map(collection,iterator)
} // if iterator no defined it does apply it

var collectionInverted = _.map(collection, function(item){

 if (!!item === true){
   return false
 }
 else { return true}
})

if (_.every(collection,_.identity) === true){
  return true
}
else if (_.every(collectionInverted,_.identity) === false && _.every(collection,_.identity) === false){
  return true
}
else {return false}
}




  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  _.extend = function(obj) {
var keys = [];
var values = [];
for (var i=1; i<arguments.length; i++){

  keys.push(Object.keys(arguments[i]))
  values.push(Object.values(arguments[i]))
  }
  keys =  keys.flat()
  values = values.flat()

  for (var j = 0; j<keys.length; j++){

        obj[keys[j]] = values[j]

  }
  return obj
};

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var keys = [];
    var values = [];
    for (var i=1; i<arguments.length; i++){

      keys.push(Object.keys(arguments[i]))
      values.push(Object.values(arguments[i]))
      }
      keys =  keys.flat()
      values = values.flat()

      for (var j = 0; j<keys.length; j++){
          if (obj[keys[j]] === undefined){
            obj[keys[j]] = values[j]
          }
      }
      return obj
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result;
    //cant just flag the same way becasue i need it to run if the inputs are diff
    //need to cross the inputs with arguments list
    var alreadyCalled = false;
    var argumentsList = [];

    //if the cross ref function is outside the return statement then it
    //runs its course before entering return ever which doesn't help us
    //becasue there is no arguments list at this point


    return function(){
      //cross ref the args list with the list of inputs?
      (function(){
        //when the argument enter here it loses input from above function
        //so it is comparing argslist to nothing
        for (var i =0; i <argumentsList.length; i++){
          for(var j=0; j<argumentsList[i].length;j++){
          //assume its a matching, so cross each thing in array
            if(JSON.stringify(arguments[j]) !== JSON.stringify(argumentsList[i][j])){
              return alreadyCalled = false
              }
            }
          return alreadyCalled = true
        }
      })(arguments) //self initiating function. had to create function so return statemetns
      //dont stop the rest of the func early
      // need to check if arrays match, then run below code on if statement


      if(!alreadyCalled){
        result = func.apply(this,arguments)
        var emptyArr = [];
        emptyArr.push(arguments)
        argumentsList.push(emptyArr) // needs to be pushed in as pairs
      }

      return result //if it has been called before, it skips here, then
      //this needs to retrieve from the object bank...where arrays and their
      //results are kept?? somehow it worked without it...but how does it know
      //what result i am referring to..?
    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // needs to run settimeout first
    //how can i pass in the arguments from the top function to this?
    //var args = Array.prototype.slice.call(arguments, 2) // converts then slices arguements into an array
    var args = [];
    args.push(arguments[2])
    args.push(arguments[3])
    setTimeout(function(){
        func.apply(this,args) //basically we use a function from a different objects
        //and apply it to this object/function and use these input args
        //since we are using apply instead of call, the arguments have to be
        //grouped into an array.
      }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
      var newArr = array.slice(); //so we don't touch orignal arr
      var result = []; //push randomized stuff into this

      //create a cache, while this doesnt equal length of the array, keep running
      //add a new number to the cache everytime the index is used

      var cache = {}; //going to use objects so i can just check if things exists
      //dont need to iterate thru

      var arrIsComplete = false;

      var check = function(prop){
        if (_.indexOf(prop, ) === -1 && prop.length === newArr.length){
          return arrIsComplete = true
        }
      }


      var counter = 0; // initialized, this will be used to add stuff from newArr to result

  //this whil statement wont work becaus it counts length of arr even if its emptyArr
  //so i need a funciton to check if the length is right and no empty cells

      while (arrIsComplete === false){
        //generate random index
      var rando = Math.floor(Math.random()*newArr.length)

        if (cache[rando] === undefined){ //if it hasn't been used before
        cache[rando] = 1 //the value does not matter

        //so rando is the random index
        result[rando] = newArr[counter]
        counter ++

      }

      var keys = Object.keys(cache)

      check(keys)

    }

  return result

    };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
