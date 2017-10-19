import ENV from '../config/environment';
import Configuration from 'bg-g-recaptcha/configuration';

export default {

  name: 'bg-g-recaptcha',

  initialize: function() {
    const config = ENV.gReCaptcha || {};
    Configuration.setProperties(config);
  }

}
