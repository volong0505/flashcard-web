import { Component, inject } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AppLogsStore } from '../../data-access/app-logs/app-logs.store';

@Component({
  selector: 'app-logs',
  imports: [NzFloatButtonModule, NzIconModule, NzTypographyModule],
  templateUrl: './app-logs.html',
  styleUrl: './app-logs.css',
})
export class AppLogs {
  readonly store = inject(AppLogsStore)
  isOpen=false;

  openChange(): void {
   this.isOpen = !this.isOpen;
  }

  getTypeLog(status: string): any {
    switch (status) {
      case "failed": return "danger"
      case "warning": return "warning"
      case "success": return "default"
      default: return 'default'
    }
  }
}
