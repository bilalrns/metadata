import { decimal } from "@saleor/misc";
import { ProductUpdatePageSubmitData } from "@saleor/products/components/ProductUpdatePage";
import { ProductDetails_product } from "@saleor/products/types/ProductDetails";
import { ProductImageCreateVariables } from "@saleor/products/types/ProductImageCreate";
import { ProductImageReorderVariables } from "@saleor/products/types/ProductImageReorder";
import { ProductUpdateVariables } from "@saleor/products/types/ProductUpdate";
import { SimpleProductUpdateVariables } from "@saleor/products/types/SimpleProductUpdate";
import { ReorderEvent } from "@saleor/types";
import { arrayMove } from "react-sortable-hoc";
import { mapFormsetStockToStockInput } from "@saleor/products/utils/data";

export function createUpdateHandler(
  product: ProductDetails_product,
  updateProduct: (variables: ProductUpdateVariables) => void,
  updateSimpleProduct: (variables: SimpleProductUpdateVariables) => void
) {
  return (data: ProductUpdatePageSubmitData) => {
    const productVariables: ProductUpdateVariables = {
      attributes: data.attributes.map(attribute => ({
        id: attribute.id,
        values: attribute.value[0] === "" ? [] : attribute.value
      })),
      basePrice: decimal(data.basePrice),
      category: data.category,
      chargeTaxes: data.chargeTaxes,
      collections: data.collections,
      descriptionJson: JSON.stringify(data.description),
      id: product.id,
      isPublished: data.isPublished,
      name: data.name,
      publicationDate:
        data.publicationDate !== "" ? data.publicationDate : null,
      seo: {
        description: data.seoDescription,
        title: data.seoTitle
      }
    };
    const combineExceptionsArray = data.combineExceptions.split(",");
    if (product.productType.hasVariants) {
      updateProduct(productVariables);
    } else {
      updateSimpleProduct({
        ...productVariables,
        addStocks: data.addStocks.map(mapFormsetStockToStockInput),
        deleteStocks: data.removeStocks,
        metadata: [
          {
            key: "combineExceptions",
            value: combineExceptionsArray
          },
          {
            key: "itemNumber",
            value: data.itemNumber
          },
          {
            key: "itemSizeHeight",
            value: data.itemSizeHeight
          },
          {
            key: "itemSizeLength",
            value: data.itemSizeLength
          },
          {
            key: "itemSizeWidth",
            value: data.itemSizeWidth
          },
          {
            key: "itemStackConfigHeight",
            value: data.itemStackConfigHeight
          },
          {
            key: "itemStackConfigLength",
            value: data.itemStackConfigLength
          },
          {
            key: "itemStackConfigWidth",
            value: data.itemStackConfigWidth
          },
          {
            key: "shipClassLTL1",
            value: data.shipClassLTL1
          },
          {
            key: "shipClassLTL2",
            value: data.shipClassLTL2
          },
          {
            key: "shipClassLTL3",
            value: data.shipClassLTL3
          },
          {
            key: "shipClassLTL4",
            value: data.shipClassLTL4
          },
          {
            key: "shipClassLTL5",
            value: data.shipClassLTL5
          },
          {
            key: "shipClassLTL6",
            value: data.shipClassLTL6
          },
          {
            key: "shipClassLTL7",
            value: data.shipClassLTL7
          },
          {
            key: "shipClassLTL8",
            value: data.shipClassLTL8
          },
          {
            key: "weight",
            value: data.weight
          }
        ],
        productVariantId: product.variants[0].id,
        productVariantInput: {
          sku: data.sku,
          trackInventory: data.trackInventory
        },
        updateStocks: data.updateStocks.map(mapFormsetStockToStockInput)
      });
    }
  };
}

export function createImageUploadHandler(
  id: string,
  createProductImage: (variables: ProductImageCreateVariables) => void
) {
  return (file: File) =>
    createProductImage({
      alt: "",
      image: file,
      product: id
    });
}

export function createImageReorderHandler(
  product: ProductDetails_product,
  reorderProductImages: (variables: ProductImageReorderVariables) => void
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = product.images.map(image => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderProductImages({
      imagesIds: ids,
      productId: product.id
    });
  };
}
