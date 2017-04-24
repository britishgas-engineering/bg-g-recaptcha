import Ember from 'ember';
import Configuration from '../configuration';

export default Ember.Component.extend({
  classNames: ['g-recaptcha'],

  sitekey: Configuration.siteKey,
  size: Configuration.size,

  tabindex: Ember.computed.alias('tabIndex'),

  renderReCaptcha() {
    if (Ember.isNone(window.grecaptcha)) {
      Ember.run.later(() => {
        this.renderReCaptcha();
      }, 500);
    } else {
      let container = this.$()[0];
      let properties = this.getProperties(
        'sitekey',
        'size'
      );
      let parameters = Ember.merge(properties, {
        callback: this.get('successCallback').bind(this)
      });
      let widgetId = window.grecaptcha.render(container, parameters);
      this.set('widgetId', widgetId);
      this.set('ref', this);
      window.grecaptcha.execute(this.get('widgetId'));
    }
  },

  successCallback(reCaptchaResponse) {
    let action = this.get('onSuccess');
    if (Ember.isPresent(action)) {
      action(reCaptchaResponse);
    }
  },
  didInsertElement() {
    this._super(...arguments);
    Ember.run.next(() => {
      if (this.get('isTestEnvironment')) {
        this.sendAction('onSuccess')
      } else {
        this.renderReCaptcha();
      }
    });
  }

});
