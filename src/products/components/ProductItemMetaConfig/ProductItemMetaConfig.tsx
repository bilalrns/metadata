import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import { getFormErrors } from "@saleor/utils/errors";
import { maybe } from "../../../misc";

const useStyles = makeStyles(
  {
    extraFields: {
      marginLeft: "1rem"
    },
    fields: {
      marginBottom: "1rem"
    },
    root: {
      display: "flex",
      marginBottom: "1rem"
    }
  },
  { name: "ProductItemMetaConfig" }
);

interface ProductItemMetaConfigProps {
  currency?: string;
  data: {
    chargeTaxes: boolean;
    itemNumber: string;
    weight: string;
    itemStackConfigLength: string;
    itemStackConfigWidth: string;
    itemStackConfigHeight: string;
    itemSizeLength: string;
    itemSizeWidth: string;
    itemSizeHeight: string;
    combineExceptions: any;
    shipClassLTL1: string;
    shipClassLTL2: string;
    shipClassLTL3: string;
    shipClassLTL4: string;
    shipClassLTL5: string;
    shipClassLTL6: string;
    shipClassLTL7: string;
    shipClassLTL8: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const ProductItemMetaConfig: React.FC<ProductItemMetaConfigProps> = props => {
  const { data, disabled, errors, onChange } = props;
  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    [
      "itemNumber",
      "weight",
      "itemStackConfigLength",
      "itemStackConfigWidth",
      "itemStackConfigHeight",
      "itemSizeLength",
      "itemSizeWidth",
      "itemSizeHeight",
      "combineExceptions",
      "shipClassLTL1",
      "shipClassLTL2",
      "shipClassLTL3",
      "shipClassLTL4",
      "shipClassLTL5",
      "shipClassLTL6",
      "shipClassLTL7",
      "shipClassLTL8"
    ],
    errors
  );

  const removeLeftBracket = maybe(() =>
    data.combineExceptions.replace("[", "")
  );
  const removeRightBracket = removeLeftBracket.replace("]", "");
  const removeCommas = removeRightBracket.replace(/'/g, "");
  const removeSpaces = removeCommas.replace(" ", "");
  data.combineExceptions = removeSpaces;
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Product Item Meta Config",
          description: "product item meta config"
        })}
      ></CardTitle>
      <CardContent>
        <Typography className={classes.fields}>
          <FormattedMessage defaultMessage="Item Number:" />
        </Typography>
        <TextField
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "Item Number",
            description: "item number"
          })}
          error={!!formErrors.itemNumber}
          name="itemNumber"
          fullWidth
          className={classes.fields}
          value={data.itemNumber}
          onChange={onChange}
        />
        <Typography className={classes.fields}>
          <FormattedMessage defaultMessage="Weight:" />
        </Typography>
        <TextField
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "Weight",
            description: "item number"
          })}
          error={!!formErrors.weight}
          name="weight"
          fullWidth
          className={classes.fields}
          type="number"
          value={data.weight}
          onChange={onChange}
          inputProps={{
            max: 10.0,
            min: 0
          }}
        />
        <Typography className={classes.fields}>
          <FormattedMessage defaultMessage="Item Stack Config:" />
        </Typography>
        <div className={classes.root}>
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Length",
              description: "item number"
            })}
            error={!!formErrors.itemStackConfigLength}
            name="itemStackConfigLength"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.itemStackConfigLength}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Width",
              description: "item number"
            })}
            error={!!formErrors.itemStackConfigWidth}
            name="itemStackConfigWidth"
            className={classes.extraFields}
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.itemStackConfigWidth}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Height",
              description: "item number"
            })}
            error={!!formErrors.itemStackConfigHeight}
            className={classes.extraFields}
            name="itemStackConfigHeight"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.itemStackConfigHeight}
            onChange={onChange}
          />
        </div>
        <Typography className={classes.fields}>
          <FormattedMessage defaultMessage="Item Size:" />
        </Typography>
        <div className={classes.root}>
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Length",
              description: "item number"
            })}
            error={!!formErrors.itemSizeLength}
            name="itemSizeLength"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.itemSizeLength}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Width",
              description: "item number"
            })}
            error={!!formErrors.itemSizeWidth}
            className={classes.extraFields}
            name="itemSizeWidth"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.itemSizeWidth}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Height",
              description: "item number"
            })}
            error={!!formErrors.itemSizeHeight}
            className={classes.extraFields}
            name="itemSizeHeight"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.itemSizeHeight}
            onChange={onChange}
          />
        </div>
        <Typography className={classes.fields}>
          <FormattedMessage defaultMessage="Combine Exceptions:" />
        </Typography>
        <TextField
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "Combine Exceptions",
            description: "item number"
          })}
          error={!!formErrors.combineExceptions}
          className={classes.fields}
          name="combineExceptions"
          fullWidth
          value={data.combineExceptions}
          onChange={onChange}
        />
        <Typography className={classes.fields}>
          <FormattedMessage defaultMessage="Ship Classes:" />
        </Typography>
        <div className={classes.root}>
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL1",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL1}
            name="shipClassLTL1"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL1}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL2",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL2}
            className={classes.extraFields}
            name="shipClassLTL2"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL2}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL3",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL3}
            className={classes.extraFields}
            name="shipClassLTL3"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL3}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL4",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL4}
            className={classes.extraFields}
            name="shipClassLTL4"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL4}
            onChange={onChange}
          />
        </div>
        <div className={classes.root}>
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL5",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL5}
            name="shipClassLTL5"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL5}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL6",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL6}
            className={classes.extraFields}
            name="shipClassLTL6"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL6}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL7",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL7}
            className={classes.extraFields}
            name="shipClassLTL7"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL7}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "LTL8",
              description: "item number"
            })}
            error={!!formErrors.shipClassLTL8}
            className={classes.extraFields}
            name="shipClassLTL8"
            type="number"
            inputProps={{
              min: 0
            }}
            value={data.shipClassLTL8}
            onChange={onChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
ProductItemMetaConfig.displayName = "ProductItemMetaConfig";
export default ProductItemMetaConfig;
