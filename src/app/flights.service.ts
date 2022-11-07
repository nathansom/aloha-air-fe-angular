import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './flight.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getFlights(): Observable<any> {
    return this.http.get(`${environment.apiUrl}`);
  }
  
  getFlight(orig: string, dest: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}query/${orig}/${dest}`);
  }

  postFlight(flight: Flight) {
    return this.http.post(`${environment.apiUrl}`, flight).subscribe(data => {
      console.log("New flight added!")
    });
  }

  updateFlight(flight: Flight) {
    return this.http.patch(`${environment.apiUrl}${flight.id}/update`, flight).subscribe(data => {
      console.log("Flight updated!")
    });
  }

  deleteFlight(id: number) {
    return this.http.delete(`${environment.apiUrl}${id}/delete`).subscribe(data => {
      console.log("Flight deleted!")
    });
  }

  getOrigins(): Observable<any> {
    return this.http.get(`${environment.apiUrl}origins`);
  }

  getDestinations(): Observable<any> {
    return this.http.get(`${environment.apiUrl}destinations`);
  }
}
