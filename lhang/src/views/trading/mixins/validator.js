import { util } from 'vue';

import vnameMixin from './vname.js';

export default {
  mixins: [vnameMixin],

  partials: {
    errors: `
<div :class="vname + '-errors'" v-if="!valid">
  <p v-if="invalids.required">
    <slot name="required">{{requiredTip}}</slot>
  </p>
  <p v-if="invalids.minlength">
    <slot name="minlength">{{minlengthTip}}</slot>
  </p>
  <p v-if="invalids.maxlength">
    <slot name="maxlength">{{maxlengthTip}}</slot>
  </p>
  <p v-if="invalids.pattern">
    <slot name="pattern">{{patternTip}}</slot>
  </p>
  <p v-if="invalids.validator">
    <slot name="validator">{{validatorTip}}</slot>
  </p>
</div>
    `,
  },
  props: {
    autoValidate: Boolean,
    validateOnInit: Boolean,
    required: Boolean,
    requiredTip: {
      type: String,
      default: '该字段不能为空',
    },
    minlength: Number,
    minlengthTip: {
      type: String,
      default: '该字段长度过短',
    },
    maxlength: Number,
    maxlengthTip: {
      type: String,
      default: '该字段长度过长',
    },
    pattern: String,
    patternTip: {
      type: String,
      default: '该字段不合法',
    },
    validator: Function,
    validatorTip: {
      type: String,
      default: '该字段有误',
    },
  },
  data() {
    return {
      valid: true,
      invalids: {
        required: false,
        minlength: false,
        maxlength: false,
        pattern: false,
        validator: false,
      },
    };
  },
  computed: {
    // 获取需要验证的值，默认获取 value 值
    modelValue() {
      return this.value;
    },
  },
  ready() {
    if (this.validateOnInit) {
      this.validate();
    }

    if (this.autoValidate) {
      this.$watch('modelValue', util.debounce(() => this.validate(), 300));
    }
  },
  methods: {
    resetValid() {
      this.valid = true;
      this.invalids.required = false;
      this.invalids.minlength = false;
      this.invalids.maxlength = false;
      this.invalids.pattern = false;
      this.invalids.validator = false;
    },
    validate() {
      this.resetValid();
      this.validateRequired();
      this.validateMinlength();
      this.validateMaxlength();
      this.validatePattern();
      this.validateValidator();
    },
    validateRequired() {
      if (!this.valid) {
        return;
      }

      if (this.required && !this.modelValue) {
        this.invalids.required = true;
        this.valid = false;
      } else {
        this.invalids.required = false;
      }
    },
    validateMinlength() {
      if (!this.valid) {
        return;
      }

      if (this.minlength > 0 && this.modelValue.length < this.minlength) {
        this.invalids.minlength = true;
        this.valid = false;
      } else {
        this.invalids.minlength = false;
      }
    },
    validateMaxlength() {
      if (!this.valid) {
        return;
      }

      if (this.maxlength > 0 && this.modelValue.length > this.maxlength) {
        this.invalids.maxlength = true;
        this.valid = false;
      } else {
        this.invalids.maxlength = false;
      }
    },
    validatePattern() {
      if (!this.valid) {
        return;
      }

      if (this.pattern && !(new RegExp(this.pattern).test(this.modelValue))) {
        this.invalids.pattern = true;
        this.valid = false;
      } else {
        this.invalids.pattern = false;
      }
    },
    validateValidator() {
      if (!this.valid) {
        return;
      }

      if (this.validator && !this.validator(this.modelValue)) {
        this.invalids.validator = true;
        this.valid = false;
      } else {
        this.invalids.validator = false;
      }
    },
  },
};
