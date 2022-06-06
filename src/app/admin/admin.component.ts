import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  id!: number;
  origin: string = '';
  destination: string = '';
  flightnumber: number = 0;
  depart: Date = new Date();
  arrive: Date = new Date();
  nonstop: boolean = false;
  //flightList: Flight[] = [];

  displayedColumns = [
    'flightnumber',
    'origin',
    'arrive',
    'destination',
    'depart',
    'nonstop',
    'id1',
    'id2',
  ];

  dataSource = new MatTableDataSource<Flight>();

  constructor(
    private flightService: FlightsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  refresh() {
    this.flightService.getFlights().subscribe((data) => {
      //this.flightList = data;
      this.dataSource = new MatTableDataSource<Flight>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  toggleNonStop() {
    this.nonstop = !this.nonstop;
  }

  sendFlight() {
    const flight: Flight = {
      origin: this.origin,
      destination: this.destination,
      flightnumber: this.flightnumber,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop,
    };
    this.flightService.postFlight(flight).add(() => {
      this.refresh();
    });
  }

  updateFlight(flight: Flight) {
    this.flightService.updateFlight(flight).add(() => {
      this.refresh();
    });
  }

  deleteFlight(id: number) {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      this.flightService.deleteFlight(id).add(() => {
        this.refresh();
    });
  }
}

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
