/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../fluentform/resources/assets/public/formatPrice.js":
/*!************************************************************!*\
  !*** ../fluentform/resources/assets/public/formatPrice.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Total amount is in cents
function formatMoney(n, decimals, decimal_sep, thousands_sep) {
  var c = isNaN(decimals) ? 2 : Math.abs(decimals),
    //if decimal is zero we must take it, it means user does not want to show any decimal
    d = decimal_sep || '.',
    //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
    /*
    according to [https://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
    the fastest way to check for not defined parameter is to use typeof value === 'undefined'
    rather than doing value === undefined.
    */
    t = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

    sign = n < 0 ? '-' : '',
    //extracting the absolute value of the integer part of the number and converting to string
    i = parseInt(n = Math.abs(n).toFixed(c)) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}
function formatPrice(allTotalAmount, currency_settings) {
  if (!allTotalAmount) {
    allTotalAmount = 0;
  }
  var amount = parseInt(allTotalAmount) / 100;
  var precision = 2;
  if (allTotalAmount % 100 == 0 && currency_settings.decimal_points == 0) {
    precision = 0;
  }
  var thousandSeparator = ',';
  var decimalSeparator = '.';
  if (currency_settings.currency_separator != 'dot_comma') {
    thousandSeparator = '.';
    decimalSeparator = ',';
  }
  var symbol = currency_settings.currency_sign || '';
  var money = formatMoney(amount, precision, decimalSeparator, thousandSeparator);
  if (currency_settings.currency_sign_position == 'right') {
    return money + '' + symbol;
  } else if (currency_settings.currency_sign_position == 'left_space') {
    return symbol + ' ' + money;
  } else if (currency_settings.currency_sign_position == 'right_space') {
    return money + ' ' + symbol;
  }
  return symbol + '' + money;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatPrice);

/***/ }),

/***/ "../fluentform/resources/assets/public/payment_handler.js":
/*!****************************************************************!*\
  !*** ../fluentform/resources/assets/public/payment_handler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Payment_handler: () => (/* binding */ Payment_handler)
