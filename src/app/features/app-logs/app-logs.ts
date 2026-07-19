import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
    @ViewChild('scrollContainer', { static: false }) private scrollContainer!: ElementRef;

  readonly store = inject(AppLogsStore)
  isOpen=false;
  private isUserScrolling = false;
  
  openChange(): void {
   this.isOpen = !this.isOpen;
  }
   ngAfterViewChecked() {
    this.scrollToBottom();
  }

    onScroll() {
    const element = this.scrollContainer.nativeElement;
    // Kiểm tra xem người dùng có đang cuộn lên để đọc tin cũ không
    const threshold = 150; // Khoảng cách an toàn (pixel)
    const position = element.scrollHeight - element.scrollTop - element.clientHeight;
    
    this.isUserScrolling = position > threshold;
  }

  private scrollToBottom(): void {
    if (!this.isUserScrolling && this.scrollContainer) {
      try {
        const element = this.scrollContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      } catch(err) { }
    }
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
