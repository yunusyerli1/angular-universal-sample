import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actLang:string;

  chartProps = {
    chartType: 'column',
    rotation: 270,
    format: '',
    fontSize: '14px',
    colorByPoint: true,
  };
   barContent = {
 data:['Bilinmiyor', 'Orta Okul', 'Bilinmiyor', 'İlk Öğretim', 'İlkokul', 'Lise', 'Üniversite', 'Mezun', 'Doktora'],
   percentage: [60, 138, 86, 44, 176, 370, 679, 192, 74]
 }

  constructor(
    private toastr: ToastrService,
    private translocoService: TranslocoService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this. getLang();
  }

  showToast() {
    this.toastr.success('Mülk, ihaleye açılmıştır!', 'İşlem Başarılı');
  }
  showAlert() {
    alert('Hello');
     if(isPlatformBrowser(this.platformId)) {
      document.querySelector('.box').setAttribute('style', 'background-color: red');
    }
  }

  getLang() {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.getItem('language') ? this.actLang = JSON.parse(localStorage.getItem('language')) : this.actLang = 'tr';
      this.setLang();
    }


  }

  setLang() {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', JSON.stringify(this.actLang));
    }
    this.translocoService.setActiveLang(this.actLang);
  }

  changeLang(event){
    this.actLang= event.target.value;
    this.setLang();
  }

}
