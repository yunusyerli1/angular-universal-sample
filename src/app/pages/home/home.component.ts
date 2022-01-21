import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      document.getElementById('btn').addEventListener('click', function() {
        alert('Hello');
      })
    }

  }

  showToast() {
    this.toastr.success('Mülk, ihaleye açılmıştır!', 'İşlem Başarılı');
  }

}
