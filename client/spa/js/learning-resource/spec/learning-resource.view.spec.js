/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var View = require('../learning-resource.view.js');
var matchers = require('jasmine-jquery-matchers');
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test learning-resource.view');
describe('Learning resource view ', function(){

  var model;
  var view;

  beforeEach(function(){
    // Add some convenience tests for working with the DOM
    // Helper for toHaveClass
    jasmine.addMatchers(matchers);

    var Model = Backbone.Model.extend({});
    // Needs to have the fields required by the template
    model = new Model({
      title: 'Contact <3',
      resourceType: 'web',
      description: 'me'
    });

    view = new View({
      model: model
    });
  });

  describe('when the view is instantiated ', function(){

    it('creates the correct element', function(){
      // Element has to be uppercase
      expect(view.el.nodeName).toEqual('DIV');
    });

    it('sets the correct class', function(){
      expect(view.$el).toHaveClass('learn');
    });
  });

  describe('when the view is rendered ', function(){

    it('returns the view object ', function(){
      expect(view.render()).toEqual(view);
    });

    it('produces the correct HTML ', function(){
      view.render();
      expect(view.$('h1').html()).toEqual('Contact &lt;3');
    });

  });

  xdescribe('when the user clicks on the Save button ', function(){

    xit('updates the model', function(){
    });
  });

  xdescribe('when the user clicks on ... ', function(){

    xit('triggers the ... event', function(){
    });
  });

  describe('when the user clicks on the Delete button ', function(){

    beforeEach(function(){
      // Must call through otherwise the actual view function won't be called
      spyOn(view, 'destroy').and.callThrough();
      // Must delegateEvents for the spy on a DOM event to work
      view.delegateEvents(); //allow bubbling

      spyOn(model, 'destroy');
    });

    it('deletes the model', function(){
      // Must render for the event to be fired
      view.render();
      view.$('.delete').trigger('click');

      expect(view.destroy).toHaveBeenCalled();
      expect(model.destroy).toHaveBeenCalled();
    });
  });

});
