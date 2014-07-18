/**
 * Created by Administrator on 2014/7/16.
 */
var TodoAmount = Backbone.View.extend({
  initialize: function () {
    this.template = Handlebars.compile(this.$('script').remove().html());
    this.collection.on('add change remove', this.collection_changeHandler, this);
    this.render();
  },
  render: function () {
    var total = this.collection.length
      , completed = this.collection.filter(function (model) {
        return model.get('status');
      }).length;
    this.$el.text(this.template({
      total: total,
      completed: completed
    }));
  },
  collection_changeHandler: function () {
    this.render();
  }
});