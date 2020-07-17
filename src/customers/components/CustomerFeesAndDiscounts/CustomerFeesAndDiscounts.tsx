import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import Grid from "@saleor/components/Grid";
import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import SingleSelectField from "@saleor/components/SingleSelectField";
// import Grid from "@saleor/components/Grid";
// import Hr from "@saleor/components/Hr";
import TextFieldWithChoice from "@saleor/components/TextFieldWithChoice";
import { commonMessages } from "@saleor/intl";
import { AccountErrorFragment } from "@saleor/customers/types/AccountErrorFragment";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";

const useStyles = makeStyles(
  theme => ({
    content: {
      paddingTop: theme.spacing(2)
    },
    grids: {
      marginTop: "1rem"
    },
    hr: {
      margin: theme.spacing(3, 0)
    },
    sectionHeader: {
      marginBottom: theme.spacing()
    }
  }),
  { name: "CustomerInfo" }
);

export interface CustomerFeesAndDiscountsProps {
  data: {
    discountValue: string;
    firstName: string;
    lastName: string;
    email: string;
    inputType: string;
    isFee: boolean;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const CustomerFeesAndDiscounts: React.FC<CustomerFeesAndDiscountsProps> = props => {
  const { data, disabled, errors, onChange } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const formErrors = getFormErrors(
    ["discountValue", "inputType", "firstName", "lastName", "email"],
    errors
  );

  const inputTypeChoices = [
    {
      label: intl.formatMessage({
        defaultMessage: "DISCOUNT_CODE4000",
        description: "product attribute type"
      }),
      value: "DISCOUNT_CODE4000"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "DISCOUNT_CODE4020",
        description: "product attribute type"
      }),
      value: "DISCOUNT_CODE4020"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "DISCOUNT_CODE4022",
        description: "product attribute type"
      }),
      value: "DISCOUNT_CODE4022"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "DISCOUNT_CODE4030",
        description: "product attribute type"
      }),
      value: "DISCOUNT_CODE4030"
    },
    {
      label: intl.formatMessage({
        defaultMessage: "DISCOUNT_CODE4040",
        description: "product attribute type"
      }),
      value: "DISCOUNT_CODE4040"
    }
  ];
  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Customer Fees and Discounts"
            description="customer fees, header"
          />
        }
      />
      <CardContent className={classes.content}>
        <Typography className={classes.sectionHeader}>
          <FormattedMessage {...commonMessages.generalInformations} />
        </Typography>
        <ControlledCheckbox
          checked={data.isFee}
          // className={classes.checkbox}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "5% flat fee",
            description: "check to mark this fee as active"
          })}
          name="isFee"
          onChange={onChange}
        />
        <Grid className={classes.grids} variant="uniform">
          <SingleSelectField
            choices={inputTypeChoices}
            disabled={disabled}
            error={!!formErrors.inputType}
            hint={getAccountErrorMessage(formErrors.inputType, intl)}
            label={intl.formatMessage({
              defaultMessage: "Discount Codes",
              description: "attribute's editor component"
            })}
            name="inputType"
            onChange={onChange}
            value={data.inputType}
          />
          <TextFieldWithChoice
            disabled={disabled}
            error={!!formErrors.discountValue}
            ChoiceProps={{
              label: "%",
              name: "discountValue" as keyof FormData,
              values: null
            }}
            helperText={getAccountErrorMessage(formErrors.discountValue, intl)}
            name={"discountValue" as keyof FormData}
            onChange={onChange}
            label={intl.formatMessage({
              defaultMessage: "Discount Value"
            })}
            value={data.discountValue}
            type="number"
            fullWidth
            inputProps={{
              max: 1.8,
              min: 0
            }}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
CustomerFeesAndDiscounts.displayName = "CustomerFeesAndDiscounts";
export default CustomerFeesAndDiscounts;
