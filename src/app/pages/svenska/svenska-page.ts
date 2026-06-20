import { Component } from "@angular/core";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EnglishDictionary } from '../english-dictionary/english-dictionary';
import { EnglishSentence } from '../english-sentence/english-sentence';
import { EnglishStructure } from '../english-structure/english-structure';
import { SvenskaDictionaryPage } from "./svenska-dictionar-page";

@Component({
    selector: 'svenska-page',
    standalone: true,
    imports: [
        NzTabsModule,
        RouterLink,

        SvenskaDictionaryPage
    ],
    template: `
    <nz-tabs nzLinkRouter >
     <nz-tab >
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'flashcard' }" queryParamsHandling="merge">
          Flashcard
        </a>
      </nz-tab>

      <nz-tab >
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'dictionary' }" queryParamsHandling="merge">
          Dictionary
        </a>
        <svenska-dictionary-page/>
      </nz-tab>

      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'sentences' }" queryParamsHandling="merge">
          Sentences
        </a>
      </nz-tab>

         <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'structures' }" queryParamsHandling="merge">
          Structure
        </a>
      </nz-tab>
    </nz-tabs>

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
export class SvenskaPage {
    constructor(
        private router: Router,
        private route: ActivatedRoute) { }

    dynamicTabs: Array<{ title: string; content: string; queryParams?: Params; routerLink: string[] }> = [];
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (!params['tab']) this.router.navigate(['/svenska'], { queryParams: { tab: "one" } });
        });
    }
}