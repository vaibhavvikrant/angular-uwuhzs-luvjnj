import { Component, ViewEncapsulation, Renderer2 } from "@angular/core";
import { RowClassArgs } from "@progress/kendo-angular-grid";

const products = [
  {
    ProductID: 1,
    ProductName: "Chai",
    UnitPrice: 18.0,
    Discontinued: true,
    code: "C1"
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    UnitPrice: 19.0,
    Discontinued: false,
    code: "C2"
  }
];

@Component({
  selector: "my-app",
  encapsulation: ViewEncapsulation.None,
  template: `
    <kendo-grid
      [data]="gridData"
      [selectable]="true"
      [height]="410"
      #grid
      [rowClass]="rowCallback"
    >
      <kendo-grid-column
        field="ProductID"
        title="ID"
        width="40"
        [class]="{ codeColumn: selActiveField === 'ProductID' }"
        (cellClick)="cellClickHandler($event)"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="ProductName"
        title="Name"
        width="250"
        [class]="{ codeColumn: selActiveField === 'ProductName' }"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="Category.CategoryName"
        title="Category"
        [class]="{ codeColumn: selActiveField === 'Category.CategoryName' }"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="UnitPrice"
        title="Price"
        width="80"
        [class]="{ codeColumn: selActiveField === 'UnitPrice' }"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="UnitsInStock"
        title="In stock"
        width="80"
        [class]="{ codeColumn: selActiveField === 'UnitsInStock' }"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="Discontinued"
        title="Discontinued"
        width="120"
        [class]="{ codeColumn: selActiveField === 'Discontinued' }"
      >
        <ng-template kendoGridCellTemplate let-dataItem>
          <input type="checkbox" [checked]="dataItem.Discontinued" disabled />
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
    <grid-context-menu
      [for]="grid"
      [menuItems]="['Move Up', 'Move Down']"
      (select)="onSelect($event)"
      (sendDataitem)="getItemVal($event)"
    >
    </grid-context-menu>
  `,
  styles: [
    `
      .gold .codeColumn {
        background-color: #ffba80;
      }
      .green .codeColumn {
        background-color: #b2f699;
      }
    `
  ]
})
export class AppComponent {
  public gridData: any[] = products;
  public selActiveCell: any;
  public selActiveField: any;
  public onSelect({ dataItem, item }): void {
    const index = this.gridData.indexOf(dataItem);
    if (item === "Move Up") {
      if (index > 0) {
        this.swap(index - 1, index);
      }
    } else if (index < this.gridData.length - 1) {
      this.swap(index, index + 1);
    }
  }

  public getItemVal(e) {
    this.selActiveCell = e.dataItem.ProductID;
    this.selActiveField = e.column.field;
  }

  private swap(index1, index2): void {
    const temp = this.gridData[index1];
    this.gridData[index1] = this.gridData[index2];
    this.gridData[index2] = temp;
  }

  public rowCallback = (context: RowClassArgs) => {
    switch (context.dataItem.ProductID) {
      case this.selActiveCell:
        return { gold: true };
      default:
        return {};
    }
  };

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem }) {
    console.log("columnIndex" + columnIndex);
  }
}
