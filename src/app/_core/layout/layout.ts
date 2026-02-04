import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// import { AppLogs } from '../../features/app-logs/app-logs';

@Component({
  selector: 'app-layout',
    imports: [
      CommonModule,
      RouterModule,
      NzIconModule,
      NzMenuModule,
      NzLayoutModule,

      // AppLogs
    ],
    standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  sidebarItem = [
    {
      label: 'Flashcard', path: 'learn', icon: 'translation'
    },
    {
      label: 'Library', path: 'library', icon: 'folder', exact: true, hidden: false,
    }
]

 isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