/* harmony export */ });
/* harmony import */ var _formatPrice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatPrice */ "../fluentform/resources/assets/public/formatPrice.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Payment_handler = /*#__PURE__*/function () {
  function Payment_handler($form, instance) {
    _classCallCheck(this, Payment_handler);
    var formId = instance.settings.id;
    this.$form = $form;
    this.formInstance = instance;
    this.formId = formId;
    this.paymentMethod = '';
    this.paymentConfig = window.fluentform_payment_config;
    this.appliedCoupons = {};
    this.totalAmount = 0;
    this.formPaymentConfig = window['fluentform_payment_config_' + formId];
  }
  _createClass(Payment_handler, [{
    key: "init",
    value: function init() {
      this.boot();
      this.initStripeElement();
    }
  }, {
    key: "$t",
    value: function $t(stringKey) {
      if (this.paymentConfig.i18n[stringKey]) {
        return this.paymentConfig.i18n[stringKey];
      }
      return stringKey;
    }
  }, {
    key: "boot",
    value: function boot() {
      var _this = this;
      this.initPaymentMethodChange();
      this.$form.on('fluentform_next_action_payment', function (event, data) {
        var response = data.response.data;
        if (response.actionName) {
          jQuery('<div/>', {
            'id': 'form_success',
            'class': 'ff-message-success'
          }).html(response.message).insertAfter(_this.$form);
          _this[response.actionName](response);
        }
      });
      jQuery('.ff_modal_btn').on('click', function () {
        _this.calculatePayments();
      });
      this.calculatePayments();
      this.$form.find('.ff_payment_item,.ff_quantity_item').on('change', function (event) {
        if (event.target.min && +event.target.value < +event.target.min) {
          event.target.value = event.target.min;
        }
        if (event.target.max && +event.target.value > +event.target.max) {
          event.target.value = event.target.max;
        }
        _this.calculatePayments();
        _this.mayBeToggleSubscriptionRelatedThings(event);
      });
      this.$form.on('change', '.ff-custom-user-input', function (event) {
        _this.handleCustomUserInputChange(event);
      });
      this.$form.on('do_calculation', function () {
        _this.calculatePayments();
      });
      this.initDiscountCode();
    }

    // Payment Calculations
  }, {
    key: "calculatePayments",
    value: function calculatePayments() {
      var _this2 = this;
      var form = this.$form;
      var items = this.getPaymentItems();
      var totalAmount = 0;
      jQuery.each(items, function (name, item) {
        totalAmount += item.line_total;
      });
      this.totalAmount = totalAmount;
      var discounts = this.getDiscounts();
      jQuery.each(discounts, function (index, discount) {
        var discountAmount = discount.amount;
        if (discount.coupon_type === 'percent') {
          discountAmount = discount.amount / 100 * totalAmount;
        }
        _this2.totalAmount -= discountAmount;
      });
      form.trigger('payment_amount_change', {
        amount: totalAmount,
        items: items,
        discounts: discounts,
        payment_handler: this
      });
      form.find('.ff_order_total').html(this.getFormattedPrice(this.totalAmount));
      form.data('payment_total', this.totalAmount);
      var hidePaymentSummary = !Object.keys(items).length;
      this.hasPaymentItems = hidePaymentSummary;
      var method = hidePaymentSummary ? 'hide' : 'show';
      var paymentMethods = this.$form.find('.ff_payment_method');

      // if (hidePaymentSummary) {
      //     paymentMethods.map((i, e) => e.checked = false);
      // } else {
      //     paymentMethods.map((i, e) => {
      //         if (e.value == this.paymentMethod) {
      //             e.checked = true;
      //         }
      //     });
      // }

      // skip element if hidden by conditional logic
      paymentMethods.closest('.ff-el-group:not(.ff_excluded)')[method]();
      if (form.find('.ff_dynamic_payment_summary').length) {
        this.generateSummaryTable(items, totalAmount, discounts, hidePaymentSummary);
      }
    }
  }, {
    key: "generateSummaryTable",
    value: function generateSummaryTable(items, totalAmount, discounts) {
      var _this3 = this;
      var hide = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.$form.find('.ff_dynamic_payment_summary .ff_payment_summary_fallback').hide();
      if (hide) {
        this.$form.find('.ff_dynamic_payment_summary .ff_payment_summary').html('');
        this.$form.find('.ff_dynamic_payment_summary .ff_payment_summary_fallback').show();
        return;
      }
      var html = '<table class="table ffp_table input_items_table">';
      html += "<thead><tr><th>".concat(this.$t("item"), "</th><th>").concat(this.$t("price"), "</th><th>").concat(this.$t("qty"), "</th><th>").concat(this.$t("line_total"), "</th></tr></thead>");
      html += '<tbody>';
      jQuery.each(items, function (index, item) {
        if (item.price === 0 || item.price) {
          html += '<tr>';
          html += "<td>".concat(item.label, "</td>");
          html += "<td>".concat(_this3.getFormattedPrice(item.price), "</td>");
          html += "<td>".concat(item.quantity, "</td>");
          html += "<td>".concat(_this3.getFormattedPrice(item.line_total), "</td>");
          html += '</tr>';
        }
      });
      html += '</tbody>';
      var footerRows = '';
      if (discounts.length) {
        footerRows += "<tr><th class=\"item_right\" colspan=\"3\">".concat(this.$t("Sub Total"), "</th><th>").concat(this.getFormattedPrice(totalAmount), "</th></tr>");
        jQuery.each(discounts, function (index, discount) {
          var discountAmount = discount.amount;
          if (discount.coupon_type === 'percent') {
            discountAmount = discount.amount / 100 * totalAmount;
          }
          if (discountAmount >= totalAmount) {
            discountAmount = totalAmount;
          }
          footerRows += "<tr><th class=\"item_right\" colspan=\"3\">".concat(_this3.$t('discount:'), " ").concat(discount.title, "</th><th>-").concat(_this3.getFormattedPrice(discountAmount), "</th></tr>");
          totalAmount -= discountAmount;
        });
      }
      footerRows += "<tr><th class=\"item_right\" colspan=\"3\">".concat(this.$t("total"), "</th><th>").concat(this.getFormattedPrice(totalAmount), "</th></tr>");
      html += "<tfoot>".concat(footerRows, "</tfoot>");
      html += '</table>';
      this.$form.find('.ff_dynamic_payment_summary .ff_payment_summary').html(html);
    }
  }, {
    key: "getPaymentItems",
    value: function getPaymentItems() {
      var form = this.$form;
      var elements = form.find('.ff-el-group:not(.ff_excluded)').find('.ff_payment_item');
      var itemTotalValue = {};
      var that = this;
      function pushItem(name, label, value) {
        name = name.replace('[', '').replace(']', '');
        var quantity = that.getQuantity(name);
        if (!quantity) {
          return;
        }
        itemTotalValue[name] = {
          label: label,
          price: value,
          quantity: quantity,
          line_total: quantity * value
        };
      }
      elements.each(function (index, elem) {
        var elementType = elem.type;
        var $elem = jQuery(elem);
        if ($elem.closest('.has-conditions.ff_excluded').length) {
          return;
        }
        var elementName = $elem.attr('name');
        var label = $elem.data('payment_label');
        if (!label) {
          label = $elem.closest('.ff-el-group').find('.ff-el-input--label label').text();
        }
        if (elementType === 'radio') {
          var $element = form.find('input[name=' + elementName + ']:checked');
          var planTitle = $element.val();
          that.maybeAddInventoryStockOutFailedValidation($elem, $element.data('quantity_remaining'), !$element.length);
          that.maybeHandleSubscriptionItem(elementName, $element, label, planTitle, pushItem);
        } else if (elementType === 'hidden') {
          that.maybeAddInventoryStockOutFailedValidation($elem, $elem.data('quantity_remaining'), true);
          that.maybeHandleSubscriptionItem(elementName, $elem, label, '', pushItem);
        } else if (elementType == 'number' || elementType == 'text') {
          var itemValue = window.ff_helper.numericVal(jQuery(this));
          if (itemValue != 0) {
            pushItem(elementName, label, parseFloat(itemValue));
          }
        } else if (elementType == 'checkbox') {
          var groupId = $elem.data('group_id');
          var groups = form.find('input[data-group_id="' + groupId + '"]:checked');
          var groupTotal = 0;
          var childLabels = [];
          var minimum_remaining_qty;
          groups.each(function (index, group) {
            var itemPrice = jQuery(group).data('payment_value');
            var current_remaining_qty = jQuery(group).data('quantity_remaining');
            if (current_remaining_qty !== undefined) {
              if (minimum_remaining_qty === undefined) {
                minimum_remaining_qty = current_remaining_qty;
              } else {
                minimum_remaining_qty = minimum_remaining_qty > current_remaining_qty ? current_remaining_qty : minimum_remaining_qty;
              }
            }
            if (itemPrice) {
              groupTotal += parseFloat(itemPrice);
              childLabels.push(jQuery(group).val());
            }
          });
          if (childLabels.length) {
            label += ' <ul class="ff_sub_items">';
            childLabels.forEach(function (subLabel) {
              label += '<li>' + subLabel + '</li>';
            });
            label += ' </ul>';
          }
          if (groupTotal) {
            pushItem(elementName, label, groupTotal);
          }
          that.maybeAddInventoryStockOutFailedValidation($elem, minimum_remaining_qty, !groupTotal);
        } else if (elementType === 'select-one') {
          var _$element = form.find('select[name=' + elementName + '] option:selected');
          var _planTitle = _$element.val();
          that.maybeAddInventoryStockOutFailedValidation($elem, _$element.data('quantity_remaining'), !_$element.length);
          that.maybeHandleSubscriptionItem(elementName, _$element, label, _planTitle, pushItem);
        }
      });
      return itemTotalValue;
    }
  }, {
    key: "maybeAddInventoryStockOutFailedValidation",
    value: function maybeAddInventoryStockOutFailedValidation($element, remaining_qty, reset) {
      var _this$formInstance3;
      var name = $element.attr('name').replace('[', '').replace(']', '');
      if (reset) {
        var _this$formInstance;
        (_this$formInstance = this.formInstance) === null || _this$formInstance === void 0 || _this$formInstance.removeFieldValidationRule(name, 'force_failed');
        return;
      }
      if (remaining_qty === undefined) return;
      var quantity = this.getQuantity(name);
      if (!quantity) return;
      if (remaining_qty < quantity) {
        var _this$formInstance2;
        (_this$formInstance2 = this.formInstance) === null || _this$formInstance2 === void 0 || _this$formInstance2.addFieldValidationRule(name, 'force_failed', {
          value: true,
          message: 'This Item is Stock Out'
        });
        return;
      }
      (_this$formInstance3 = this.formInstance) === null || _this$formInstance3 === void 0 || _this$formInstance3.removeFieldValidationRule(name, 'force_failed');
      $element.closest('.ff-el-group').removeClass('ff-el-is-error');
      $element.closest('.ff-el-group').find('.error').remove();
    }
  }, {
    key: "maybeHandleSubscriptionItem",
    value: function maybeHandleSubscriptionItem(elementName, $element, label, planTitle, pushItem) {
      var itemValue = parseFloat($element.attr('data-payment_value'));
      var signupFee = parseFloat($element.attr('data-signup_fee'));
      var hasTrialDays = $element.data('trial_days');
      var initialAmount = parseFloat($element.attr('data-initial_amount'));
      if (initialAmount) {
        var signupLabel = this.$t('Signup Fee for') + ' ' + label + (planTitle ? ' - ' + planTitle : '');
        pushItem(elementName + '_signup_fee', signupLabel, initialAmount);
        itemValue = itemValue - initialAmount;
      }
      if (hasTrialDays && itemValue === 0 || itemValue) {
        if (planTitle) {
          label += ' - ' + planTitle;
        }
        if (hasTrialDays) {
          label += ' ' + this.$t('(Trial)');
          itemValue = 0;
        }
        pushItem(elementName, label, parseFloat(itemValue));
        if (signupFee) {
          var _signupLabel = this.$t('Signup Fee for') + ' ' + label;
          pushItem(elementName + '_signup_fee', _signupLabel, signupFee);
        }
      }
    }
  }, {
    key: "getQuantity",
    value: function getQuantity(itemName) {
      var $quantityDom = this.$form.find('input[data-target_product="' + itemName + '"]');
      if (!$quantityDom.length) {
        return 1;
      }
      var $quantityElemWithCondition = $quantityDom.closest('.ff-el-group.has-conditions:not(.ff_excluded)');
      if ($quantityElemWithCondition.length) {
        $quantityDom = $quantityElemWithCondition.find('input[data-target_product="' + itemName + '"]');
      }
      if ($quantityDom.closest('.ff-el-group.has-conditions.ff_excluded').length) {
        $quantityDom.val('');
      }
      var qty = $quantityDom.val();
      if (!qty || isNaN(qty)) {
        return 0;
      }
      return parseInt(qty);
    }
  }, {
    key: "replaceWords",
    value: function replaceWords(sentence, wordsToReplace) {
      return Object.keys(wordsToReplace).reduce(function (f, s, i) {
        return "".concat(f).replace(new RegExp(s, 'ig'), wordsToReplace[s]);
      }, sentence);
    }
  }, {
    key: "getFormattedPrice",
    value: function getFormattedPrice(amount) {
      return (0,_formatPrice__WEBPACK_IMPORTED_MODULE_0__["default"])(parseFloat(amount * 100).toFixed(2), window['fluentform_payment_config_' + this.formId].currency_settings);
    }
  }, {
    key: "stripeRedirectToCheckout",
    value: function stripeRedirectToCheckout(data) {
      var stripe = new Stripe(this.formPaymentConfig.stripe.publishable_key);
      stripe.registerAppInfo(this.formPaymentConfig.stripe_app_info);
      stripe.redirectToCheckout({
        sessionId: data.sessionId
      }).then(function (result) {
        console.log(result);
      });
    }
  }, {
    key: "normalRedirect",
    value: function normalRedirect(data) {
      window.location.href = data.redirect_url;
    }
  }, {
    key: "getDiscounts",
    value: function getDiscounts() {
      return Object.values(this.appliedCoupons);
    }
  }, {
    key: "initDiscountCode",
    value: function initDiscountCode() {
      var _this4 = this;
      var couponCodes = this.$form.find('.ff_coupon_wrapper');
      if (!couponCodes.length) {
        return false;
      }
      this.$form.append('<input type="hidden" class="__ff_all_applied_coupons" name="__ff_all_applied_coupons"/>');
      jQuery.each(couponCodes, function (index, codeWrapper) {
        var $codeWrapper = jQuery(codeWrapper);
        var $btn = $codeWrapper.find('.ff_input-group-append');
        $btn.on('click', function () {
          var $input = $codeWrapper.find('input.ff_coupon_item');
          var code = $input.val();
          if (!code) {
            return '';
          }
          $input.attr('disabled', true);
          var inputName = $input.attr('name');
          jQuery.post(window.fluentFormVars.ajaxUrl, {
            action: 'fluentform_apply_coupon',
            form_id: _this4.formId,
            total_amount: _this4.totalAmount,
            coupon: code,
            other_coupons: _this4.$form.find('.__ff_all_applied_coupons').val()
          }).then(function (response) {
            var coupon = response.coupon;
            if (Object.keys(_this4.appliedCoupons).includes(coupon.code)) {
              return;
            }
            _this4.appliedCoupons[coupon.code] = coupon;
            _this4.$form.find('.__ff_all_applied_coupons').attr('value', JSON.stringify(Object.keys(_this4.appliedCoupons)));
            var couponAmount = coupon.amount + '%';
            if (coupon.coupon_type == 'fixed') {
              couponAmount = _this4.getFormattedPrice(coupon.amount);
            }
            var discountAmount = coupon.amount;
            if (coupon.coupon_type === 'percent') {
              discountAmount = (coupon.amount / 100 * _this4.totalAmount).toFixed(2);
            }
            var remainAmount = _this4.totalAmount - discountAmount;
            var message = coupon.message || "{coupon.code} <span>-{coupon.amount}</span>";
            var wordsToReplace = {
              '{coupon.code}': coupon.code,
              '{coupon.amount}': couponAmount,
              '{total_amount}': _this4.totalAmount,
              '{discount_amount}': discountAmount,
              '{remain_amount}': remainAmount
            };
            var formattedMessage = _this4.replaceWords(message, wordsToReplace);
            _this4.recordCouponMessage($codeWrapper, code, formattedMessage, 'success');
            $input.val('');
          }).fail(function (errors) {
            _this4.recordCouponMessage($codeWrapper, code, errors.responseJSON.message, 'error');
          }).always(function () {
            $input.attr('disabled', false);
            _this4.$form.trigger('do_calculation');
          });
        });
      });
    }
  }, {
    key: "recordCouponMessage",
    value: function recordCouponMessage($wrapper, coupon_code, message, type) {
      var _this5 = this;
      if (!$wrapper.find('.ff_coupon_responses').length) {
        $wrapper.append('<ul class="ff_coupon_responses"></ul>');
      }
      var $responseDiv = $wrapper.find('.ff_coupon_responses');
      $responseDiv.find('.ff_error, .ff_resp_item_' + coupon_code).remove();
      var errorHtml = jQuery('<li/>', {
        'class': "ff_".concat(type, " ff_resp_item_").concat(coupon_code)
      });
      var cross = jQuery('<span/>', {
        "class": 'error-clear',
        html: '&times;',
        click: function click(e) {
          $responseDiv.find('.ff_resp_item_' + coupon_code).remove();
          delete _this5.appliedCoupons[coupon_code];
          _this5.$form.find('.__ff_all_applied_coupons').attr('value', JSON.stringify(Object.keys(_this5.appliedCoupons)));
          _this5.$form.trigger('do_calculation');
        }
      });
      $responseDiv.append(errorHtml.append(cross, message));
    }
  }, {
    key: "mayBeToggleSubscriptionRelatedThings",
    value: function mayBeToggleSubscriptionRelatedThings(event) {
      var element = jQuery(event.target);
      if (element.hasClass('ff_subscription_item')) {
        var value = element.val();
        var parent = element.closest('.ff-el-input--content');
        parent.find('.ff-custom-user-input-wrapper').addClass('hidden_field');
        var $currentItem = parent.find('.ff-custom-user-input-wrapper-' + value);
        $currentItem.removeClass('hidden_field');
        var min = $currentItem.find('input').data('min') || 0;
        $currentItem.find('input').attr('min', min);
        parent.find('.ff_summary_container').addClass('hidden_field');
        parent.find('.ff_summary_container_' + value).removeClass('hidden_field');
        parent.find('.ff-custom-user-input-wrapper.hidden_field input').attr('min', '0');
      }
    }
  }, {
    key: "handleCustomUserInputChange",
    value: function handleCustomUserInputChange(event) {
      var $element = jQuery(event.target);
      var customAmount = parseFloat($element.val()) || 0;
      var parentInputName = $element.data('parent_input_name');
      var parentInputType = $element.data('parent_input_type');
      var parentPlanIndex = $element.data('plan_index');
      var $parent;
      if (parentInputType === 'select') {
        $parent = this.$form.find('select[name=' + parentInputName + '] option:selected');
        parentPlanIndex = $parent.val();
      } else if (parentInputType === 'radio') {
        $parent = this.$form.find('input[name=' + parentInputName + ']:checked');
      } else {
        $parent = this.$form.find('input[name=' + parentInputName + ']');
      }
      var initialAmount = parseFloat($parent.data('initial_amount'));
      var paymentValue = customAmount + initialAmount;
      var signupFee = parseFloat($parent.attr('data-signup_fee'));
      $parent.attr('data-payment_value', paymentValue);
      var $paymentSummary = $element.parent().parent().find('.ff_summary_container_' + parentPlanIndex);
      $paymentSummary.find('.ffbs_subscription_amount').html(this.getFormattedPrice(customAmount));
      $paymentSummary.find('.ffbs_first_interval_total').html(this.getFormattedPrice(paymentValue + signupFee));
      this.calculatePayments();
    }
  }, {
    key: "initStripeElement",
    value: function initStripeElement() {
      var _this6 = this;
      if (this.$form.hasClass('ff_has_stripe_inline')) {
        var _this$formPaymentConf;
        this.stripe = new Stripe(this.formPaymentConfig.stripe.publishable_key);
        this.stripe.registerAppInfo(this.formPaymentConfig.stripe_app_info);
        var customStyles = this.formPaymentConfig.stripe.custom_style.styles;
        var elements = this.stripe.elements();
        var card = elements.create("card", {
          style: customStyles,
          hidePostalCode: !this.formPaymentConfig.stripe.inlineConfig.verifyZip,
          disableLink: this.formPaymentConfig.stripe.inlineConfig.disable_link
        });

        // let's find the element
        var inlineElementId = this.$form.find('.ff_stripe_card_element').attr('id');
        if (!inlineElementId) {
          console.log('No Stripe Cart Element Found');
          return;
        }

        // Add an instance of the card Element into the `card-element` <div>.
        card.mount("#" + inlineElementId);
        card.addEventListener('change', function (event) {
          _this6.toggleStripeInlineCardError(event.error);
        });
        this.stripeCard = card;
        this.$form.on('fluentform_submission_success', function () {
          card.clear();
        });
        this.$form.on('fluentform_submission_failed', function () {
          _this6.stripeCard.update({
            disabled: false
          });
        });
        this.registerStripePaymentToken(inlineElementId);

        // Listener for update stripe input element styles.
        var that = this;
        this.$form.on('fluentform_update_stripe_inline_element_style', function (event, styles) {
          that.handleStripeStyleUpdate(styles, customStyles);
        });

        // get custom inline styles from stripe inline config and update stripe input element styles
        var styles = ((_this$formPaymentConf = this.formPaymentConfig.stripe) === null || _this$formPaymentConf === void 0 || (_this$formPaymentConf = _this$formPaymentConf.inlineConfig) === null || _this$formPaymentConf === void 0 ? void 0 : _this$formPaymentConf.inline_styles) || false;
        this.handleStripeStyleUpdate(styles, customStyles);
      }
    }

    // method for parse string styles to JS Object styles
  }, {
    key: "getJsStylesFromStringStyle",
    value: function getJsStylesFromStringStyle(styles) {
      if (!styles) return null;
      var styleObj = {};
      styles = styles.split(';');
      styles.forEach(function (style) {
        if (style) {
          style = style.split(':');
          var key = style[0].trim();
          if (key.includes('-')) {
            key = key.split('-');
            key = key[0] + key[1][0].toUpperCase() + key[1].slice(1);
          }
          styleObj[key] = style[1].trim();
        }
      });
      return styleObj;
    }

    // handler for customize stripe input element styles
  }, {
    key: "handleStripeStyleUpdate",
    value: function handleStripeStyleUpdate(styles, defaultStyle) {
      if (styles) {
        var that = this;
        // JS Styles object
        var stylesObj = {
          error_msg: that.getJsStylesFromStringStyle(styles.error_msg),
          input: that.getJsStylesFromStringStyle(styles.input),
          focusInput: that.getJsStylesFromStringStyle(styles.focusInput),
          placeholder: that.getJsStylesFromStringStyle(styles.placeholder)
        };
        var style = _objectSpread({}, defaultStyle);

        // css style property not supported for stripe input element in jsStyle format
        var notSupportedByStripe = ['boxShadow', 'border', 'borderStyle', 'borderWidth', 'borderColor', 'borderRadius'];
        if (stylesObj.input) {
          for (var property in stylesObj.input) {
            if (!defaultStyle.base[property]) {
              // delete style property from original styleObj that's not support by stripe
              if (notSupportedByStripe.includes(property)) {
                delete stylesObj.input[property];
              }
            }
          }
          style.base = _objectSpread(_objectSpread({}, style.base), stylesObj.input);
        }
        if (stylesObj.placeholder) {
          // handle placeholder styles
          style.base["::placeholder"] = _objectSpread(_objectSpread({}, style.base['::placeholder']), stylesObj.placeholder);
        }
        if (stylesObj.focusInput) {
          // handle input focus styles
          for (var _property in stylesObj.focusInput) {
            // delete style property from original styleObj that's not support by stripe
            if (notSupportedByStripe.includes(_property)) {
              delete stylesObj.focusInput[_property];
            }
          }
          style.base[":focus"] = _objectSpread(_objectSpread({}, style.base[':focus']), stylesObj.focusInput);
        }
        if (stylesObj.error_msg) {
          // handle input error styles
          style.invalid = _objectSpread(_objectSpread({}, style.invalid), stylesObj.error_msg);
          jQuery('.ff_card-errors').css(style.invalid); // update inline error message styles
        }
        // Update stripe input element styles on iframe. Stripe render input element inside iframe
        this.stripeCard.update({
          style: style
        });
      }
    }
  }, {
    key: "initPaymentMethodChange",
    value: function initPaymentMethodChange() {
      var _this7 = this;
      var $paymentMethods = this.$form.find('.ff_payment_method');
      if ($paymentMethods.length > 1) {
        this.paymentMethod = $paymentMethods.filter(function (i, e) {
          return e.checked;
        }).val();
      } else {
        this.paymentMethod = $paymentMethods.val();
      }
      if ($paymentMethods.length > 1) {
        $paymentMethods.change(function (event) {
          _this7.paymentMethod = event.target.value;
          jQuery(event.target).closest('.ff-el-input--content').find('.ff_pay_inline').css({
            display: 'none'
          });
          if (_this7.paymentMethod === 'stripe') {
            jQuery(event.target).closest('.ff-el-input--content').find('.stripe-inline-wrapper').css({
              display: 'block'
            });
          }
          if (_this7.paymentMethod === 'square') {
            jQuery(event.target).closest('.ff-el-input--content').find('.square-inline-wrapper').css({
              display: 'block'
            });
          }
        });
      }
    }
  }, {
    key: "registerStripePaymentToken",
    value: function registerStripePaymentToken(inlineElementId) {
      var that = this;
      this.formInstance.addGlobalValidator('stripeInlinePayment', function ($theForm, formData) {
        if (that.paymentMethod === 'stripe' && !that.hasPaymentItems) {
          if (!jQuery('#' + inlineElementId).closest('.ff_excluded').length) {
            that.formInstance.showFormSubmissionProgress($theForm);
            jQuery('<div/>', {
              'id': that.formId + '_success',
              'class': 'ff-message-success ff_msg_temp'
            }).html(that.$t('processing_text')).insertAfter(that.$form);
            that.toggleStripeInlineCardError();
            var dfd = jQuery.Deferred();
            that.stripe.createPaymentMethod('card', that.stripeCard).then(function (result) {
              //that.formInstance.hideFormSubmissionProgress($theForm);
              if (result.error) {
                that.toggleStripeInlineCardError(result.error);
              } else {
                that.stripeCard.update({
                  disabled: true
                });
                that.formInstance.hideFormSubmissionProgress($theForm);
                jQuery('<div/>', {
                  'id': that.formId + '_success',
                  'class': 'ff-message-success ff_msg_temp'
                }).html(that.$t('processing_text')).insertAfter(that.$form);
                formData.data += '&' + jQuery.param({
                  '__stripe_payment_method_id': result.paymentMethod.id
                });
                dfd.resolve();
              }
            });
            return dfd.promise();
          }
        }
      });
    }
  }, {
    key: "toggleStripeInlineCardError",
    value: function toggleStripeInlineCardError(error) {
      var _this8 = this;
      var $errorDiv = this.$form.find('.ff_card-errors');
      if (error) {
        $errorDiv.html(error.message);
        $errorDiv.closest('.stripe-inline-wrapper').addClass('ff-el-is-error');
        this.formInstance.hideFormSubmissionProgress(this.$form);
        this.stripeCard.update({
          disabled: false
        });
      } else {
        $errorDiv.html('');
        $errorDiv.closest('.stripe-inline-wrapper').removeClass('ff-el-is-error');
      }
      setTimeout(function () {
        _this8.maybeRemoveSubmitError();
      }, 500);
    }
  }, {
    key: "stripeSetupIntent",
    value: function stripeSetupIntent(data) {
      var _this9 = this;
      this.stripe.confirmCardPayment(data.client_secret, {
        payment_method: data.payment_method_id
      }).then(function (result) {
        if (result.error) {
          _this9.toggleStripeInlineCardError(result.error);
        } else {
          _this9.handleStripePaymentConfirm({
            action: 'fluentform_sca_inline_confirm_payment_setup_intents',
            form_id: _this9.formId,
            payment_method: result.paymentIntent.payment_method,
            payemnt_method_id: data.payemnt_method_id,
            payment_intent_id: result.paymentIntent.id,
            submission_id: data.submission_id,
            stripe_subscription_id: data.stripe_subscription_id,
            type: 'handleCardSetup'
          });
        }
      });
    }
  }, {
    key: "initStripeSCAModal",
    value: function initStripeSCAModal(data) {
      var _this10 = this;
      this.formInstance.showFormSubmissionProgress(this.$form);
      this.stripe.handleCardAction(data.client_secret).then(function (result) {
        if (result.error) {
          _this10.formInstance.hideFormSubmissionProgress(_this10.$form);
          _this10.toggleStripeInlineCardError(result.error);
        } else {
          _this10.handleStripePaymentConfirm({
            action: 'fluentform_sca_inline_confirm_payment',
            form_id: _this10.formId,
            payment_method: result.paymentIntent.payment_method,
            payment_intent_id: result.paymentIntent.id,
            submission_id: data.submission_id,
            type: 'handleCardAction'
          });
        }
      });
    }
  }, {
    key: "handleStripePaymentConfirm",
    value: function handleStripePaymentConfirm(data) {
      this.maybeRemoveSubmitError();
      jQuery('<div/>', {
        'id': this.formId + '_success',
        'class': 'ff-message-success ff_msg_temp'
      }).html(this.$t('confirming_text')).insertAfter(this.$form);
      this.formInstance.showFormSubmissionProgress(this.$form);
      window.fluentFormApp(this.$form).sendData(this.$form, data);
    }
  }, {
    key: "maybeRemoveSubmitError",
    value: function maybeRemoveSubmitError() {
      jQuery('#form_success').remove();
    }
  }]);
  return Payment_handler;
}();
(function ($) {
  $.each($('form.fluentform_has_payment'), function () {
    var $form = $(this);
    $form.on('fluentform_init_single', function (event, instance) {
      new Payment_handler($form, instance).init();
    });
  });
  $(document).on('ff_reinit', function (e, formItem) {
    var $form = $(formItem);
    $form.attr('data-ff_reinit', 'yes');
    var instance = fluentFormApp($form);
    if (!instance) {
      return false;
    }
    new Payment_handler($form, instance).init();
  });
})(jQuery);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./src/assets/public/payment_handler_pro.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fluentform_public_payment_handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fluentform/public/payment_handler.js */ "../fluentform/resources/assets/public/payment_handler.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Payment_handler_pro = /*#__PURE__*/function (_Payment_handler) {
  _inherits(Payment_handler_pro, _Payment_handler);
  var _super = _createSuper(Payment_handler_pro);
  function Payment_handler_pro($form, instance) {
    _classCallCheck(this, Payment_handler_pro);
    return _super.call(this, $form, instance);
  }
  _createClass(Payment_handler_pro, [{
    key: "init",
    value: function init() {
      this.boot();
      this.initSquareElement();
    }
  }, {
    key: "initSquareElement",
    value: function initSquareElement() {
      var _this = this;
      if (this.$form.hasClass("ff_has_square_inline")) {
        var inlineElementId = this.$form.find(".ff_square_card_element").attr("id");
        if (!inlineElementId) {
          console.error("No Square Card Element Found");
          return;
        }
        if (!window.Square) {
          throw new Error("Square.js failed to load properly");
        }
        var applicationId = this.formPaymentConfig.square.inline_config.settings.application_id;
        var locationId = this.formPaymentConfig.square.inline_config.settings.location_id;
        if (!applicationId) {
          console.error("Please set application ID from global settings.");
          return;
        }
        try {
          this.square = window.Square.payments(applicationId, locationId);
        } catch (error) {
          console.error("Error initializing Square payments:", error);
          var statusContainer = document.getElementById(inlineElementId);
          statusContainer.className = "missing-credentials";
          statusContainer.style.visibility = "visible";
          return;
        }
        var card;
        try {
          card = this.square.card();
          card.then(function (cardInstance) {
            cardInstance.attach("#" + inlineElementId);
            _this.squareCard = cardInstance;
            _this.$form.on("fluentform_submission_success", function () {
              cardInstance.clear();
            });
            _this.$form.on("fluentform_submission_failed", function () {
              cardInstance.clear();
            });
            _this.registerSquarePaymentToken(inlineElementId);
          });
        } catch (error) {
          console.error("Initializing Card failed", error);
          return;
        }
      }
    }
  }, {
    key: "registerSquarePaymentToken",
    value: function registerSquarePaymentToken(inlineElementId) {
      var that = this;
      this.formInstance.addGlobalValidator("squareInlinePayment", function ($theForm, formData) {
        if (that.paymentMethod === "square" && !that.hasPaymentItems) {
          if (!jQuery("#" + inlineElementId).closest(".ff_excluded").length) {
            that.formInstance.showFormSubmissionProgress($theForm);
            jQuery("<div/>", {
              id: that.formId + "_success",
              "class": "ff-message-success ff_msg_temp"
            }).html(that.$t("processing_text")).insertAfter(that.$form);
            that.toggleSquareInlineCardError();
            var dfd = jQuery.Deferred();

            // Tokenize the card
            that.squareCard.tokenize().then(function (result) {
              if (result.status !== "OK") {
                that.toggleSquareInlineCardError(result.errors[0]);
                that.formInstance.hideFormSubmissionProgress($theForm);
                dfd.reject();
              } else {
                var token = result.token;
                var verificationDetails = {
                  amount: that.totalAmount.toString(),
                  currencyCode: that.formPaymentConfig.currency_settings.currency,
                  intent: "CHARGE",
                  billingContact: {}
                };

                // Verify buyer
                that.square.verifyBuyer(token, verificationDetails).then(function (verificationResult) {
                  console.log(verificationResult);
                  if (verificationResult.token) {
                    formData.data += "&" + jQuery.param({
                      __square_payment_method_id: token,
                      __square_verify_buyer_id: verificationResult.token
                    });
                    dfd.resolve();
                  } else {
                    throw new Error('Buyer verification failed');
                  }
                })["catch"](function (error) {
                  that.toggleSquareInlineCardError(error);
                  that.formInstance.hideFormSubmissionProgress($theForm);
                  dfd.reject();
                });
              }
            })["catch"](function (error) {
              that.toggleSquareInlineCardError(error);
              that.formInstance.hideFormSubmissionProgress($theForm);
              dfd.reject();
            });
            return dfd.promise();
          }
        }
      });
    }
  }, {
    key: "toggleSquareInlineCardError",
    value: function toggleSquareInlineCardError(error) {
      var _this2 = this;
      var $errorDiv = this.$form.find(".ff_card-errors");
      if (error) {
        $errorDiv.html(error.message);
        $errorDiv.closest(".square-inline-wrapper").addClass("ff-el-is-error");
        this.formInstance.hideFormSubmissionProgress(this.$form);
      } else {
        $errorDiv.html("");
        $errorDiv.closest(".square-inline-wrapper").removeClass("ff-el-is-error");
      }
      setTimeout(function () {
        _this2.maybeRemoveSubmitError();
      }, 500);
    }
  }]);
  return Payment_handler_pro;
}(_fluentform_public_payment_handler_js__WEBPACK_IMPORTED_MODULE_0__.Payment_handler);
(function ($) {
  $.each($('form.fluentform_has_payment'), function () {
    var $form = $(this);
    $form.on('fluentform_init_single', function (event, instance) {
      new Payment_handler_pro($form, instance).init();
    });
  });
  $(document).on('ff_reinit', function (e, formItem) {
    var $form = $(formItem);
    $form.attr('data-ff_reinit', 'yes');
    var instance = fluentFormApp($form);
    if (!instance) {
      return false;
    }
    new Payment_handler_pro($form, instance).init();
  });
})(jQuery);
})();

/******/ })()
;