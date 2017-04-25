import Ember from 'ember';

const {
  // warn: emberWarn,
  deprecate: emberDeprecate,
  Logger
} = Ember;

export function instrument(cb) {
  cb();
}

export function debug() {
  Logger.info(...arguments);
}

export function debugOnError(msg, conditional) {
  if (!conditional) {
    Logger.info('Vertical Collection - ERROR:', msg); // eslint-disable-line no-console
    // debugger; // eslint-disable-line no-debugger
  }
}

export function assert(msg, conditional) {
  if (!conditional) {
    Logger.info('Vertical Collection - BAD ASSERT:', msg); // eslint-disable-line no-console
  }
}

export function warn() {
  Logger.info(...arguments);
}

export function deprecate() {
  emberDeprecate(...arguments);
}

export function stripInProduction(cb) {
  cb();
}
