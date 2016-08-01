todo
  h3 { opts.title }
  
  ul
    li(each='{ items }')
      label(class='{ completed: done }')
        input(type='checkbox' checked='{ done }' onclick='{ parent.toggle }')
        span { title }
        
  form(onsubmit='{ add }')
    input(name='input' onkeyup='{ edit }')
    button(type="submit" disabled='{ !text }') Add #{ (items || []).length + 1 }
    
  button(disabled='{ !items || !items.length }' onclick='{ remove }') Remove
        
  script.
    import riot from 'riot';
    this.disabled = true
    this.items = []
    
    this.on('mount', () => {
      RiotControl.trigger('item_init');
    })
    
    RiotControl.on('items_changed', (items) => {
      this.items = items;
      this.update();
    })
    
    edit(e) {
      self.text = e.target.value;
    }
    
    add(e) {
      debugger;
      if (this.text) {
        RiotControl.trigger('item_add', { title: this.text });
        this.text = this.input.value = '';
      }
    }
    
    toggle(e) {
      var item = e.item;
      item.done = !item.done;
      return true;
    }
    
    remove(e) {
      RiotControl.trigger('item_remove');
    }