import Ember from 'ember';
import Token from './token';

const {
  run
} = Ember;

function job(cb, token) {
  return function execJob() {
    if (token.cancelled === false) {
      cb();
    }
  };
}

export class Scheduler {
  constructor() {
    this.sync = [];
    this.layout = [];
    this.measure = [];
    this.affect = [];
    this._nextFlush = null;
    this.ticks = 0;
  }

  schedule(queueName, cb, parent) {
    let token = new Token(parent);

    this[queueName].push(job(cb, token));
    this._flush();

    return token;
  }

  forget(token) {
    if (token) {
      token.cancel();
    }
  }

  _flush() {
    if (this._nextFlush !== null) {
      return;
    }

    this._nextFlush = requestAnimationFrame(() => {
      this._nextFlush = null;
      this.flush();
    });
  }

  flush() {
    return this._flushOnce();
  }

  _flushOnce() {
    let i, q;

    run.begin();
    if (this.sync.length) {
      q = this.sync;
      this.sync = [];

      for (i = 0; i < q.length; i++) {
        q[i]();
      }
    }
    // run.end();

    // not having a run loop here makes the list feel a bit jumpy as it re-measures
    // run.begin();
    if (this.layout.length) {
      q = this.layout;
      this.layout = [];

      for (i = 0; i < q.length; i++) {
        q[i]();
      }
    }
    // run.end();

    // run.begin();
    if (this.measure.length) {
      q = this.measure;
      this.measure = [];

      for (i = 0; i < q.length; i++) {
        q[i]();
      }
    }
    // run.end();

    // run.begin();
    if (this.affect.length) {
      q = this.affect;
      this.affect = [];

      for (i = 0; i < q.length; i++) {
        q[i]();
      }
    }
    run.end();
  }
}

export default new Scheduler();
