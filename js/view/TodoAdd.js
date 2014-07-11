/**
 * Created by Administrator on 2014/7/11.
 */
var TodoAdd = Backbone.View.extend({
  events: {
    'keydown': 'input_keyDownHandler',
    'submit': 'submitHandler'
  },
  input_keyDownHandler: function (event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.collection.add({
        title: event.target.value
      });
    }
  },
  submitHandler: function (event) {
    event.preventDefault();
  }
});