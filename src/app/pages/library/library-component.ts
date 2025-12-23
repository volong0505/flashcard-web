import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EnglishDictionary } from '../english-dictionary/english-dictionary';
import { EnglishSentence } from '../english-sentence/english-sentence';

@Component({
  selector: 'app-library-component',
  imports: [
    NzTabsModule,

    EnglishDictionary,
    EnglishSentence,
    RouterLink
  ],
  standalone: true,
  template: `
    <nz-tabs nzLinkRouter>
      <nz-tab >
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'one' }" queryParamsHandling="merge">
          Dictionary
        </a>
        <english-dictionary/>
      </nz-tab>

      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'two' }" queryParamsHandling="merge">
          Sentence
        </a>
        <english-sentence/>
      </nz-tab>
    </nz-tabs>

  `,
  styles: [],
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
