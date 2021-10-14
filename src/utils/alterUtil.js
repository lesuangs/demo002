import {Toast, Dialog} from 'vant';
import i18n from '../i18n/index';

export default {
  toast: function (o) {
    let opts = {
      title: o.title || i18n.t("dialog.title[0]"),
      content: o.content || '',
      icon: this.getIcon(o.icon),
      confirmButtonText: o.confirmButtonText || i18n.t("dialog.btn[0]"),
    }

  }
}
