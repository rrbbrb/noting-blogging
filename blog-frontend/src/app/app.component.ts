import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-client';

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'zh']);
    const browserLang = (translateService.getBrowserLang().includes('zh')) ? 'zh' : 'en';
    translateService.setDefaultLang(browserLang);
  }
}
