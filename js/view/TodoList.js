/**
 * Created by Administrator on 2014/7/11.
 */
var TodoList = Backbone.View.extend({
  events: {
    'change input': 'input_changeHandler'
  },
  initialize: function () {
    this.template = Handlebars.compile(this.$('script').html());
    this.collection.on('add', this.collection_addHandler, this);
    this.collection.on('change', this.collection_changeHandler, this);
  },
  collection_addHandler: function (model) {
    var template = $(this.template(model.toJSON()));
    template.attr('id', model.cid);
    this.$el.append(template);
  },
  collection_changeHandler: function (model) {
    var li = $('#' + model.cid);
    li.toggleClass('completed', model.get('status'));
  },
  input_changeHandler: function (event) {
    var target = $(event.target)
      , cid = target.closest('li').attr('id')
      , model = this.collection.get(cid);
    model.set('status', target.prop("checked"));
  }
});