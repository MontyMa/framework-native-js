/**
 * example:
 * <v-tip-new :tipnewactive="wocActive" :tipnewtext="wocText" @close="closeWoc"></v-tip-new>
 */
/* eslint-disable */
import vTipNew from '../v-tip-new.vue';

export default {
  components: {
    vTipNew,
  },
  data() {
    return {
      tipNewActive: false,
      tipNewText: null,
      tipNewType: null,
      tipNewDelay: null,
    };
  },
  methods: {
    showTipNew(text, type, delay) {
      this.tipNewActive = true;
      this.tipNewText = text;
      this.tipNewType = type;
      this.tipNewDelay = delay;
      this.promise = new Promise((resolve) => {
        this.$on('TipOkEvent', () => {
      			this.tipNewActive = false;
      			resolve(true);
      		});
      		this.$on('TipCancelEvent', () => {
      			this.tipNewActive = false;
      			resolve(false);
      		});
      });
      return this.promise;
    },
    onCancel() {
    	  this.$emit('TipCancelEvent')
    },
    onOk() {
    		this.$emit('TipOkEvent')
    }
  },
};
/* eslint-enable */
