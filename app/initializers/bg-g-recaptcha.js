import ENV from '../config/environment';
import Configuration from 'bg-g-recaptcha/configuration';

export default {

  name: 'bg-g-recaptcha',

  initialize: function(registry) {
    const config = ENV.gReCaptcha || {};
    Configuration.setProperties(config);
  }

}
