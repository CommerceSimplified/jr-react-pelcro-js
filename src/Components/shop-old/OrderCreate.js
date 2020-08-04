// Checkout view.
// It is displayed after the products are selected (after Cart view) if user is authenticated.

import React, { Component } from "react";
import ErrMessage from "../common/ErrMessage";
import PropTypes from "prop-types";

import localisation from "../../utils/localisation";
import { showError } from "../../utils/showing-error";

import Header from "../common/Header";
import Authorship from "../common/Authorship";

import { PaymentMethodView } from "../PaymentMethod/PaymentMethodView";
import { getErrorMessages } from "../common/Helpers";

class OrderCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableSubmit: false,
      order: this.props.order
    };

    this.locale = localisation("payment").getLocaleData();

    this.user = window.Pelcro.user.read();
    this.address = window.Pelcro.user.read().addresses
      ? window.Pelcro.user.read().addresses[
          window.Pelcro.user.read().addresses.length - 1
        ]
      : null;

    this.site = window.Pelcro.site.read();

    this.closeButton = window.Pelcro.paywall.displayCloseButton();

    this.setDisableSubmitState = this.setDisableSubmitState.bind(
      this
    );
  }

  componentDidMount = () => {
    window.Pelcro.insight.track("Modal Displayed", {
      name: "payment"
    });

    this.setState({ couponCode: window.Pelcro.coupon.getFromUrl() });
  };

  // inserting error message into modal window
  showError = message => {
    showError(message, "pelcro-error-payment");
  };

  setDisableSubmitState = state => {
    this.setState({ disableSubmit: state });
  };

  render() {
    return (
      <div className="pelcro-prefix-view">
        <div
          className="pelcro-prefix-modal modal pelcro-prefix-fade pelcro-prefix-show"
          id="pelcro-view-checkout"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="pelcro-prefix-modal-dialog pelcro-prefix-modal-dialog-centered"
            role="document"
          >
            <div className="pelcro-prefix-modal-content">
              <Header
                closeButton={this.closeButton}
                resetView={this.props.resetView}
                site={this.site}
              ></Header>

              <div className="pelcro-prefix-modal-body">
                <div className="pelcro-prefix-title-block">
                  <h4>{this.locale.labels.checkout.title}</h4>
                </div>

                <ErrMessage name="payment" />

                <div className="pelcro-prefix-payment-block">
                  <div className="pelcro-prefix-alert pelcro-prefix-alert-success">
                    <div className="pelcro-prefix-payment-message">
                      <span>
                        {this.locale.messages.youAreSafe}{" "}
                        <a
                          className="pelcro-prefix-link"
                          rel="nofollow"
                          target="new"
                          href="https://www.stripe.com/us/customers"
                        >
                          Stripe
                        </a>{" "}
                      </span>
                    </div>
                  </div>

                  <div className="pelcro-prefix-form">
                    <PaymentMethodView
                      order={this.props.order}
                      type="orderCreate"
                    />
                  </div>
                </div>
              </div>
              <div className="pelcro-prefix-modal-footer">
                <Authorship></Authorship>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderCreate.propTypes = {
  plan: PropTypes.object,
  product: PropTypes.object,
  giftRecipient: PropTypes.object,
  setView: PropTypes.func,
  resetView: PropTypes.func,
  logout: PropTypes.func,
  subscriptionIdToRenew: PropTypes.number
};

export default OrderCreate;
