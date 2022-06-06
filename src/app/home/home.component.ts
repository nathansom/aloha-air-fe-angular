import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../flight.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {
  
  flights: Flight[] = [];
  selectedOrigin: any = "";
  selectedDestination: any = "";
  selectedDate: any = "";

  origins: any;
  destinations: any;

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Flight>;

  constructor(private flightsServices: FlightsService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.flightsServices.getFlights().subscribe(data => {
      this.dataSource = new MatTableDataSource<Flight>(data);
    });

    this.flightsServices.getOrigins().subscribe(data => {
      this.origins = data;
    })

    this.flightsServices.getDestinations().subscribe(data => {
      this.destinations = data;
    })

    this.displayedColumns = ["flightnumber", "origin", "arrive", "destination", "depart", "nonstop"];
  }

  query(): void {
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;
    const date = this.selectedDate;

    this.flightsServices.getFlight(origin, destination).subscribe(data => {
      this.dataSource = new MatTableDataSource<Flight>(data);
    })
  }

}
