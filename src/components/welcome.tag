welcome
  h3 { opts.title }
  p { subtitle }
  ul
    li(each='{ list }') { name }

  script.
    this.subtitle = 'Easy, right?';
    this.list = [
      { name: 'My' },
      { name: 'Little' },
      { name: 'List' }
    ];