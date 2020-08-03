import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private translateService: TranslateService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  setLanguage(lang: string) {
    this.localStorageService.store('language', lang);
    this.translateService.use(lang);
  }
}
