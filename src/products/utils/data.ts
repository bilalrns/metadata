import { RawDraftContentState } from "draft-js";

import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { maybe } from "@saleor/misc";
import {
  ProductDetails_product,
  ProductDetails_product_collections,
  ProductDetails_product_variants
} from "@saleor/products/types/ProductDetails";
import { SearchProductTypes_search_edges_node_productAttributes } from "@saleor/searches/types/SearchProductTypes";
import { StockInput } from "@saleor/types/globalTypes";
import { FormsetAtomicData } from "@saleor/hooks/useFormset";
import { ProductAttributeInput } from "../components/ProductAttributes";
import { VariantAttributeInput } from "../components/ProductVariantAttributes";
import { ProductVariant } from "../types/ProductVariant";
import { ProductVariantCreateData_product } from "../types/ProductVariantCreateData";
import { ProductStockInput } from "../components/ProductStocks";

export interface Collection {
  id: string;
  label: string;
}

interface Node {
  id: string;
  name: string;
}

export interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
  productAttributes: SearchProductTypes_search_edges_node_productAttributes[];
}

export function getAttributeInputFromProduct(
  product: ProductDetails_product
): ProductAttributeInput[] {
  return maybe(
    (): ProductAttributeInput[] =>
      product.attributes.map(attribute => ({
        data: {
          inputType: attribute.attribute.inputType,
          isRequired: attribute.attribute.valueRequired,
          values: attribute.attribute.values
        },
        id: attribute.attribute.id,
        label: attribute.attribute.name,
        value: attribute.values.map(value => value.slug)
      })),
    []
  );
}

export interface ProductAttributeValueChoices {
  id: string;
  values: MultiAutocompleteChoiceType[];
}
export function getSelectedAttributesFromProduct(
  product: ProductDetails_product
): ProductAttributeValueChoices[] {
  return maybe(
    () =>
      product.attributes.map(attribute => ({
        id: attribute.attribute.id,
        values: attribute.values.map(value => ({
          label: value.name,
          value: value.slug
        }))
      })),
    []
  );
}

export function getAttributeInputFromProductType(
  productType: ProductType
): ProductAttributeInput[] {
  return productType.productAttributes.map(attribute => ({
    data: {
      inputType: attribute.inputType,
      isRequired: attribute.valueRequired,
      values: attribute.values
    },
    id: attribute.id,
    label: attribute.name,
    value: []
  }));
}

export function getAttributeInputFromVariant(
  variant: ProductVariant
): VariantAttributeInput[] {
  return maybe(
    (): VariantAttributeInput[] =>
      variant.attributes.map(attribute => ({
        data: {
          values: attribute.attribute.values
        },
        id: attribute.attribute.id,
        label: attribute.attribute.name,
        value: maybe(() => attribute.values[0].slug, null)
      })),
    []
  );
}

export function getStockInputFromVariant(
  variant: ProductVariant
): ProductStockInput[] {
  return (
    variant?.stocks.map(stock => ({
      data: null,
      id: stock.warehouse.id,
      label: stock.warehouse.name,
      value: stock.quantity.toString()
    })) || []
  );
}

export function getVariantAttributeInputFromProduct(
  product: ProductVariantCreateData_product
): VariantAttributeInput[] {
  return maybe(() =>
    product.productType.variantAttributes.map(attribute => ({
      data: {
        values: attribute.values
      },
      id: attribute.id,
      label: attribute.name,
      value: ""
    }))
  );
}

export function getStockInputFromProduct(
  product: ProductDetails_product
): ProductStockInput[] {
  return product?.variants[0]?.stocks.map(stock => ({
    data: null,
    id: stock.warehouse.id,
    label: stock.warehouse.name,
    value: stock.quantity.toString()
  }));
}

export function getCollectionInput(
  productCollections: ProductDetails_product_collections[]
): Collection[] {
  return maybe(
    () =>
      productCollections.map(collection => ({
        id: collection.id,
        label: collection.name
      })),
    []
  );
}

export function getChoices(nodes: Node[]): SingleAutocompleteChoiceType[] {
  return maybe(
    () =>
      nodes.map(node => ({
        label: node.name,
        value: node.id
      })),
    []
  );
}

