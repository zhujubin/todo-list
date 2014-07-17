/**
 * Created by Administrator on 2014/7/11.
 */
var Todos = Backbone.Collection.extend({
  KEY: 'todo',
  initialize: function () {
    var store = localStorage.getItem(this.KEY);
    if (store) {
      this.set(JSON.parse(store));
    }
    this.on('add remove change', this.changeHandler, this);
  },
  changeHandler: function () {
    var data = JSON.stringify(this.toJSON());
    localStorage.setItem(this.KEY, data);
  }
});