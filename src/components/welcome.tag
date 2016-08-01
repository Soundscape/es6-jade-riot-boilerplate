welcome
  h3 { opts.title }
  p { subtitle }
  ul
    li(each='{ list }') { name }
    
  todo(title="My item")

  script.
    import riot from 'riot';
    import todo from './todo';
    
    this.subtitle = 'Easy, right?';
    this.list = [
      { name: 'My' },
      { name: 'Little' },
      { name: 'List' }
    ];