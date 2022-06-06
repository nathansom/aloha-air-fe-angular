import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _liveAnnouncer: any;

  title = 'Aloha! Air';
  homeUrl = environment.HomeUrl;

  ngOnInit(): void {
    this.smallScreenWarning();
  }

  smallScreenWarning(): void {
    if (window.innerWidth < 768) {
      this._liveAnnouncer.announce(
        'Please use a larger screen for better experience.',
        'assertive'
      );
      alert('Please use a larger screen for better experience.');
    }
  }
}
