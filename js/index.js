/**
 * Created by Administrator on 2014/7/11.
 */
$(function () {
  var todos = new Todos()
    , add = new TodoAdd({
      el: 'form',
      collection: todos
    })
    , list = new TodoList({
      el: 'ul',
      collection: todos
    });
});