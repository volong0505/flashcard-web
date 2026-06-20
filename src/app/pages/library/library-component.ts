import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EnglishDictionary } from '../english-dictionary/english-dictionary';
import { EnglishSentence } from '../english-sentence/english-sentence';
import { EnglishStructure } from '../english-structure/english-structure';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-library-component',
  imports: [
    NzTabsModule,

    EnglishDictionary,
    EnglishSentence,
    EnglishStructure,
    RouterLink,

    NzSelectModule
  ],
  standalone: true,
  template: `
    <nz-tabs nzLinkRouter [nzTabBarExtraContent]="extraTemplate">
      <nz-tab >
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'one' }" queryParamsHandling="merge">
          Dictionary
        </a>
        <english-dictionary/>
      </nz-tab>

      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'two' }" queryParamsHandling="merge">
          Sentences
        </a>
        <english-sentence/>
      </nz-tab>

         <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'three' }" queryParamsHandling="merge">
          Structure
        </a>
        <english-structure/>
      </nz-tab>
    </nz-tabs>

     <ng-template #extraTemplate>
       <nz-select ngModel="lucy">
        <nz-option nzValue="jack" nzLabel="Jack" />
        <nz-option nzValue="lucy" nzLabel="Lucy" />
        <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled />
      </nz-select>

    </ng-template>

  `,
  styles: [
    `
       nz-select {
      margin: 0 8px 10px 0;
      width: 120px;
    }
      `
  ],
})
export class LibraryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  dynamicTabs: Array<{ title: string; content: string; queryParams?: Params; routerLink: string[] }> = [];
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!params['tab']) this.router.navigate(['/library'], { queryParams: { tab: "one" } });
    });
  }
}
