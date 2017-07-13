/**
 * example:
 * <td class=""></td>
 */

export default {
  methods: {
    statusColor(status) {
      if (status.indexOf('成功') > -1 || status.indexOf('完成') > -1) {
        return 'primary';
      }
      if (status.indexOf('充值中') > -1) {
        return 'success';
      }
      if (status.indexOf('失败') > -1) {
        return 'danger';
      }
      return '';
    },
  },
};
