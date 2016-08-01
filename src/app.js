import riot from 'riot';
import Broker from './components/broker';
import AppStore from './stores/app.store';
import RiotControl from 'riotcontrol';
import './components/welcome';
import './components/todo';

let store = new AppStore();
RiotControl.addStore(store);

/*
console.log(AppStore);

let store = new AppStore();
console.log(store);

RiotControl.addStore(store);

RiotControl.on('said_hello', () => console.log('Caught event'));

RiotControl.on('route_1', () => console.log('Route 1'));
RiotControl.on('route_2', () => console.log('Route 2'));

window.RC = RiotControl;

let broker = new Broker('admin', 'password');
broker.on('connected', () => {
  console.log('Connected')
  
  broker.subscribe('/topic/test', function() { console.log('TOPIC', arguments); });
});
broker.connect();

window.q = broker;
*/


riot.mount('welcome', { title: 'Hello Riot!' });
riot.mount('rg-alerts', {
  alerts: [
    { type: 'primary', text: 'Lorem ipsum dolor sit amet ... ' }
  ]
});

let routeHandler = (a,b,c,d,e) => console.log('ROUTE', a,b,c,d,e);
riot.route(routeHandler);
riot.route.exec(routeHandler);
riot.route.start();