import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleBody() {
      this.set('processRecaptcha', true);
    },
    onCaptchaResolved(reCaptchaResponse) {
      Ember.Logger.info('reCaptcha response:\n'+reCaptchaResponse);
    }
  }
});
