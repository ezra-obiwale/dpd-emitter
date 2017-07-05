# dpd-emitter
Emit events for collection CRUD operations on Deployd

## Installation

```bash
npm install dpd-emitter --save
```

## Events
Events `created`, `updated` and `deleted` are emitted when models are created,
updated and deleted respectively.

## Event Data
The model object operated on is always sent along with the events.

## Usage

```javascript
var socket = io('http://localhost:2403'); // Change the url as seen fit

// watch new models
socket.on('<resourcename>:created', function(model) {
    // do something with model
});

// watch all updated models
socket.on('<resourcename>:updated', function(model) {
    // do something with model
});

// watch updates on a particular model
socket.on('<resourcename>:updated:<id>', function(model) {
    // do something with model
});

// watch all deleted models
socket.on('<resourcename>:deleted', function(model) {
    // do something with model
});

// watch when a particular model is deleted
socket.on('<resourcename>:deleted:<id>', function(model) {
    // do something with model
});
```