export interface ProductUpdatePageFormData {
  basePrice: number;
  category: string | null;
  collections: string[];
  chargeTaxes: boolean;
  description: RawDraftContentState;
  isPublished: boolean;
  name: string;
  publicationDate: string;
  seoDescription: string;
  seoTitle: string;
  sku: string;
  trackInventory: boolean;
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
}

export function getProductUpdatePageFormData(
  product: ProductDetails_product,
  variants: ProductDetails_product_variants[]
): ProductUpdatePageFormData {
  const itemNumberValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemNumber")
  );
  const weightValue = maybe(() =>
    product.metadata.filter(item => item.key === "weight")
  );
  const itemStackConfigLengthValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemStackConfigLength")
  );
  const itemStackConfigWidthValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemStackConfigWidth")
  );
  const itemStackConfigHeightValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemStackConfigHeight")
  );
  const itemSizeLengthValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemSizeLength")
  );
  const itemSizeWidthValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemSizeWidth")
  );
  const itemSizeHeightValue = maybe(() =>
    product.metadata.filter(item => item.key === "itemSizeHeight")
  );
  const combineExceptionsValue = maybe(() =>
    product.metadata.filter(item => item.key === "combineExceptions")
  );
  const shipClassLTL1Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL1")
  );
  const shipClassLTL2Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL2")
  );
  const shipClassLTL3Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL3")
  );
  const shipClassLTL4Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL4")
  );
  const shipClassLTL5Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL5")
  );
  const shipClassLTL6Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL6")
  );
  const shipClassLTL7Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL7")
  );
  const shipClassLTL8Value = maybe(() =>
    product.metadata.filter(item => item.key === "shipClassLTL8")
  );
  return {
    basePrice: maybe(() => product.basePrice.amount, 0),
    category: maybe(() => product.category.id, ""),
    chargeTaxes: maybe(() => product.chargeTaxes, false),
    collections: maybe(
      () => product.collections.map(collection => collection.id),
      []
    ),
    combineExceptions: maybe(() => combineExceptionsValue[0].value, ""),
    description: maybe(() => JSON.parse(product.descriptionJson)),
    isPublished: maybe(() => product.isPublished, false),
    itemNumber: maybe(() => itemNumberValue[0].value, ""),
    itemSizeHeight: maybe(() => itemSizeHeightValue[0].value, ""),
    itemSizeLength: maybe(() => itemSizeLengthValue[0].value, ""),
    itemSizeWidth: maybe(() => itemSizeWidthValue[0].value, ""),
    itemStackConfigHeight: maybe(() => itemStackConfigHeightValue[0].value, ""),
    itemStackConfigLength: maybe(() => itemStackConfigLengthValue[0].value, ""),
    itemStackConfigWidth: maybe(() => itemStackConfigWidthValue[0].value, ""),
    name: maybe(() => product.name, ""),
    publicationDate: maybe(() => product.publicationDate, ""),
    seoDescription: maybe(() => product.seoDescription, ""),
    seoTitle: maybe(() => product.seoTitle, ""),
    shipClassLTL1: maybe(() => shipClassLTL1Value[0].value, ""),
    shipClassLTL2: maybe(() => shipClassLTL2Value[0].value, ""),
    shipClassLTL3: maybe(() => shipClassLTL3Value[0].value, ""),
    shipClassLTL4: maybe(() => shipClassLTL4Value[0].value, ""),
    shipClassLTL5: maybe(() => shipClassLTL5Value[0].value, ""),
    shipClassLTL6: maybe(() => shipClassLTL6Value[0].value, ""),
    shipClassLTL7: maybe(() => shipClassLTL7Value[0].value, ""),
    shipClassLTL8: maybe(() => shipClassLTL8Value[0].value, ""),
    sku: maybe(
      () =>
        product.productType.hasVariants
          ? undefined
          : variants && variants[0]
          ? variants[0].sku
          : undefined,
      ""
    ),
    trackInventory: !!product?.variants[0]?.trackInventory,
    weight: maybe(() => weightValue[0].value, "")
  };
}

export function mapFormsetStockToStockInput(
  stock: FormsetAtomicData<null, string>
): StockInput {
  return {
    quantity: parseInt(stock.value, 10),
    warehouse: stock.id
  };
}
