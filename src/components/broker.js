import core from 'sublime-core';
import Stomp from 'stomp-websocket';

let states = {
  disconnected: {
    connect: function(inst) {
      let uri = `ws://${inst.server}:${inst.port}/ws`;
      let ws = new WebSocket(uri);
      inst.client = Stomp.over(ws);

      let onConnected = () => console.log('connected');
      let onError = () => console.log('error');

      inst.client.connect(inst.username, inst.password,
                          () => this.setMachineState(this.connected),
                          (error) => console.error(error),
                          inst.vhost);
    }
  },
  
  connected: {
    disconnect: function(inst) {
      this.setMachineState(this.disconnected);
    },
    
    subscribe: function(inst, ch, fn) {
      inst.channels[ch] = inst.channels[ch] || [];
      let sb = { subscription: inst.client.subscribe(ch, fn), fn: fn };
      inst.channels[ch].push(sb);
    },
    
    unsubscribe: function(inst, ch, fn) {
      if (!inst.channels[ch]) return;

      inst.channels[ch] = inst.channels[ch].filter((sb) => {
        if (sb.fn === fn)
          sb.subscription.unsubscribe();

        return sb.fn !== fn;
      });

      if (inst.channels[ch].length === 0) inst.channels[ch] = null;
    },
    
    publish: function(inst, ch, payload) {
      if (typeof payload === 'object') payload = JSON.stringify(payload);
      inst.client.send(ch, {}, payload);
    }
  }
}

export default class extends core.Stateful {
  constructor(username, password, server = '127.0.0.1', port = 15674, vhost = '/') {
    if (!username) throw new Error('Username must be supplied');
    if (!password) throw new Error('Password must be supplied');
    
    super(states);
    
    this.username = username;
    this.password = password;
    this.server = server;
    this.port = port;
    this.vhost = vhost;
    this.channels = {};
  }
  
  connect() {
    return this.apply('connect', this);
  }
  
  disconnect() {
    return this.apply('disconnect', this);
  }
  
  subscribe(channel, fn) {
    if (!channel) throw new Error('Channel must be supplied');
    if (typeof channel !== 'string') throw new Error('Channel must be a string');
    
    if (!fn) throw new Error('Function must be supplied');
    if (typeof fn !== 'function') throw new Error('Function must be a function');
    
    return this.apply('subscribe', this, channel, fn);
  }
  
  unsubscribe(channel, fn) {
    if (!channel) throw new Error('Channel must be supplied');
    if (typeof channel !== 'string') throw new Error('Channel must be a string');
    
    if (!fn) throw new Error('Function must be supplied');
    if (typeof fn !== 'function') throw new Error('Function must be a function');
    
    return this.apply('unsubscribe', this, channel, fn);
  }
  
  publish(channel, payload) {
    if (!channel) throw new Error('Channel must be supplied');
    if (typeof channel !== 'string') throw new Error('Channel must be a string');
    
    if (!payload) throw new Error('Payload must be supplied');
    if (typeof payload !== 'object') throw new Error('Payload must be an object');
    
    return this.apply('publish', this, channel, payload);
  }
}