import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { sectionNames } from "@saleor/intl";
import { AccountErrorFragment } from "@saleor/customers/types/AccountErrorFragment";
import { getUserName, maybe } from "../../../misc";
import { CustomerDetails_user } from "../../types/CustomerDetails";
import CustomerAddresses from "../CustomerAddresses";
import CustomerDetails from "../CustomerDetails";
import CustomerFeesAndDiscounts from "../CustomerFeesAndDiscounts";
import CustomerInfo from "../CustomerInfo";
import CustomerOrders from "../CustomerOrders";
import CustomerStats from "../CustomerStats";

export interface CustomerDetailsPageFormData {
  firstName: string;
  lastName: string;
  email: string;
  inputType: string;
  isActive: boolean;
  discountValue: string;
  note: string;
  isFee: string;
}

export interface CustomerDetailsPageProps {
  customer: CustomerDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: CustomerDetailsPageFormData) => void;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({
  customer,
  disabled,
  errors,
  saveButtonBar,
  onBack,
  onSubmit,
  onViewAllOrdersClick,
  onRowClick,
  onAddressManageClick,
  onDelete
}: CustomerDetailsPageProps) => {
  const intl = useIntl();
  const isFeeValue = maybe(() =>
    customer.metadata.filter(item => item.key === "fee")
  );

  return (
    <Form
      initial={{
        discountValue: maybe(() => customer.metadata[0].value, "0"),
        email: maybe(() => customer.email, ""),
        firstName: maybe(() => customer.firstName, ""),
        inputType: maybe(() => customer.metadata[0].key, ""),
        isActive: maybe(() => customer.isActive, false),
        isFee: maybe(() => JSON.parse(isFeeValue[0].value), false),
        lastName: maybe(() => customer.lastName, ""),
        note: maybe(() => customer.note, "")
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.customers)}
          </AppHeader>
          <PageHeader title={getUserName(customer, true)} />
          <Grid>
            <div>
              <CustomerDetails
                customer={customer}
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <CustomerInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <CustomerFeesAndDiscounts
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <CustomerOrders
                orders={maybe(() =>
                  customer.orders.edges.map(edge => edge.node)
                )}
                onViewAllOrdersClick={onViewAllOrdersClick}
                onRowClick={onRowClick}
              />
            </div>
            <div>
              <CustomerAddresses
                customer={customer}
                disabled={disabled}
                onAddressManageClick={onAddressManageClick}
              />
              <CardSpacer />
              <CustomerStats customer={customer} />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBar}
            onSave={submit}
            onCancel={onBack}
            onDelete={onDelete}
          />
        </Container>
      )}
    </Form>
  );
};
CustomerDetailsPage.displayName = "CustomerDetailsPage";
export default CustomerDetailsPage;
