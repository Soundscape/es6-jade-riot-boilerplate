import riot from 'riot';

export default class {
  constructor() {
    riot.observable(this);
    
    this.items = [];
    
    this.on('item_add', (item) => {
      this.items.push(item);
      this.trigger('items_changed', this.items);
    });
    
    this.on('item_remove', () => {
      this.items.pop();
      this.trigger('items_changed', this.items);
    });
    
    this.on('item_init', () => this.trigger('items_changed', this.items));
  }
}