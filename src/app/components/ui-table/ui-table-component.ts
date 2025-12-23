import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';


@Component({
  selector: 'ui-table-component',
  imports: [NzTableModule,
    NzPaginationModule],
  templateUrl: './ui-table-component.html',
  styleUrl: './ui-table-component.css',
})
export class UITableComponent {
  @Input() customColumn: any;
  @Input() list: any[] = [];
  @Input() pageSize: number = 10;
  @Input() page: number = 1;
  @Input() total: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  constructor() {
  }

  tableChangePage($event: number): void {
    this.pageChange.emit($event);
  }

  getValue(rowName: any, _id: string) {
    const row: any = this.list.find(e => e._id == _id);
    if (row) {
      return row[rowName]
    }
    return ''
  }
}
