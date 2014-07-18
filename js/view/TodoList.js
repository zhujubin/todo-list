/**
 * Created by Administrator on 2014/7/11.
 */
var TodoList = Backbone.View.extend({
  events: {
    'blur .editor': 'editor_blurHandler',
    'change input': 'input_changeHandler',
    'click .delete-button': 'deleteButton_clickHandler',
    'dblclick span': 'span_dblclickHandler',
    'keydown .editor': 'editor_keydownHandler'
  },
  initialize: function () {
    this.template = Handlebars.compile(this.$('script').remove().html());
    this.collection.on('add', this.collection_addHandler, this);
    this.collection.on('change', this.collection_changeHandler, this);
    this.collection.on('remove', this.collection_removeHandler, this);
    this.render();
  },
  render: function () {
    this.$el.html(this.template({list: this.collection.toJSON()}));
    var collection = this.collection;
    this.$('li').each(function (i) {
      var model = collection.at(i);
      $(this).attr('id', model.cid);
    });
  },
  save: function (input) {
    var cid = $(input).closest('li').attr('id');
    $(input).replaceWith('<span>');
    this.collection.get(cid).set('title', input.value);
  },
  collection_addHandler: function (model) {
    var template = $(this.template({list: [model.toJSON()]}));
    template.attr('id', model.cid);

    this.$el.append(template);
  },
  collection_changeHandler: function (model) {
    var changed = model.changed;
    if ('title' in changed) {
      this.$('#' + model.cid).find('span').text(changed.title);
    }
    if ('status' in changed) {
      var li = $('#' + model.cid);
      li.toggleClass('completed', model.get('status'));
    }
  },
  collection_removeHandler: function (model) {
    $('#' + model.cid).fadeOut(function () {
      $(this).remove();
    });
  },
  deleteButton_clickHandler: function (event) {
    var cid = $(event.currentTarget).closest('li').attr('id');
    this.collection.remove(cid);
  },
  editor_blurHandler: function (event) {
    if (event.target.value !== '') {
      this.save(event.target);
    }
  },
  editor_keydownHandler: function (event) {
    if (event.target.value !== '' && event.keyCode === 13) {
      this.save(event.target);
    }
  },
  input_changeHandler: function (event) {
    var target = $(event.target)
      , cid = target.closest('li').attr('id')
      , model = this.collection.get(cid);
    model.set('status', target.prop("checked"));
  },
  span_dblclickHandler: function (event) {
    var span = $(event.target)
      , cid = span.closest('li').attr('id');
    var input = $('<input>')
      .addClass('editor')
      .prop('autofocus', true)
      .val(this.collection.get(cid).get('title'));
    span.replaceWith(input);
  }
});