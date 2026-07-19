import { Component } from "@angular/core";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EnglishDictionary } from './english-dictionary';
import { EnglishSentence } from './english-sentence';
import { EnglishStructure } from './english-structure';
import { EnglishLearning } from "../../features/english-learning/english-learning";

@Component({
    selector: 'English-page',
    standalone: true,
    imports: [
        NzTabsModule,
        RouterLink,

        EnglishDictionary,
        EnglishSentence,
        EnglishLearning
    ],
    template: `
    <nz-tabs nzLinkRouter >
     <nz-tab >
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'flashcard' }" queryParamsHandling="merge">
          Flashcard
        </a>
        <english-learning/>
      </nz-tab>

      <nz-tab >
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'dictionary' }" queryParamsHandling="merge">
          Dictionary
        </a>
        <english-dictionary/>
      </nz-tab>

      <nz-tab>
        <a *nzTabLink nz-tab-link [routerLink]="['.']" [queryParams]="{ tab: 'sentences' }" queryParamsHandling="merge">
          Sentences
        </a>
        <english-sentence/>
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
export class EnglishPage {
    constructor(
        private router: Router,
        private route: ActivatedRoute) { }

    dynamicTabs: Array<{ title: string; content: string; queryParams?: Params; routerLink: string[] }> = [];
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (!params['tab']) this.router.navigate(['/english'], { queryParams: { tab: "flashcard" } });
        });
    }
}