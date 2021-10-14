import {addClass} from "./utils/dom";

let themes = {
  data() {
    return {
    }
  },

  created() {
    this.setMyTheme();
  },
  methods: {
    setMyTheme() {
      addClass(document.body, `theme-hjb-black`);
    }
  }
}

export default themes;
